.PHONY: format type_check type-check coverage check

format:
	npm run format
	cd backend && ruff format .

type_check:
	npm run type_check

type-check:
	npm run type-check

coverage:
	npm run coverage

check:
	npm run check
	cd backend && pytest --cov=app
