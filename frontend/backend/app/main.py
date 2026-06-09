from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import failures, submissions, analysis

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Failure Archive API")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Next.js default port
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
