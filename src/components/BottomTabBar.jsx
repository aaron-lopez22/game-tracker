// BottomTabBar — floating mobile nav: Home, Library, big "+" (Add game), Profile.
// To add a tab later (e.g. Friends), add it to TABS; the bar spaces items evenly.

import { theme } from '../lib/theme'
import Icon from './Icon'

const TABS = [
  { key: 'home',    label: 'Home',    icon: 'home' },
  { key: 'library', label: 'Library', icon: 'grid' },
  { key: 'add' },
  { key: 'profile', label: 'Profile', icon: 'user' },
]

// Height of the bar + its gap from the bottom edge. Pages pad by this much.
export const TAB_BAR_SPACE = 96

export default function BottomTabBar({ active, onNavigate, onAddGame }) {
  return (
    <nav style={{
      position: 'fixed', left: 12, right: 12, zIndex: 40,
      bottom: 'calc(16px + env(safe-area-inset-bottom))',
      height: 64, background: theme.surface, borderRadius: 22, boxShadow: theme.shadowRaised,
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
    }}>
      {TABS.map(t => t.key === 'add' ? (
        <button key="add" onClick={onAddGame} aria-label="Add game" style={{
          width: 52, height: 52, borderRadius: 16, background: theme.accent, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.15)',
        }}>
          <Icon name="plus" size={22} color="#fff" strokeWidth={2.5} />
        </button>
      ) : (
        <button key={t.key} onClick={() => onNavigate?.(t.key)} aria-current={active === t.key ? 'page' : undefined} style={{
          width: 64, height: 52, background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3,
          color: active === t.key ? theme.accent : theme.muted,
        }}>
          <Icon name={t.icon} size={20} strokeWidth={active === t.key ? 2.2 : 1.75} />
          <span style={{ fontSize: 10, fontWeight: 600 }}>{t.label}</span>
        </button>
      ))}
    </nav>
  )
}
