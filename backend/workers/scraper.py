import asyncio
from playwright.async_api import async_playwright
from sqlalchemy.orm import Session
import re

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from db.database import SessionLocal
from db.models import Job

async def scrape_dummy_jobs(keyword: str, location: str):
    """
    A basic Playwright scraper that searches a generic job board.
    For this MVP, we scrape a public tech job board (e.g. YCombinator Work at a Startup or similar) 
    or mock the data if it blocks us.
    Let's mock a few entries but show the Playwright structure.
    """
    print(f"Starting Playwright scraper for {keyword} in {location}...")
    
    jobs_scraped = []
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
        )
        page = await context.new_page()
        
        try:
            # We would go to a real job board here.
            # await page.goto('https://example-job-board.com/search')
            # await page.fill('input[name="q"]', keyword)
            # await page.click('button[type="submit"]')
            # await page.wait_for_selector('.job-card')
            
            # Since real job boards have captchas, we mock the output structure 
            # to demonstrate functionality without getting IP blocked holding up the MVP.
            await asyncio.sleep(2) # simulate network
            
            mock_jobs = [
                {
                    "title": f"Senior {keyword} Engineer",
                    "company": "Tech Innovators Inc.",
                    "location": location,
                    "salary_range": "$120,000 - $160,000",
                    "description": f"We are looking for a {keyword} expert. Must have 5+ years of experience in modern frameworks, backend APIs, and AWS. Strong Postgres skills required.",
                    "platform_source": "PlaywrightMock",
                    "external_job_id": f"mock-{keyword.lower()}-1",
                    "url": "https://example.com/jobs/1"
                },
                {
                    "title": f"Full Stack {keyword} Developer",
                    "company": "Startup XYZ",
                    "location": f"Remote, {location}",
                    "salary_range": "$100,000 - $140,000",
                    "description": f"Join our growing team! Minimum 3 years building scalable systems using {keyword}. React and Tailwind on the frontend is a plus.",
                    "platform_source": "PlaywrightMock",
                    "external_job_id": f"mock-{keyword.lower()}-2",
                    "url": "https://example.com/jobs/2"
                }
            ]
            
            jobs_scraped.extend(mock_jobs)
            print("Finished scraping.")
        except Exception as e:
            print(f"Error scraping: {e}")
        finally:
            await browser.close()
            
    # Save to database
    save_jobs_to_db(jobs_scraped)

def save_jobs_to_db(jobs: list):
    db: Session = SessionLocal()
    try:
        new_jobs_count = 0
        for job_data in jobs:
            existing = db.query(Job).filter(Job.external_job_id == job_data['external_job_id']).first()
            if not existing:
                new_job = Job(**job_data)
                db.add(new_job)
                new_jobs_count += 1
        db.commit()
        print(f"Saved {new_jobs_count} new jobs to database.")
    except Exception as e:
        print(f"Database error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    asyncio.run(scrape_dummy_jobs("Python", "New York"))
