.PHONY: format type_check type-check coverage check dev-frontend dev-backend

format:
	cd frontend && npm run format
	cd backend && ruff format .

type_check:
	cd frontend && npm run type_check

type-check:
	cd frontend && npm run type-check

coverage:
	cd frontend && npm run coverage

check:
	cd frontend && npm run check
	cd backend && pytest --cov=app

dev-frontend:
	cd frontend && npm run dev

dev-backend:
	cd backend && uvicorn app.main:app --reload
