from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import failures, submissions, analysis

import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Failure Archive API")

@app.on_event("startup")
def startup_event():
    # Create database tables on startup
    try:
        from .database import engine, Base
        Base.metadata.create_all(bind=engine)
        logger.info("Database initialized successfully")
    except Exception as e:
        logger.error(f"Database initialization failed: {e}")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(failures.router, prefix="/api/failures", tags=["failures"])
app.include_router(submissions.router, prefix="/api/submissions", tags=["submissions"])
app.include_router(analysis.router, prefix="/api/analysis", tags=["analysis"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Failure Archive API"}
