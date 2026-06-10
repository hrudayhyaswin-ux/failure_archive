from sqlalchemy import Column, Integer, String, Text, ForeignKey, Float, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    """Represents a system user with authentication and role-based access."""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String, default="user")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    failures = relationship("Failure", back_populates="creator")
    submissions = relationship("Submission", back_populates="user")

class Failure(Base):
    """Represents a documented business failure case study."""
    __tablename__ = "failures"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    category = Column(String, index=True)
    description = Column(Text)
    industry = Column(String, index=True)
    year = Column(Integer)
    failure_reason = Column(Text)
    lesson = Column(Text)
    created_by = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    creator = relationship("User", back_populates="failures")
    analysis = relationship("AIAnalysis", back_populates="failure", uselist=False)

class AIAnalysis(Base):
    """Represents the AI-generated forensic report for a specific failure."""
    __tablename__ = "ai_analysis"

    id = Column(Integer, primary_key=True, index=True)
    failure_id = Column(Integer, ForeignKey("failures.id"))
    analysis_json = Column(Text) # JSON string of analysis
    risk_score = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    failure = relationship("Failure", back_populates="analysis")

class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    description = Column(Text)
    status = Column(String, default="pending") # pending, approved, rejected
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="submissions")
