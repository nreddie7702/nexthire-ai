from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from db.database import get_db
from db import models
from . import schemas

router = APIRouter()

@router.post("/users/", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # In a real app, hash the password
    fake_hashed_password = user.password + "notreallyhashed"
    new_user = models.User(
        email=user.email,
        password_hash=fake_hashed_password,
        name=user.name,
        location=user.location,
        target_roles=user.target_roles,
        expected_salary=user.expected_salary
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Initialize empty profile for new user
    new_profile = models.Profile(user_id=new_user.id, skills=[])
    db.add(new_profile)
    db.commit()

    return new_user

@router.get("/users/{user_id}/profile", response_model=schemas.ProfileResponse)
def get_user_profile(user_id: int, db: Session = Depends(get_db)):
    profile = db.query(models.Profile).filter(models.Profile.user_id == user_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.put("/users/{user_id}/profile", response_model=schemas.ProfileResponse)
def update_user_profile(user_id: int, profile_update: schemas.ProfileUpdate, db: Session = Depends(get_db)):
    profile = db.query(models.Profile).filter(models.Profile.user_id == user_id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    profile.skills = profile_update.skills
    profile.experience_level = profile_update.experience_level
    profile.master_resume_url = profile_update.master_resume_url

    db.commit()
    db.refresh(profile)
    return profile
