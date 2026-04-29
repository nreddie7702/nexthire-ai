from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.database import engine, Base
from db import models

# Create all tables (useful if not using alembic, but we'll use alembic mainly)
# models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Job Automation System API",
    description="API for managing profiles, jobs, matching, and auto-applying.",
    version="1.0.0"
)

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from api.routes import router as api_router

@app.get("/")
def read_root():
    return {"message": "Welcome to AI Job Automation API"}

app.include_router(api_router, prefix="/api")
