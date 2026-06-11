# Failure Archive
> **AI-Powered Forensic Intelligence Suite**
>
> Learn from real-world business and venture failures using neural intelligence and deterministic forensic analysis.

## Learn From Failures Before Making Them

Failure Archive is an AI-powered platform designed to help individuals, entrepreneurs, students, researchers, and organizations learn from real-world failures. Instead of focusing only on success stories, the platform analyzes failed startups, products, businesses, technologies, policies, and careers to uncover the reasons behind their failure and provide actionable insights.

The goal is to create a centralized knowledge base where users can understand why something failed, identify warning signs, discover similar cases, and learn how similar failures can be avoided in the future.
## working website 

https://failure-archive-gray.vercel.app
---

## Problem Statement

Thousands of platforms document success stories, but very few systematically analyze failures.

As a result:

* People repeat the same mistakes.
* Entrepreneurs launch products without learning from previous failures.
* Students and professionals struggle to identify the root causes of their setbacks.
* Organizations lose valuable lessons from failed projects.

Failure Archive addresses this problem by creating a searchable database of failures combined with AI-driven analysis and recommendations.

---

## Features

### Failure Database

Explore documented failures across multiple domains:

* Startups
* Products
* Businesses
* Technologies
* Policies
* Careers
* Investments

### AI Failure Analyzer

Users can submit descriptions of failed projects, businesses, or personal experiences and receive:

* Root cause analysis
* Risk assessment
* Key failure factors
* Improvement suggestions

### Similar Failure Detection

The platform identifies failures with similar characteristics and presents patterns and lessons learned.

### Lessons Learned Repository

Every failure includes:

* Root causes
* Warning signs
* Timeline of events
* Lessons learned
* Recommendations

### Community Contributions

Users can contribute failure stories and insights to expand the archive.

### Analytics Dashboard

Visualize:

* Most common failure reasons
* Industry-wise failure trends
* Failure category statistics
* User submissions

---

## System Architecture

Frontend (Next.js)
↓
Backend API (FastAPI)
↓
PostgreSQL Database
↓
OpenAI API
↓
Analytics & Reporting

---

## Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* ShadCN UI
* Recharts

### Backend

* FastAPI
* SQLAlchemy
* JWT Authentication

### Database

* PostgreSQL

### AI Integration

* OpenAI API

### Deployment

* Vercel (Frontend)
* Railway / Render (Backend)
* Supabase PostgreSQL

---

## Core Modules

### Authentication Module

* User Registration
* Login
* JWT Authentication
* Role-Based Access Control

### Failure Management Module

* Add Failure
* Edit Failure
* Delete Failure
* View Failure Details

### AI Analysis Module

* Root Cause Detection
* Failure Categorization
* Recommendation Generation

### Search & Filter Module

* Search by Title
* Search by Category
* Search by Industry
* Search by Keywords

### Dashboard Module

* Statistics
* Charts
* Reports

---

## Database Schema

### Users

| Field    | Type    |
| -------- | ------- |
| id       | Integer |
| name     | String  |
| email    | String  |
| password | String  |
| role     | String  |

### Failures

| Field          | Type    |
| -------------- | ------- |
| id             | Integer |
| title          | String  |
| category       | String  |
| description    | Text    |
| industry       | String  |
| year           | Integer |
| failure_reason | Text    |
| lessons        | Text    |

### AI Reports

| Field      | Type    |
| ---------- | ------- |
| id         | Integer |
| failure_id | Integer |
| analysis   | Text    |
| risk_score | Float   |

### User Submissions

| Field       | Type    |
| ----------- | ------- |
| id          | Integer |
| user_id     | Integer |
| title       | String  |
| description | Text    |
| status      | String  |

---

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hrudayhyaswin-ux/failure_archive.git
   cd failure_archive
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

---

## Future Enhancements

* AI Failure Prediction Engine
* Failure Similarity Graphs
* Startup Risk Calculator
* Business Plan Analyzer
* Career Failure Assessment
* Recommendation Engine
* Public API Access

---

## Project Goals

* Create awareness about learning from failures.
* Help users make informed decisions.
* Build a structured repository of failure knowledge.
* Encourage data-driven problem solving.
* Promote continuous learning and improvement.

---

## Expected Outcomes

Users will be able to:

* Analyze real-world failures.
* Understand root causes.
* Learn valuable lessons.
* Avoid repeating common mistakes.
* Improve decision-making skills.

---

## Contributors

Project developed as an academic and portfolio project focused on applying Artificial Intelligence, Full-Stack Development, Data Analysis, and Knowledge Management concepts.

---

## License

This project is developed for educational and research purposes.
