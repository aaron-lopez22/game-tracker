// GameCard — the Hearth-styled card. Replaces the burgundy version.
// Click → opens edit modal. Status dropdown on the card for fast status changes.

import { useState } from 'react'
import { theme, fonts, statusColor, STATUSES } from '../lib/theme'
import useIsMobile from '../lib/useIsMobile'
import Cover from './Cover'

export default function GameCard({ game, onEdit, onDelete, onStatusChange }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hover, setHover] = useState(false)
  const isMobile = useIsMobile()

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setMenuOpen(false) }}
      style={{
        background: theme.surface, borderRadius: 14, overflow: 'hidden',
        boxShadow: hover ? theme.shadowRaised : theme.shadow,
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
        position: 'relative', cursor: 'pointer',
      }}
      onClick={() => onEdit?.(game)}
    >
      <div style={{ position: 'relative' }}>
        <Cover src={game.cover} title={game.title} width="100%" height={isMobile ? 200 : 170} radius={0} />
        <div style={{
          position: 'absolute', top: 8, left: 8,
          padding: '3px 9px', borderRadius: 999,
          background: statusColor(game.status), color: '#fff',
          fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          {game.status}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen) }}
          style={{
            position: 'absolute', top: isMobile ? 4 : 8, right: isMobile ? 4 : 8,
            width: isMobile ? 44 : 28, height: isMobile ? 44 : 28, borderRadius: isMobile ? 12 : 8, border: 'none',
            background: 'rgba(255,255,255,0.92)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: theme.ink, fontSize: 14, fontWeight: 700,
            backdropFilter: 'blur(6px)',
          }}
          aria-label="More options"
        >⋯</button>

        {menuOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute', top: isMobile ? 52 : 42, right: isMobile ? 4 : 8, minWidth: 160,
              background: theme.surface, borderRadius: 12, padding: 6,
              boxShadow: '0 8px 28px rgba(0,0,0,0.18), 0 0 0 1px ' + theme.rule,
              zIndex: 10,
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 600, color: theme.muted, padding: '6px 10px 4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Set status</div>
            {STATUSES.map(s => (
              <button key={s} onClick={() => { onStatusChange?.(game, s); setMenuOpen(false) }}
                style={menuItemStyle(game.status === s)}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: statusColor(s), display: 'inline-block', marginRight: 8 }} />
                {s}
              </button>
            ))}
            <div style={{ height: 1, background: theme.rule, margin: '6px 4px' }} />
            <button onClick={() => { onEdit?.(game); setMenuOpen(false) }} style={menuItemStyle(false)}>Edit details…</button>
            <button onClick={() => { if (confirm(`Delete "${game.title}"?`)) onDelete?.(game.id); setMenuOpen(false) }}
              style={{ ...menuItemStyle(false), color: '#c0392b' }}>Delete</button>
          </div>
        )}
      </div>

      <div style={{ padding: '10px 12px' }}>
        <div style={{
          fontFamily: fonts.display, fontSize: 14, fontWeight: 700,
          color: theme.ink, lineHeight: 1.2,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{game.title}</div>
        <div style={{
          fontSize: 11, color: theme.muted, marginTop: 4,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {game.platform || '—'}{game.released ? ' · ' + String(game.released).slice(0, 4) : ''}
        </div>
      </div>
    </div>
  )
}

function menuItemStyle(active) {
  return {
    display: 'flex', alignItems: 'center',
    width: '100%', padding: '7px 10px', borderRadius: 8,
    background: active ? theme.card : 'transparent',
    border: 'none', cursor: 'pointer',
    fontSize: 13, color: theme.ink, fontFamily: fonts.body, textAlign: 'left',
  }
}
