-- ============================================================
-- AyurSetu — Full Database Schema (Supabase / Postgres)
-- Run this in Supabase SQL editor (or `supabase db push`)
-- ============================================================

create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

-- ---------- USERS / PROFILES ----------
-- Supabase Auth already creates auth.users. We extend it with a profile.
create type user_role as enum ('student', 'college_admin', 'industry_partner', 'aiia_admin');

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role user_role not null default 'student',
  college_id uuid,
  industry_partner_id uuid,
  avatar_url text,
  bio text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- COLLEGES ----------
create table if not exists colleges (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  city text,
  state text,
  affiliation text, -- e.g. AIIA-affiliated, State Ayush University
  contact_email text,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

alter table profiles
  add constraint fk_profiles_college foreign key (college_id) references colleges(id) on delete set null;

-- ---------- INDUSTRY PARTNERS ----------
create table if not exists industry_partners (
  id uuid primary key default uuid_generate_v4(),
  company_name text not null,
  industry_sector text, -- e.g. Panchakarma clinic, Ayush pharma, wellness startup
  website text,
  contact_email text,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

alter table profiles
  add constraint fk_profiles_industry foreign key (industry_partner_id) references industry_partners(id) on delete set null;

-- ---------- SKILLS TAXONOMY ----------
create table if not exists skills (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,          -- e.g. "Panchakarma Therapy", "Ayurvedic Pharmacology", "Clinical Documentation"
  category text,                      -- e.g. Clinical, Research, Digital, Communication
  description text
);

create table if not exists student_skills (
  student_id uuid not null references profiles(id) on delete cascade,
  skill_id uuid not null references skills(id) on delete cascade,
  proficiency int not null default 0 check (proficiency between 0 and 100), -- derived from quiz performance
  verified_by_quiz boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (student_id, skill_id)
);

-- Skills required by internships/jobs, used for the matching engine
create table if not exists industry_required_skills (
  internship_id uuid not null,
  skill_id uuid not null references skills(id) on delete cascade,
  min_proficiency int not null default 50,
  primary key (internship_id, skill_id)
);

-- ---------- COURSES / SYLLABUS TOPICS (used for AI quiz generation) ----------
create table if not exists topics (
  id uuid primary key default uuid_generate_v4(),
  title text not null,               -- e.g. "Rasa Shastra Basics"
  subject text,                      -- e.g. "Ayurvedic Pharmaceutics"
  description text,
  skill_id uuid references skills(id) on delete set null,
  difficulty text check (difficulty in ('beginner','intermediate','advanced')) default 'beginner',
  created_at timestamptz not null default now()
);

-- ---------- QUIZZES (AI-generated & static bank) ----------
create table if not exists quizzes (
  id uuid primary key default uuid_generate_v4(),
  topic_id uuid references topics(id) on delete set null,
  title text not null,
  generated_by text not null default 'ai' check (generated_by in ('ai','manual')),
  difficulty text check (difficulty in ('beginner','intermediate','advanced')) default 'beginner',
  question_count int not null default 5,
  created_by uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists quiz_questions (
  id uuid primary key default uuid_generate_v4(),
  quiz_id uuid not null references quizzes(id) on delete cascade,
  question_type text not null check (question_type in ('mcq','short_answer')),
  prompt text not null,
  options jsonb,               -- for mcq: [{id, text}]
  correct_option_id text,      -- for mcq
  model_answer text,           -- for short_answer, used as grading reference
  explanation text,
  order_index int not null default 0
);

create table if not exists quiz_attempts (
  id uuid primary key default uuid_generate_v4(),
  quiz_id uuid not null references quizzes(id) on delete cascade,
  student_id uuid not null references profiles(id) on delete cascade,
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  score numeric,               -- percentage 0-100
  max_score numeric default 100,
  status text not null default 'in_progress' check (status in ('in_progress','submitted','graded'))
);

create table if not exists quiz_answers (
  id uuid primary key default uuid_generate_v4(),
  attempt_id uuid not null references quiz_attempts(id) on delete cascade,
  question_id uuid not null references quiz_questions(id) on delete cascade,
  answer_text text,
  selected_option_id text,
  is_correct boolean,
  ai_feedback text,            -- AI grading feedback for short answers
  points_awarded numeric default 0
);

-- ---------- INTERNSHIPS / JOBS ----------
create table if not exists internships (
  id uuid primary key default uuid_generate_v4(),
  industry_partner_id uuid not null references industry_partners(id) on delete cascade,
  title text not null,
  description text,
  location text,
  mode text check (mode in ('remote','onsite','hybrid')) default 'onsite',
  stipend text,
  duration_weeks int,
  seats int default 1,
  status text not null default 'open' check (status in ('open','closed','draft')),
  created_at timestamptz not null default now()
);

alter table industry_required_skills
  add constraint fk_irs_internship foreign key (internship_id) references internships(id) on delete cascade;

create table if not exists applications (
  id uuid primary key default uuid_generate_v4(),
  internship_id uuid not null references internships(id) on delete cascade,
  student_id uuid not null references profiles(id) on delete cascade,
  match_score numeric,          -- computed skill-gap match %
  status text not null default 'applied' check (status in ('applied','shortlisted','rejected','selected','withdrawn')),
  applied_at timestamptz not null default now(),
  unique (internship_id, student_id)
);

-- ---------- CERTIFICATES ----------
create table if not exists certificates (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references profiles(id) on delete cascade,
  title text not null,               -- e.g. "Panchakarma Therapy — Verified Skill"
  issued_for text,                   -- quiz_id or internship_id reference (free text description)
  certificate_url text,              -- generated PDF stored in Supabase Storage
  verification_code text not null unique,
  issued_at timestamptz not null default now()
);

-- ---------- NOTIFICATIONS ----------
create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  type text not null check (type in ('quiz','internship','application','system','skill_gap')),
  title text not null,
  body text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------- AI CHATBOT (doubt-solving) ----------
create table if not exists chat_sessions (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references profiles(id) on delete cascade,
  title text default 'New conversation',
  created_at timestamptz not null default now()
);

create table if not exists chat_messages (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid not null references chat_sessions(id) on delete cascade,
  role text not null check (role in ('user','assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

-- ---------- INDEXES ----------
create index if not exists idx_quiz_attempts_student on quiz_attempts(student_id);
create index if not exists idx_applications_student on applications(student_id);
create index if not exists idx_applications_internship on applications(internship_id);
create index if not exists idx_notifications_user_unread on notifications(user_id, read);
create index if not exists idx_student_skills_student on student_skills(student_id);
create index if not exists idx_chat_messages_session on chat_messages(session_id);

-- ---------- ROW LEVEL SECURITY ----------
alter table profiles enable row level security;
alter table quiz_attempts enable row level security;
alter table quiz_answers enable row level security;
alter table applications enable row level security;
alter table notifications enable row level security;
alter table chat_sessions enable row level security;
alter table chat_messages enable row level security;
alter table certificates enable row level security;
alter table student_skills enable row level security;

-- Students can read/update only their own rows; the backend also uses the
-- service-role key (bypasses RLS) for trusted server-side operations like
-- AI grading and matching, so these policies mainly protect direct client access.
create policy "own profile" on profiles for select using (auth.uid() = id);
create policy "update own profile" on profiles for update using (auth.uid() = id);

create policy "own quiz attempts" on quiz_attempts for select using (auth.uid() = student_id);
create policy "own quiz answers" on quiz_answers for select using (
  exists (select 1 from quiz_attempts qa where qa.id = quiz_answers.attempt_id and qa.student_id = auth.uid())
);
create policy "own applications" on applications for select using (auth.uid() = student_id);
create policy "own notifications" on notifications for select using (auth.uid() = user_id);
create policy "update own notifications" on notifications for update using (auth.uid() = user_id);
create policy "own chat sessions" on chat_sessions for all using (auth.uid() = student_id);
create policy "own chat messages" on chat_messages for select using (
  exists (select 1 from chat_sessions cs where cs.id = chat_messages.session_id and cs.student_id = auth.uid())
);
create policy "own certificates" on certificates for select using (auth.uid() = student_id);
create policy "own student skills" on student_skills for select using (auth.uid() = student_id);
