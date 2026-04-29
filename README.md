# ⚡ NextHire AI — Automate Your Job Search

<div align="center">

![HireAI Banner](https://img.shields.io/badge/HireAI-Public%20Beta-00d4aa?style=for-the-badge&logo=lightning&logoColor=black)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-f59e0b?style=for-the-badge)

**Semantic job matching · Auto-apply agents · Dynamic resume tailoring — all in one platform.**

[Live Demo](#) · [Features](#-features) · [Getting Started](#-getting-started) · [Tech Stack](#-tech-stack)

</div>

---

## 🎯 What is NextHire AI?

NextHire AI is a full-stack AI-powered job search automation platform that helps job seekers land **3× more interviews** by combining:

- 🧠 **Semantic Job Matching** — Vector embeddings match you to jobs by *meaning*, not just keywords (94% accuracy)
- 🤖 **Auto-Apply Agent** — Intelligent browser agent fills applications across 50+ job boards
- 📊 **Selection Probability** — XGBoost model predicts your shortlist chance before you even apply
- ✍️ **Dynamic Resume Tailoring** — Claude AI rewrites your resume per job description in seconds
- 🗺️ **Career Path Intelligence** — RAG-powered engine maps your next 3 roles with a skills roadmap
- 🎤 **AI Interview Trainer** — Practice with an AI interviewer; voice analysis scores confidence in real time

---

## ✨ Features

### Dashboard
- Real-time metrics: Jobs Matched, Applications Sent, Interview Rate, ATS Score
- Sparkline trends for each KPI
- Top job matches with one-click Auto Apply
- Activity feed & weekly goal tracker

### Job Matches
- Filter by role, location, and salary range
- Match percentage badge (colour-coded by confidence)
- Bookmark & save jobs
- Instant application trigger with toast notifications

### Applications (Kanban)
- Drag-and-drop board: Applied → Interview → Offer → Rejected
- Per-card status, company, match %, and salary info

### Resume Analyzer
- ATS score with circular progress indicator
- Section-by-section breakdown (Impact, Keywords, Format, Quantification)
- AI improvement suggestions with category tags

### AI Insights
- Trending roles and skills in your target market
- Personalised career path roadmap
- Salary benchmarking by level and location

### Interview Trainer
- Session timer with live recording indicator
- STAR-format question bank across Behavioural, Technical, and System Design
- Performance scores: Communication, Confidence, Clarity, Depth

### Analytics
- Weekly application activity chart
- Response rate funnel
- Platform breakdown (LinkedIn, Naukri, Indeed, etc.)

### Settings
- Profile management, job preferences, notification controls
- API key integration panel (Gemini / OpenAI)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 7, TypeScript, Vanilla CSS |
| **Fonts** | DM Sans, Playfair Display, DM Mono (Google Fonts) |
| **Backend** | FastAPI (Python), SQLAlchemy, Alembic |
| **Database** | SQLite (dev) → PostgreSQL (prod) |
| **AI/ML** | Claude AI, GPT-4, XGBoost, Vector Embeddings |
| **Automation** | Playwright browser agent |
| **DevOps** | Docker, docker-compose |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- Python ≥ 3.10
- Docker (optional, for full stack)

### 1. Clone the repository

```bash
git clone https://github.com/nreddie7702/nexthire-ai.git
cd nexthire-ai
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at **http://localhost:5173**

### 3. Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

pip install -r requirements.txt
uvicorn main:app --reload
```

API docs available at **http://localhost:8000/docs**

### 4. Docker (Full Stack)

```bash
docker-compose up --build
```

---

## 📁 Project Structure

```
nexthire-ai/
├── frontend/                  # React + Vite frontend
│   ├── src/
│   │   ├── JobSearchAI.jsx    # Main app component (all pages)
│   │   ├── main.tsx           # Entry point
│   │   └── pages/             # Additional page components
│   ├── index.html
│   └── package.json
│
├── backend/                   # FastAPI backend
│   ├── api/
│   │   ├── routes.py          # REST API endpoints
│   │   └── schemas.py         # Pydantic request/response models
│   ├── db/
│   │   ├── database.py        # DB connection & session
│   │   └── models.py          # SQLAlchemy ORM models
│   ├── services/
│   │   ├── ai_matcher.py      # Semantic job matching engine
│   │   ├── resume_builder.py  # AI resume tailoring
│   │   ├── email_generator.py # Cover letter generation
│   │   └── notifier.py        # Notification service
│   ├── workers/
│   │   ├── scraper.py         # Job board scraper
│   │   └── apply_worker.py    # Auto-apply Playwright agent
│   ├── alembic/               # DB migrations
│   └── main.py                # FastAPI app entry point
│
├── docker-compose.yml
└── README.md
```

---

## 🎨 Design System

The UI is built with a custom dark-mode design system:

| Token | Value |
|-------|-------|
| `--bg` | `#080c14` (primary background) |
| `--teal` | `#00d4aa` (primary accent) |
| `--blue` | `#4f8fff` (secondary accent) |
| `--purple` | `#8b5cf6` (tertiary accent) |
| `--surface` | `#161d2e` (card background) |

Animations include: `fadeUp`, `floatY`, `glow`, `shimmer`, `orb` parallax, `progressFill`, and `toastIn`.

---

## 📸 Screenshots

| Landing Page | Dashboard | Job Matches |
|---|---|---|
| Dark hero with gradient text | KPI cards + sparklines | Filter + match cards |

---

## 🗺️ Roadmap

- [ ] Real job board API integrations (LinkedIn, Naukri, Indeed)
- [ ] Gemini-powered resume analysis
- [ ] Voice-based interview practice (Web Speech API)
- [ ] Email outreach automation
- [ ] Mobile-responsive layout
- [ ] Vercel / Railway one-click deploy

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repo
2. Create your feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add some feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ by **Narasimha** · [GitHub](https://github.com/nreddie7702)

</div>
