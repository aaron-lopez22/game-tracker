// LiveBadge — sage "live" pill with a pulsing dot.

import { theme } from '../lib/theme'

export default function LiveBadge({ label = 'live' }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 9px 3px 7px', borderRadius: 999,
      background: theme.accent2, color: '#fff', fontSize: 10, fontWeight: 700,
      letterSpacing: '0.06em', textTransform: 'uppercase',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%', background: '#fff',
        animation: 'hearth-pulse 1.6s ease-in-out infinite',
      }} />
      {label}
    </span>
  )
}
