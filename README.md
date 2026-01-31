# Interview AI

A modern recruitment platform featuring Job Creation, Candidate Applications (with timed MCQ tests), and a Recruiter Dashboard.

## Project Structure

This project is organized as a monorepo:

- **`frontend/`**: The main Full-stack application built with **Next.js 14**, **Prisma**, and **Tailwind CSS**.
  - Contains the UI, authentication (NextAuth), and core API routes (`/api/jobs`, `/api/test`, etc.).
  - Run this to start the application.

- **`backend/`**: A separate Node.js/Express service.
  - Intended for future microservices, heavy background processing (e.g., advanced PDF parsing, AI analysis), or external webhook handling.
  - Currently serves as a placeholder for scaling.

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL (Local or Cloud)

### 1. Setup Frontend (Main App)

```bash
cd frontend
npm install
```

**Configure Environment:**
Ensure the `.env` file in `frontend/` has the correct `DATABASE_URL` and NextAuth secrets.

**Run Migrations:**
```bash
npx prisma generate
npx prisma db push
```

**Start Development Server:**
```bash
npm run dev
```
The app will run at `http://localhost:3000`.

### 2. Setup Backend (Optional)

```bash
cd backend
npm install
npm start
```
The backend service runs at `http://localhost:5001`.

## Features
- **Job Wizard**: Create detailed job posts with custom fields and MCQ tests.
- **Candidate Portal**: Public shared links for candidates to apply and take tests.
- **Dashboard**: Track candidates, view scores, and download resumes.
