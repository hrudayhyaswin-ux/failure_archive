# Contributing to Failure Archive

Thank you for your interest in contributing to the Failure Archive! This project is built on the principle of shared intelligence to help humanity learn from past mistakes.

## Spec-Driven Development (SDD)

This project strictly follows the **Speckit** workflow. All contributions must be preceded by a specification and an implementation plan.

1.  **Identify a need**: Open an issue to discuss the proposed change.
2.  **Specify**: Create a feature specification in `specs/###-feature-name/spec.md`.
3.  **Plan**: Create an implementation plan in `specs/###-feature-name/plan.md`.
4.  **Implement**: Once the plan is approved, proceed with the implementation.

## Code Standards

- **Backend**: Python (FastAPI), adhere to PEP 8. Use docstrings for all models and endpoints.
- **Frontend**: TypeScript (Next.js), follow the "Neural Cyberpunk" design system. Use glassmorphism and high-performance motion feedback.
- **Testing**: TDD is highly encouraged. Add tests for all new features.

## Conventional Commits

We use [Conventional Commits](https://www.conventionalcommits.org/) for our commit messages:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Formatting, missing semi colons, etc; no code change
- `refactor:` Refactoring production code
- `test:` Adding missing tests, refactoring tests
- `chore:` Updating build tasks, package manager configs, etc; no production code change

## Legal

By contributing to this project, you agree that your contributions will be licensed under the **AGPLv3 License**.
