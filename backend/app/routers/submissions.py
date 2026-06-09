from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Submission)
def create_submission(submission: schemas.SubmissionCreate, db: Session = Depends(get_db)):
    # For now, we'll use a dummy user_id 1. 
    # In a real app, this would come from the JWT token.
    db_submission = models.Submission(**submission.dict(), user_id=1)
    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)
    return db_submission

@router.get("/", response_model=List[schemas.Submission])
def get_submissions(db: Session = Depends(get_db)):
    return db.query(models.Submission).all()
