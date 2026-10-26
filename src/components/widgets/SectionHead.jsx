// SectionHead — title + optional subtitle on the left, actions on the right.

import { theme, fonts } from '../../lib/theme'

export default function SectionHead({ title, sub, right, size = 26 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginBottom: 14, flexWrap: 'wrap' }}>
      <div>
        <h2 style={{ fontFamily: fonts.display, fontSize: size, fontWeight: 700, letterSpacing: '-0.02em', color: theme.ink, lineHeight: 1.1 }}>{title}</h2>
        {sub && <div style={{ fontSize: 13, color: theme.muted, marginTop: 4 }}>{sub}</div>}
      </div>
      {right}
    </div>
  )
}

// Friendly empty state for a top list.
export function EmptyList({ text, isOwner, onAdd }) {
  return (
    <div style={{
      padding: 40, background: theme.surface, borderRadius: 20,
      boxShadow: theme.shadow, textAlign: 'center',
    }}>
      <div style={{ fontSize: 40, marginBottom: 10 }}>🏆</div>
      <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: theme.ink }}>Nothing here yet</h3>
      <p style={{ color: theme.muted, fontSize: 14, marginTop: 6 }}>{text}</p>
      {isOwner && (
        <button onClick={onAdd} style={{
          marginTop: 16, background: theme.accent, color: '#fff', border: 'none',
          padding: '10px 18px', borderRadius: 10, fontSize: 13, fontWeight: 600,
          fontFamily: fonts.body, cursor: 'pointer',
          boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.15)',
        }}>+ Add games</button>
      )}
    </div>
  )
}
