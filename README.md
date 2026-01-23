# DevMap Project Documentation

**Project:** DevMap - Developer Learning Roadmap Platform  
**Tech Stack:** React + Vite, Supabase, Tailwind CSS, Vercel

---

## Overview

DevMap is a gamified learning platform where developers track their progress through various technology roadmaps (React, Python, etc.). Users earn XP, level up, unlock achievement badges, and can share their public profile.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (React)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Dashboard   │  │   Roadmap    │  │ Public       │      │
│  │  (Stats/XP)  │  │   Viewer     │  │ Profile      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                           │                                 │
│                    ┌──────┴──────┐                         │
│                    │ Supabase JS │                         │
│                    │   Client    │                         │
│                    └──────┬──────┘                         │
└───────────────────────────┼─────────────────────────────────┘
                            │ HTTPS
┌───────────────────────────┼─────────────────────────────────┐
│                      SUPABASE (Backend)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Auth       │  │  Database    │  │  Realtime    │      │
│  │  (GitHub)    │  │ (PostgreSQL) │  │ Subscriptions│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## Backend (Supabase)

### What is Supabase?

Supabase is an open-source Firebase alternative. It provides:

- **PostgreSQL Database** - Stores user data
- **Authentication** - Handles login (GitHub OAuth)
- **Realtime** - Live data updates
- **Row Level Security (RLS)** - Data protection

### Database Tables

#### 1. `profiles` Table

Stores user profile information.

| Column     | Type      | Description                        |
| ---------- | --------- | ---------------------------------- |
| id         | uuid      | Primary Key (links to auth.users)  |
| username   | text      | Unique username for public profile |
| full_name  | text      | Display name                       |
| avatar_url | text      | Profile picture URL                |
| total_xp   | integer   | Accumulated XP                     |
| level      | integer   | Current level                      |
| created_at | timestamp | Account creation date              |

#### 2. `user_progress` Table

Stores completed roadmap nodes.

| Column        | Type      | Description                        |
| ------------- | --------- | ---------------------------------- |
| id            | uuid      | Primary Key                        |
| user_id       | uuid      | Foreign Key to profiles            |
| node_id       | text      | Completed step ID                  |
| language_slug | text      | Roadmap identifier (e.g., "react") |
| completed_at  | timestamp | When step was completed            |

**Unique Constraint:** `(user_id, node_id)` - Prevents duplicate entries.

### Authentication Flow

```
User clicks "Login with GitHub"
         │
         ▼
┌─────────────────────┐
│ Supabase redirects  │
│ to GitHub OAuth     │
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│ User grants access  │
│ on GitHub           │
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│ GitHub redirects    │
│ back with token     │
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│ Supabase creates    │
│ session + profile   │
└─────────────────────┘
```
## Frontend Features

### 1. Progress Tracking

- Mark roadmap steps as complete
- Data saved to Supabase (logged in) or localStorage (guest)
- Optimistic UI updates with rollback on failure

### 2. Gamification

- **XP System:** 100 XP per completed step
- **Levels:** Level up every 10 steps
- **Achievement Badges:** Unlock badges for milestones
  - First Commit (1 step)
  - Consistency (3-day streak)
  - Momentum (10 steps)
  - Explorer (3 roadmaps)
  - Mastery (complete roadmap)

### 3. Dashboard

- Welcome header with Level/XP
- Daily Goal Tracker (3 steps/day)
- Achievement Badges display
- Skill Radar Chart
- Contribution Activity Graph

### 4. Public Profiles

- Shareable URL: `/u/username`
- Shows: Avatar, Level, XP, Skill Radar
- Username is permanent once set

---

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/dishant11max/devmap.git
   cd devmap
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173` in your browser.

---

## Supported Languages

- JavaScript
- Python
- Java
- C++
- C
- Go
- Rust
- TypeScript

---

## License

MIT
