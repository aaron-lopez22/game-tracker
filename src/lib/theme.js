// Hearth palette + design tokens. Import into any component:
//   import { theme, fonts } from '../lib/theme'

const LIGHT = {
  // Surfaces
  bg:        '#f6efe4',  // soft peach-cream page background
  surface:   '#ffffff',  // raised card surface
  card:      '#fbf4e8',  // nested card (inside surface)
  raised:    '#ffffff',

  // Text
  ink:       '#23201c',
  muted:     '#7a7065',
  faint:     '#b8a99a',

  // Lines
  rule:      'rgba(35,32,28,0.08)',

  // Accents
  accent:    '#e87a4a',  // warm orange (primary)
  accent2:   '#7c9a72',  // sage (success / live)
  accent3:   '#d2a86a',  // honey (backlog / warning)

  // Tints
  blush:     '#f1ddd0',
  sage:      '#d8e2cf',

  // Status colors (used everywhere a status pill renders)
  statusPlaying:   '#e87a4a',
  statusCompleted: '#7c9a72',
  statusBacklog:   '#d2a86a',
  statusOnHold:    '#a08bb5',
  statusDropped:   '#7a7065',

  // Shadows
  shadow:       '0 2px 0 rgba(35,32,28,0.05), 0 8px 24px rgba(35,32,28,0.04)',
  shadowRaised: '0 4px 0 rgba(35,32,28,0.06), 0 14px 36px rgba(35,32,28,0.08)',
}

const DARK = {
  ...LIGHT,
  bg: '#1c1815', surface: '#262220', card: '#2c2725', raised: '#332d2a',
  ink: '#f5ecdf', muted: '#a89c89', faint: '#5e564d',
  rule: 'rgba(245,236,223,0.10)',
  accent: '#f08a5a', accent2: '#9ab48d', accent3: '#e0ba7c',
  blush: '#3a2a22', sage: '#2a3328',
  statusPlaying: '#f08a5a', statusCompleted: '#9ab48d', statusBacklog: '#e0ba7c', statusDropped: '#a89c89',
  shadow: '0 2px 0 rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.3)',
  shadowRaised: '0 4px 0 rgba(0,0,0,0.35), 0 14px 36px rgba(0,0,0,0.4)',
}

// Light/dark: saved in the browser. Toggling saves the choice and reloads the page.
const saved = localStorage.getItem('hearth-theme')
export const isDark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
export const theme = isDark ? DARK : LIGHT
export function toggleTheme() {
  localStorage.setItem('hearth-theme', isDark ? 'light' : 'dark')
  window.location.reload()
}
document.body.style.backgroundColor = theme.bg
document.body.style.color = theme.ink

export const fonts = {
  display: '"Bricolage Grotesque", "Inter Tight", system-ui, sans-serif',
  body:    '"DM Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  mono:    '"DM Mono", "JetBrains Mono", monospace',
}

export const STATUSES = ['Playing', 'Completed', 'Backlog', 'On-Hold', 'Dropped']

export const statusColor = (s) => ({
  Playing:   theme.statusPlaying,
  Completed: theme.statusCompleted,
  Backlog:   theme.statusBacklog,
  'On-Hold': theme.statusOnHold,
  Dropped:   theme.statusDropped,
}[s] || theme.muted)

// Reusable button styles
export const btn = {
  primary: {
    background: theme.ink, color: theme.bg, border: 'none',
    padding: '9px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600,
    fontFamily: fonts.body, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 6,
    boxShadow: '0 2px 0 rgba(35,32,28,0.20)',
  },
  accent: {
    background: theme.accent, color: '#fff', border: 'none',
    padding: '9px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600,
    fontFamily: fonts.body, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 6,
    boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.15), 0 2px 0 rgba(35,32,28,0.18)',
  },
  ghost: {
    background: theme.surface, color: theme.ink, border: 'none',
    padding: '9px 14px', borderRadius: 10, fontSize: 13, fontWeight: 500,
    fontFamily: fonts.body, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 6,
    boxShadow: theme.shadow,
  },
}

// MySpace-style link platforms — used by <LinkTree>
export const LINK_PLATFORMS = {
  twitch:    { label: 'Twitch',    color: '#9146FF', textColor: '#fff' },
  discord:   { label: 'Discord',   color: '#5865F2', textColor: '#fff' },
  tiktok:    { label: 'TikTok',    color: '#000000', textColor: '#fff' },
  youtube:   { label: 'YouTube',   color: '#FF0033', textColor: '#fff' },
  twitter:   { label: 'Twitter / X', color: '#15202b', textColor: '#fff' },
  instagram: { label: 'Instagram', color: 'linear-gradient(135deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', textColor: '#fff' },
  steam:     { label: 'Steam',     color: '#1b2838', textColor: '#fff' },
  bsky:      { label: 'Bluesky',   color: '#0085ff', textColor: '#fff' },
  custom:    { label: 'Custom',    color: '#2a241d', textColor: '#fff' },
}
