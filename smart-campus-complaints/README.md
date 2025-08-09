# Smart Campus Complaint & Maintenance System

This is a minimal full-stack project (React + Vite frontend, Node.js + Express backend, MongoDB) for a campus complaint tracking system.

## Quick start (local)

### Backend
```bash
cd backend
npm install
# create .env (see .env.example)
npm run dev   # requires nodemon, or `npm start`
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# open browser at http://localhost:5173 (Vite default)
```

## Deploy
- Backend: Heroku, Render, or any Node host. Set environment variables (MONGODB_URI, JWT_SECRET, EMAIL_*).
- Frontend: Vercel or Netlify. Set `VITE_API_URL` to your backend base URL (e.g. https://your-backend.com).

Demo slides and script included in /docs.