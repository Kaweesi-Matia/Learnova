# LearnHub — Full-Stack EdTech Platform

LearnHub is a portfolio-quality MERN learning platform built with React, Vite, Tailwind CSS, Express, MongoDB, Mongoose, JWT and bcrypt.

## Features

- Public landing page and course marketplace
- Course search, filtering and sorting
- JWT authentication and role-based authorization
- Student dashboard
- Instructor dashboard and course builder
- Admin dashboard
- Course enrollment and progress tracking
- Lesson learning interface
- Multiple-choice quizzes and attempts
- Course completion and certificates
- Wishlist
- Reviews and ratings
- Responsive layouts
- Loading, empty, error and success states
- Seed data for demo users and courses

## Requirements

- Node.js 20+
- MongoDB 7+ or MongoDB Atlas

## Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.
Backend runs on `http://localhost:5000`.

## Demo accounts

After seeding:

- Admin: `admin@learnhub.dev` / `Password123!`
- Instructor: `instructor@learnhub.dev` / `Password123!`
- Student: `student@learnhub.dev` / `Password123!`

## Environment

Backend:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/learnhub
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173
```

Frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

## API overview

- `/api/auth`
- `/api/courses`
- `/api/enrollments`
- `/api/progress`
- `/api/quizzes`
- `/api/certificates`
- `/api/reviews`
- `/api/wishlist`
- `/api/users`
- `/api/admin`

This project intentionally keeps dependencies focused on the requested MERN stack.
