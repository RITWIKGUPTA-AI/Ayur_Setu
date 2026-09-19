# AyurSetu — Full Backend

A production backend for AyurSetu (SIH 2026, Problem Statement 26044) built on
**Express + TypeScript + Supabase (Postgres + Auth + Storage)**, with **Claude (Anthropic)**
powering the AI features. Replaces the earlier in-memory prototype backend with a real,
persistent database and adds the advanced features below.

## What's included

**Core**
- Supabase Auth-based login/signup (handled client-side by the Supabase SDK) + `profiles`
  table with roles: `student`, `college_admin`, `industry_partner`, `aiia_admin`
- Full Postgres schema: colleges, industry partners, skills taxonomy, topics, quizzes,
  internships, applications, certificates, notifications, chat — with Row Level Security

**AI-powered quizzes**
- `POST /api/quizzes/generate` — Claude generates a fresh MCQ + short-answer quiz for any
  syllabus topic, at beginner/intermediate/advanced difficulty
- Short-answer responses are graded by Claude with partial credit + feedback; MCQs are
  graded instantly and deterministically
- Every graded quiz updates the student's `student_skills` proficiency (a blended moving
  average, not just the latest score)
- Scoring ≥85% auto-issues a downloadable PDF certificate

**Advanced features**
- **AI doubt-solving chatbot** (`/api/chat`) — persistent sessions, Ayush-academic-scoped assistant
- **Skill-gap → internship matching** — a deterministic match-score engine
  (`services/matching.service.ts`) ranks open internships for each student by verified
  skill proficiency vs. required skills, plus an AI-generated skill-gap report explaining
  exactly what to improve for a specific listing
- **Internship/application workflow** — industry partners post listings with required
  skills, students apply, partners shortlist/select, everyone gets notified automatically
- **Notifications** — in-app notification feed for quiz results, application status changes,
  new applications
- **Analytics dashboards** — platform overview (student count, avg quiz score, placement
  funnel) and a skill-gap heatmap across all students, for AIIA/college admins; plus a
  personal progress view for students
- **Verifiable certificates** — server-rendered PDF certificates with a public verification
  endpoint (`GET /api/certificates/verify/:code`) so recruiters/colleges can confirm authenticity

## Project layout

```
ayursetu-backend/
├── supabase/
│   └── schema.sql          # run this in Supabase SQL editor first
└── server/
    ├── src/
    │   ├── config/         # env + supabase client
    │   ├── middleware/     # auth (JWT verification + roles), error handling
    │   ├── services/       # ai.service.ts, matching.service.ts, certificate.service.ts, notifications.service.ts
    │   ├── routes/         # one file per resource
    │   ├── scripts/seed.ts # baseline skills/topics
    │   └── index.ts        # app entry
    ├── package.json
    └── .env.example
```

## Setup

### 1. Supabase project
1. Create a project at supabase.com (free tier is enough to start).
2. In the SQL editor, run `supabase/schema.sql`.
3. In **Storage**, create a public bucket named `certificates`.
4. Grab these from **Project Settings → API**: `Project URL`, `service_role` key, and `JWT Secret`.

### 2. Backend
```bash
cd server
cp .env.example .env     # fill in SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_JWT_SECRET, ANTHROPIC_API_KEY
npm install
npm run seed              # loads sample skills/topics so quiz generation has content to use
npm run dev                # local dev on http://localhost:4000
```

### 3. Deploy (Render — same platform your site is already on)
1. Push this `server/` folder to your GitHub repo (e.g. as a `backend/` or separate repo).
2. On Render: **New → Web Service**, connect the repo.
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
3. Add all the variables from `.env.example` in Render's Environment tab.
4. Set `FRONTEND_ORIGIN` to your deployed frontend URL so CORS allows it.

## Connecting your existing React frontend

Your frontend already talks to Supabase-style auth conceptually — now it will call Supabase
directly for auth, and this backend for everything else:

```ts
// 1. Sign up / log in directly against Supabase from the frontend
const { data, error } = await supabase.auth.signUp({ email, password });

// 2. Right after signup, create the profile row via this backend
await fetch(`${API_URL}/api/profile/bootstrap`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${data.session.access_token}`,
  },
  body: JSON.stringify({ fullName, role: "student" }),
});

// 3. All other requests: attach the same access_token as a Bearer header
const res = await fetch(`${API_URL}/api/quizzes/generate`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  body: JSON.stringify({ topicId, questionCount: 5 }),
});
```

You'll need the `@supabase/supabase-js` package in the **frontend** too (for auth only —
never put the service role key there, only the public `anon` key).

## API summary

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/profile/bootstrap` | Create profile row after signup |
| GET/PATCH | `/api/profile/me` | View/update own profile |
| POST | `/api/quizzes/generate` | AI-generate a quiz for a topic |
| POST | `/api/quizzes/:quizId/start` | Start an attempt |
| POST | `/api/quizzes/attempts/:attemptId/submit` | Submit answers, get graded (AI + auto) |
| GET | `/api/quizzes/attempts/mine` | My quiz history |
| POST | `/api/chat/sessions` | New chatbot session |
| POST | `/api/chat/sessions/:id/messages` | Ask the AI doubt-solving assistant |
| GET | `/api/internships/matched` | Internships ranked by my skill match |
| GET | `/api/internships/:id/skill-gap` | AI report: what to improve for this listing |
| POST | `/api/internships/:id/apply` | Apply (match score auto-computed) |
| PATCH | `/api/internships/applications/:id` | Partner updates application status |
| GET | `/api/notifications` | My notification feed |
| GET | `/api/analytics/overview` | Admin dashboard stats |
| GET | `/api/analytics/skill-gap-heatmap` | Admin: weakest skills across students |
| GET | `/api/analytics/my-progress` | Student's own progress |
| GET | `/api/certificates/verify/:code` | Public certificate verification |

## Notes on the design

- **Why Supabase Auth instead of a custom auth flow?** It's the fastest path to a real,
  secure auth system (email/password, magic links, OAuth if you want it later) without
  writing password-hashing/session code yourself — exactly what "fastest to set up" calls for.
- **Why a service-role backend instead of pure client-to-Supabase calls?** Quiz grading,
  AI calls, matching, and certificate issuance need a private `ANTHROPIC_API_KEY` and
  business logic that shouldn't run in the browser — hence this Express layer sits between
  your frontend and Supabase for anything beyond plain reads.
- Swap `CLAUDE_MODEL` in `.env` if you want a smaller model for cost, or a larger one for
  quiz-question quality — no code changes needed.
