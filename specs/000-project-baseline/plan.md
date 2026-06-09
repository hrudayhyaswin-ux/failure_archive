# Implementation Plan: Failure Archive Baseline

**Branch**: `000-project-baseline` | **Date**: 2026-06-09 | **Spec**: [specs/000-project-baseline/spec.md](spec.md)

**Input**: Feature specification from `specs/000-project-baseline/spec.md`

## Summary
Implementation of a full-stack intelligence repository for business failures. The system features a searchable frontend built with Next.js and a neural forensic engine backend built with FastAPI. The architecture emphasizes high visual fidelity and decoupled services.

## Technical Context
**Language/Version**: TypeScript (Frontend), Python 3.13 (Backend)

**Primary Dependencies**: Next.js 15+, Tailwind CSS v4, FastAPI, SQLAlchemy, Lucide React

**Storage**: SQLite (via SQLAlchemy)

**Testing**: Pytest (Backend), Vitest (Frontend planned)

**Target Platform**: Vercel (Frontend), Hugging Face Spaces (Backend)

**Project Type**: Full-stack Web Application

**Performance Goals**: <200ms for search filtering, <10s for AI analysis report generation.

**Constraints**: Dark-mode only, neural/cyberpunk design system, decoupled API communication.

## Constitution Check
- **I. SDD Adherence**: ✅ Spec and Plan established in `specs/000-project-baseline/`.
- **II. Neural Aesthetic**: ✅ Design utilizes `glass` and `neural-pulse` utilities in `globals.css`.
- **III. Decoupled Architecture**: ✅ Frontend communicates with backend via `NEXT_PUBLIC_API_URL`.
- **IV. Data Integrity**: ✅ Backend uses structured schemas for forensic analysis results.
- **V. Test-First**: ⚠ Test coverage is currently minimal; baseline tests required.

## Project Structure

### Source Code
```text
frontend/
├── src/
│   ├── app/           # Next.js App Router (Explore, Analyzer, Dashboard)
│   ├── components/    # Reusable UI (Navbar, Glass Cards)
│   ├── lib/           # API clients and utils
│   └── globals.css    # Tailwind v4 theme and glassmorphism utilities
└── package.json

backend/
├── app/
│   ├── routers/       # API endpoints (analysis, failures)
│   ├── models.py      # SQLAlchemy database models
│   └── main.py        # FastAPI application entry
├── requirements.txt
└── failure_archive.db # SQLite database
```

**Structure Decision**: Using a monorepo-style split between `frontend/` and `backend/` for clear service separation and independent deployment.

## Next Steps
1.  **Generate Tasks**: Run `/speckit.tasks` to break down remaining polish and test coverage.
2.  **Implementation**: Focus on increasing test coverage for the forensic engine and optimizing search latency.
