# Game Tracker (Hearth)

Vite + React + Supabase game tracker, deployed on Vercel from `main`.

- Styling is inline styles using tokens from `src/lib/theme.js`. Don't hardcode colors; use `theme.*` so dark mode works.
- Fonts: Bricolage Grotesque (display), DM Sans (body).
- No auth yet: the profile id is hard-coded as `'me'` in `App.jsx`.
- Database changes go in a `.sql` file under `supabase/`. The owner runs them by hand in the Supabase SQL Editor, so never assume they've been applied, and say clearly when one needs running.
- The owner is newer to coding. After each task, give a short plain-English summary of what changed and exactly how to test it.
- Current work: `docs/hearth-phase2/SPEC.md`.
