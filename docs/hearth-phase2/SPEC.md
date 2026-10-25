# Hearth Phase 2: Top lists, profile widgets, mobile

Read this whole file before writing code. Visual reference is in `docs/hearth-phase2/mockups/` (React mockups: `phase2.jsx` is the new screens; `direction-b.jsx` + `shared.jsx` hold the Hearth tokens and primitives they use). Open `mockups/Top 10 + Mobile Mockups.html` in a browser to see them. Match layout, spacing, radii, and copy; use the real app's `src/lib/theme.js` tokens, not the mockup constants.

Out of scope for this phase: login/auth, friends/follows, comment wall. Keep `MY_PROFILE_ID = 'me'` as-is.

## Current app (already in the repo)
- Vite + React + Supabase, inline styles, tokens in `src/lib/theme.js` (`theme`, `fonts`, `btn`, `isDark`, `toggleTheme`).
- `App.jsx` owns data + page state (`home | library | profile`). Components: AppShell, Home, Library, Profile, TopTen, LinkTree, LinkEditor, GameCard, AddGameModal, EditGameModal, Cover, Avatar.
- Top 10 today = `games.rank` (1–10). There is no UI to add/remove games from it. That's the main bug to fix.
- `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` are installed.

## 1. Data model

New table `top_entries` (one row per game per list):
- `id` uuid PK default `gen_random_uuid()`
- `profile_id` text → `profiles(id)` on delete cascade
- `list_type` text, check in (`'all_time'`, `'year'`)
- `year` smallint, null for all_time, required for year (check constraint)
- `game_id`: same type as `games.id` (check the existing column) → `games(id)` on delete cascade
- `position` smallint, check 1–10
- `created_at` timestamptz default now()
- `unique nulls not distinct (profile_id, list_type, year, game_id)`. A game can't appear twice in one list, but **can** be in both lists.
- Index on `(profile_id, list_type, year, position)`.
- RLS enabled with the same open anon/authenticated policy used by `profiles` (dev mode, no auth yet).
- Backfill: insert every `games` row with `rank` 1–10 as `all_time` entries for profile `'me'`, position = rank. Leave the `games.rank` column in place but stop reading/writing it in the app.

Add to `profiles`: `layout jsonb` (see §3 for shape and default).

Write it as one idempotent SQL file at `supabase/phase2-migration.sql` (IF NOT EXISTS / ON CONFLICT DO NOTHING) so it's safe to re-run. The owner runs it by hand in the Supabase SQL Editor. Do not try to run it yourself.

## 2. Top lists

Two lists per profile, max 10 each:
- **All-Time Top 10**: `list_type = 'all_time'`.
- **Best of {year}**: `list_type = 'year'`, defaults to the current year. Year picker shows every year that has entries plus the current year. Past years stay visible on the profile via the picker.

Data layer: put Supabase calls in `src/lib/topLists.js` (load all entries for a profile, add, remove, reorder). Reorder writes new positions for the whole list. Use optimistic UI.

### Profile display (mockup T1)
- All-Time: 5-col grid, cover 3:4, rank badge top-left (#1 orange accent, #2–3 honey accent3, rest surface), title + "genre · year" under each.
- Best of year: one card containing a 10-col row of smaller covers, title under each, year pill + Edit button in the header.
- Empty list: friendly empty state with an "Add games" button that opens edit mode.

### Edit mode (mockup T2)
- Triggered by "Edit Top 10" / "Edit" on each list (owner only).
- Dark banner: title, one-line help, Cancel + Done. Cancel discards; Done saves.
- 10 slots: filled tiles have × (remove) and drag; empty slots are dashed "Add #N".
- Right panel "Add from your library": search over the user's games; games already in this list show "#N" instead of Add. Clicking an empty slot focuses the search.
- Any status can be added (Playing, Backlog, etc.).

### Edit Game modal (mockup T3)
- New "Top lists" section with a row per list (All-Time, Best of current year).
- In list: show "Ranked #N", a position dropdown, and Remove.
- Not in list: "Add as #N" (next free slot).
- List full: adding opens a small chooser "Swap out which game?" listing the 10.

### Home
- The Top 10 strip on Home reads All-Time entries (not `games.rank`).

## 3. Profile widgets / Arrange (mockups T4, M6)

The profile body (below the header) is a list of widgets the owner can reorder, resize, and hide.

`profiles.layout` shape:
```json
[
  { "kind": "top_all_time", "size": "full", "hidden": false },
  { "kind": "now_playing", "size": "half", "hidden": false },
  { "kind": "links", "size": "half", "hidden": false },
  { "kind": "top_year", "size": "full", "hidden": false },
  { "kind": "recent_completed", "size": "full", "hidden": true },
  { "kind": "stats", "size": "half", "hidden": true },
  { "kind": "currently_playing", "size": "full", "hidden": true }
]
```
- If `layout` is null or missing kinds, merge with this default (unknown kinds are ignored, missing kinds are appended hidden), so adding new widgets later never breaks old profiles.
- Profile header (avatar, name, bio, now playing) is fixed on top and not part of the layout.
- Desktop renders visible widgets in a 2-column grid; `half` = 1 column, `full` = 2. Mobile: everything is full width.
- Widgets: build each existing profile section as its own component in `src/components/widgets/` and render from a registry `{ kind: Component }`.

Arrange mode:
- "Arrange" button next to "Edit profile" (owner only).
- Desktop (T4): dark banner with Cancel/Done; each widget becomes a card with drag handle, name, Half/Full toggle, × hide, and a small preview. Right panel "Hidden sections" with + to restore.
- Mobile (M6): list rows with an on/off switch and a drag handle, hidden ones listed under "Hidden".
- Save `layout` to `profiles` on Done.

## 4. Mobile (mockups M1–M6)

Breakpoint: `max-width: 768px`. Add a `useIsMobile()` hook in `src/lib/useIsMobile.js` (matchMedia, updates on resize) and branch inline styles on it. Don't add a CSS framework.

- **Nav:** on mobile, hide the top nav and show a floating bottom tab bar (Home, Library, center accent "+" = Add game, Profile). Leave room for a future Friends tab. Add bottom padding to pages so content clears it. Respect `env(safe-area-inset-bottom)`.
- **Touch targets:** at least 44×44px for everything tappable.
- **Home (M1):** 2×2 stats, stacked Currently playing rows, Top 10 as a horizontal scroll strip, 3-col Up next.
- **Library (M2):** full-width search, horizontally scrolling status chips, 2-col card grid.
- **Profile (M3):** stacked header card with round link icons; All-Time #1 as a large hero card, #2–10 in a 3×3 grid; Best of year as a horizontal scroll strip.
- **Edit Top 10 (M4/M5):** vertical list rows (rank, cover, title, ×, drag handle). Empty slots are dashed "Add a game" rows that open a bottom sheet with search + Add buttons.
- **Modals** (Add Game, Edit Game) become full-height bottom sheets on mobile.
- **dnd-kit on touch:** add `TouchSensor` with `{ delay: 200, tolerance: 5 }` and only start drags from the handle on mobile, so scrolling still works.
- Add `<meta name="viewport" content="width=device-width, initial-scale=1">` to `index.html` if missing.

## 5. Done when
- `npm run build` succeeds and `npm run lint` has no errors.
- Light and dark mode both look right on every new screen.
- Existing ranked games show up in All-Time after the migration.
- Adding, removing, reordering, and year switching all survive a page refresh.
- Works at 390px wide with no horizontal scrolling (except intended scroll strips).
