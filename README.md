# Failure Archive: AI-Powered Failure Analysis Platform

This platform collects startup, product, career, and business failures, analyzes their root causes using AI, and provides actionable insights.

## Project Structure
- `backend/`: FastAPI application with SQLite database and OpenAI integration.
- `frontend/`: Next.js 15 application with Tailwind CSS and ShadCN UI.

## Getting Started

### 1. Backend Setup
1. Navigate to the backend folder: `cd backend`
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt 
   # (or use the one-liner if requirements.txt isn't there)
   pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic python-dotenv openai alembic
   ```
4. Configure environment variables in `.env`:
   - Add your `OPENAI_API_KEY` to enable AI analysis.
5. Seed the database (optional):
   ```bash
   python seed.py
   ```
6. Run the backend server:
   ```bash
   uvicorn app.main:app --reload
   ```

### 2. Frontend Setup
1. Navigate to the frontend folder: `cd frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Features
- **Failure Database:** Explore curated cases like Theranos, Quibi, and Juicero.
- **AI Failure Analyzer:** Input your own story and get a structured root cause analysis.
- **Analytics Dashboard:** Visualize trends across industries and failure categories.
- **Submit Failure:** Contribute your own analyzed cases to the platform.

## Tech Stack
- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, ShadCN UI, Recharts.
- **Backend:** FastAPI, SQLAlchemy, SQLite (PostgreSQL compatible).
- **AI:** OpenAI API (GPT-4o-mini).
