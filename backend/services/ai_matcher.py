import os
import json
from openai import OpenAI
from sqlalchemy.orm import Session
from db.models import Job, Profile, JobMatch

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "dummy_key"))

def analyze_and_match(job_id: int, user_id: int, db: Session):
    job = db.query(Job).filter(Job.id == job_id).first()
    profile = db.query(Profile).filter(Profile.user_id == user_id).first()
    
    if not job or not profile:
        return None

    # Use LLM to extract skills from JD if not already extracted
    if not job.extracted_skills:
        try:
            prompt = f"Extract a JSON array of technical skills from the following job description:\n\n{job.description}\n\nOnly return the JSON array of strings."
            # MOCK CALL for local dev without real key
            if os.getenv("OPENAI_API_KEY") in [None, "your_openai_api_key_here", "dummy_key"]:
                job.extracted_skills = [{"name": "Python"}, {"name": "React"}]
            else:
                response = client.chat.completions.create(
                    model="gpt-4o",
                    messages=[{"role": "user", "content": prompt}],
                    response_format={"type": "json_object"}
                )
                content = response.choices[0].message.content
                # Parse JSON array assuming {"skills": [...]} or just array
                parsed = json.loads(content)
                job.extracted_skills = parsed.get("skills", []) if isinstance(parsed, dict) else parsed
                
            db.commit()
        except Exception as e:
            print(f"Error extracting skills: {e}")
            job.extracted_skills = []

    # Calculate Match Score
    user_skill_names = set(s['name'].lower() for s in profile.skills)
    job_skill_names = set(s['name'].lower() if isinstance(s, dict) else s.lower() for s in job.extracted_skills)
    
    if not job_skill_names:
        score = 0.0
    else:
        overlap = user_skill_names.intersection(job_skill_names)
        score = (len(overlap) / len(job_skill_names)) * 100.0

    # Create Match Record
    match = db.query(JobMatch).filter(JobMatch.user_id == user_id, JobMatch.job_id == job_id).first()
    if not match:
        match = JobMatch(user_id=user_id, job_id=job_id, match_score=score)
        db.add(match)
    else:
        match.match_score = score
        
    db.commit()
    db.refresh(match)
    return match
