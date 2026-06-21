from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.database import get_db

router = APIRouter()


@router.get("/", response_model=list[schemas.Failure])
def get_failures(db: Session = Depends(get_db)):
    return db.query(models.Failure).all()


@router.get("/{failure_id}", response_model=schemas.Failure)
def get_failure(failure_id: int, db: Session = Depends(get_db)):
    failure = db.query(models.Failure).filter(models.Failure.id == failure_id).first()
    if not failure:
        raise HTTPException(status_code=404, detail="Failure not found")
    return failure


@router.post("/", response_model=schemas.Failure)
def create_failure(failure: schemas.FailureCreate, db: Session = Depends(get_db)):
    db_failure = models.Failure(**failure.dict())
    db.add(db_failure)
    db.commit()
    db.refresh(db_failure)
    return db_failure
