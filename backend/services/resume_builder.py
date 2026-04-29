from fpdf import FPDF
import os

class ResumePDF(FPDF):
    def header(self):
        # We don't need a static header for every page in a simple resume
        pass

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.cell(0, 10, f"Page {self.page_no()}", 0, 0, "C")

def generate_custom_resume(user_profile, match_data, output_path: str):
    """
    Generates a PDF resume prioritizing skills needed for the matched JD.
    """
    pdf = ResumePDF()
    pdf.add_page()
    
    # Title / Name
    pdf.set_font("Helvetica", style="B", size=24)
    name = user_profile.user.name if user_profile.user.name else "AI Professional"
    pdf.cell(0, 15, name, ln=True, align="C")
    
    pdf.set_font("Helvetica", size=12)
    email = user_profile.user.email
    location = user_profile.user.location or "Remote"
    pdf.cell(0, 10, f"{email} | {location}", ln=True, align="C")
    pdf.ln(5)

    # Professional Summary (Mocked via logic prioritizing JD skills)
    pdf.set_font("Helvetica", style="B", size=14)
    pdf.cell(0, 10, "Professional Summary", ln=True, align="L", border="B")
    pdf.set_font("Helvetica", size=11)
    
    # Example logic: inject job skills from the matcher
    job_skills_comma = ", ".join([s['name'] if isinstance(s, dict) else s for s in match_data.job.extracted_skills])
    summary_text = (
        f"Experienced {user_profile.experience_level} engineer with a strong background in building scalable automation systems. "
        f"Highly proficient in skills relevant for this role, specifically: {job_skills_comma}."
    )
    pdf.multi_cell(0, 8, summary_text)
    pdf.ln(5)

    # Skills Section (Reordered based on Match)
    pdf.set_font("Helvetica", style="B", size=14)
    pdf.cell(0, 10, "Technical Skills", ln=True, align="L", border="B")
    pdf.set_font("Helvetica", size=11)
    
    user_skills = [s['name'].lower() for s in user_profile.skills]
    job_skills = [s['name'].lower() if isinstance(s, dict) else s.lower() for s in match_data.job.extracted_skills]
    
    # Sort skills: matched first
    matched_skills = [s for s in user_skills if s in job_skills]
    other_skills = [s for s in user_skills if s not in job_skills]
    
    prioritized_skills = matched_skills + other_skills
    skills_str = ", ".join([s.title() for s in prioritized_skills])
    pdf.multi_cell(0, 8, skills_str)
    pdf.ln(5)
    
    # Experience Section
    pdf.set_font("Helvetica", style="B", size=14)
    pdf.cell(0, 10, "Experience", ln=True, align="L", border="B")
    pdf.set_font("Helvetica", size=11)
    pdf.multi_cell(0, 8, "- Software Engineer, Global Tech (2020 - Present)\n- Developed automated solutions and increased efficiency by 40%.\n- Led projects incorporating key technologies required for modern web scraping.")

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    pdf.output(output_path)
    print(f"Custom resume generated at: {output_path}")
    return output_path
