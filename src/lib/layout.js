// Profile widget layout: which sections show below the profile header,
// in what order, and how wide. Saved as `profiles.layout` (jsonb).

export const DEFAULT_LAYOUT = [
  { kind: 'top_all_time',      size: 'full', hidden: false },
  { kind: 'now_playing',       size: 'half', hidden: false },
  { kind: 'links',             size: 'half', hidden: false },
  { kind: 'top_year',          size: 'full', hidden: false },
  { kind: 'recent_completed',  size: 'full', hidden: true },
  { kind: 'stats',             size: 'half', hidden: true },
  { kind: 'currently_playing', size: 'full', hidden: true },
]

// Names + one-liners shown in Arrange mode
export const WIDGET_INFO = {
  top_all_time:      { name: 'All-Time Top 10',    desc: 'Your ten favorite games ever' },
  top_year:          { name: 'Best of the year',   desc: 'Favorites from one year' },
  now_playing:       { name: 'Now Playing',        desc: "What you're playing right now" },
  links:             { name: 'Links',              desc: 'Twitch, Discord, and more' },
  recent_completed:  { name: 'Recently completed', desc: 'Your last finished games' },
  stats:             { name: 'Stats',              desc: 'Completed, hours, backlog size' },
  currently_playing: { name: 'Currently playing',  desc: 'Everything marked Playing' },
}

// Clean up a saved layout so it always matches the widgets that exist:
// null → the default; unknown kinds are dropped; missing kinds are added hidden.
// This way, adding a new widget later never breaks old profiles.
export function normalizeLayout(saved) {
  if (!Array.isArray(saved)) return DEFAULT_LAYOUT.map(w => ({ ...w }))
  const known = new Set(DEFAULT_LAYOUT.map(w => w.kind))
  const seen = new Set()
  const out = []
  for (const w of saved) {
    if (!w || !known.has(w.kind) || seen.has(w.kind)) continue
    seen.add(w.kind)
    out.push({ kind: w.kind, size: w.size === 'half' ? 'half' : 'full', hidden: !!w.hidden })
  }
  for (const w of DEFAULT_LAYOUT) {
    if (!seen.has(w.kind)) out.push({ ...w, hidden: true })
  }
  return out
}
