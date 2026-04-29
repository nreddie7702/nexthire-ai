import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "dummy_key"))

def generate_hr_email(job_match):
    """
    Generates a personalized introductory email based on the Job Description and User Profile.
    """
    prompt = f"""
    You are an expert career coach writing a cold outreach email to a hiring manager/HR.
    
    Job Title: {job_match.job.title}
    Company: {job_match.job.company}
    Job Description: {job_match.job.description}
    
    Candidate Name: {job_match.user.name}
    Candidate Skills: {', '.join([s['name'] if isinstance(s, dict) else s for s in job_match.user.profile.skills])}
    
    Write a short, engaging, and highly professional email applying for this role.
    Do not use generic buzzwords. Focus on value the candidate brings related to the required skills.
    Keep it under 150 words.
    """
    
    # Mock for local dev
    if os.getenv("OPENAI_API_KEY") in [None, "your_openai_api_key_here", "dummy_key"]:
        email_content = f"Subject: Application for {job_match.job.title} - {job_match.user.name}\n\nHi Hiring Team,\n\nI am writing to express my strong interest in the {job_match.job.title} role at {job_match.job.company}."
        print("Generated MOCK Email")
        return email_content
        
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error generating email: {e}")
        return "Email generation failed."

def send_hr_email(to_email, subject, body):
    """
    Integration with Gmail API or SMTP would go here.
    """
    # Mocking SMTP
    print(f"--- Sending Email To: {to_email} ---")
    print(f"Subject: {subject}")
    print(f"Body:\n{body}")
    print("--------------------------------------")
    return True
