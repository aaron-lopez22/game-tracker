// AppShell — top nav + page chrome shared across Home / Library / Profile.
// Holds the current "page" state in App.jsx via the `active` + `onNavigate` props.

import { theme, fonts, btn, isDark, toggleTheme } from '../lib/theme'
import Avatar from './Avatar'

function Icon({ name, size = 16, color = 'currentColor', strokeWidth = 1.75 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'home':    return <svg {...p}><path d="M3 12 12 3l9 9"/><path d="M5 10v11h14V10"/></svg>
    case 'grid':    return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
    case 'user':    return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>
    case 'plus':    return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>
    case 'search':  return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m21 21-5-5"/></svg>
    case 'moon':    return <svg {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
    case 'sun':     return <svg {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
    default: return null
  }
}

function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8, background: theme.accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.15)',
      }}>
        <div style={{ width: 8, height: 8, background: '#fff', borderRadius: '50%' }} />
      </div>
      <span style={{
        fontFamily: fonts.display, fontSize: 22, fontWeight: 700,
        letterSpacing: '-0.025em', color: theme.ink,
      }}>hearth</span>
    </div>
  )
}

export default function AppShell({ active = 'home', onNavigate, onAddGame, user, children, search, onSearchChange }) {
  const items = [
    { key: 'home',    label: 'Home',    icon: 'home' },
    { key: 'library', label: 'Library', icon: 'grid' },
    { key: 'profile', label: 'Profile', icon: 'user' },
  ]
  return (
    <div style={{
      minHeight: '100vh', background: theme.bg, color: theme.ink,
      fontFamily: fonts.body, fontSize: 14,
    }}>
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 36px', maxWidth: 1400, margin: '0 auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <Logo />
          <nav style={{
            display: 'flex', gap: 4, background: theme.surface,
            padding: 4, borderRadius: 12, boxShadow: theme.shadow,
          }}>
            {items.map(it => (
              <button key={it.key} onClick={() => onNavigate?.(it.key)} style={{
                padding: '7px 14px', borderRadius: 8,
                background: active === it.key ? theme.ink : 'transparent',
                color: active === it.key ? theme.bg : theme.muted,
                border: 'none', cursor: 'pointer', fontWeight: 500,
                fontSize: 13, fontFamily: fonts.body,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <Icon name={it.icon} size={13} color={active === it.key ? theme.bg : theme.muted} />
                {it.label}
              </button>
            ))}
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {onSearchChange && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px',
              background: theme.surface, borderRadius: 999, width: 220, boxShadow: theme.shadow,
            }}>
              <Icon name="search" size={14} color={theme.muted} />
              <input
                value={search || ''}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Find a game…"
                style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: theme.ink, flex: 1, fontFamily: fonts.body }}
              />
            </div>
          )}
          {onAddGame && (
            <button onClick={onAddGame} style={btn.accent}>
              <Icon name="plus" size={14} color="#fff" strokeWidth={2.5} />
              Add game
            </button>
          )}
          <button onClick={toggleTheme} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'} title={isDark ? 'Light mode' : 'Dark mode'} style={{
            width: 36, height: 36, borderRadius: 10, border: 'none', cursor: 'pointer',
            background: theme.surface, boxShadow: theme.shadow,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name={isDark ? 'sun' : 'moon'} size={16} color={theme.ink} />
          </button>
          <Avatar name={user?.display || 'You'} src={user?.avatar_url} size={36} radius={10} />
        </div>
      </header>

      <main style={{ maxWidth: 1400, margin: '0 auto' }}>
        {children}
      </main>
    </div>
  )
}
