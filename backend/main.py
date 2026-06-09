from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import failures, submissions, analysis

app = FastAPI(title="Failure Archive API")

@app.on_event("startup")
def startup_event():
    try:
        from app.database import engine, Base
        Base.metadata.create_all(bind=engine)
        print("Database initialized successfully")
    except Exception as e:
        print(f"Database initialization failed: {e}")

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
    return {"message": "Welcome to Failure Archive API", "status": "online"}
