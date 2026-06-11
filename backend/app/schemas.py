from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    role: str
    created_at: datetime

    class Config:
        from_attributes = True

class FailureBase(BaseModel):
    title: str
    category: str
    description: str
    industry: str
    year: int
    failure_reason: str
    lesson: str

class FailureCreate(FailureBase):
    pass

class AIAnalysisBase(BaseModel):
    analysis_json: str
    risk_score: float

class Failure(FailureBase):
    id: int
    created_by: Optional[int]
    created_at: datetime
    analysis: Optional[AIAnalysisBase] = None

    class Config:
        from_attributes = True

class SubmissionBase(BaseModel):
    title: str
    description: str

class SubmissionCreate(SubmissionBase):
    pass

class Submission(SubmissionBase):
    id: int
    user_id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class AIAnalysisRequest(BaseModel):
    story: str

class AIAnalysisResponse(BaseModel):
    root_cause_analysis: dict # e.g. {"Product-Market Fit": 45, ...}
    risk_score: float
    recommendations: List[str]
    market_sentiment: str
    competitor_dynamics: str
    forensic_summary: str
