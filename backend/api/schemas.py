from pydantic import BaseModel, EmailStr
from typing import List, Optional, Any

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    location: Optional[str] = None
    target_roles: Optional[List[str]] = []
    expected_salary: Optional[int] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True

# Profile Schemas
class ProfileBase(BaseModel):
    skills: List[dict] = []
    experience_level: Optional[str] = None
    master_resume_url: Optional[str] = None

class ProfileCreate(ProfileBase):
    pass

class ProfileUpdate(ProfileBase):
    pass

class ProfileResponse(ProfileBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
