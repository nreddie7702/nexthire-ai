from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, JSON, Boolean, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from .database import Base

class MatchStatus(str, enum.Enum):
    MATCHED = "Matched"
    APPLIED = "Applied"
    REJECTED = "Rejected"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    name = Column(String)
    location = Column(String)
    target_roles = Column(JSON)  # Store as JSON list
    expected_salary = Column(Integer)
    
    profile = relationship("Profile", back_populates="user", uselist=False)
    matches = relationship("JobMatch", back_populates="user")
    notifications = relationship("Notification", back_populates="user")

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    skills = Column(JSON)
    experience_level = Column(String)
    master_resume_url = Column(String)

    user = relationship("User", back_populates="profile")

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    platform_source = Column(String)
    external_job_id = Column(String, unique=True, index=True)
    title = Column(String)
    company = Column(String)
    location = Column(String)
    salary_range = Column(String)
    description = Column(String)
    extracted_skills = Column(JSON)
    hr_contact = Column(String)
    url = Column(String)

    matches = relationship("JobMatch", back_populates="job")

class JobMatch(Base):
    __tablename__ = "job_matches"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    job_id = Column(Integer, ForeignKey("jobs.id"))
    match_score = Column(Float)
    status = Column(Enum(MatchStatus), default=MatchStatus.MATCHED)

    user = relationship("User", back_populates="matches")
    job = relationship("Job", back_populates="matches")
    application = relationship("Application", back_populates="match", uselist=False)

class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    match_id = Column(Integer, ForeignKey("job_matches.id"))
    custom_resume_url = Column(String)
    applied_at = Column(DateTime, default=datetime.utcnow)

    match = relationship("JobMatch", back_populates="application")

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    type = Column(String)
    message = Column(String)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="notifications")
