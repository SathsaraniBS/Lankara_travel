cd C:\travel-test\server
uvicorn main:app --reload

this is tech stack use this project.Frontend:      Next.js + TypeScript + Tailwind
Backend:       FastAPI (Python)
Database:      PostgreSQL + SQLAlchemy + Redis
Task Queue:    Celery (AI background jobs)
AI/ML:         scikit-learn + LangChain + Hugging Face
Auth:          JWT (python-jose)
Payments:      Stripe Python SDK
Hosting:       Vercel (FE) + Railway/Render (FastAPI + Celery workers)bash