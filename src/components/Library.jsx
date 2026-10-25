// Library — filterable grid of all games.
// Status pills filter; search box filters by title.

import { useState, useMemo } from 'react'
import { theme, fonts, btn, statusColor, STATUSES } from '../lib/theme'
import GameCard from './GameCard'

export default function Library({ games = [], search = '', onEdit, onDelete, onStatusChange, onAddGame }) {
  const [status, setStatus] = useState('All')

  const filtered = useMemo(() => {
    let g = games
    if (status !== 'All') g = g.filter(x => x.status === status)
    if (search.trim()) {
      const q = search.toLowerCase()
      g = g.filter(x => (x.title || '').toLowerCase().includes(q))
    }
    return g
  }, [games, status, search])

  const counts = useMemo(() => {
    const c = { All: games.length }
    STATUSES.forEach(s => { c[s] = games.filter(g => g.status === s).length })
    return c
  }, [games])

  return (
    <div style={{ padding: '20px 36px 60px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
        <h1 style={{ fontFamily: fonts.display, fontSize: 40, fontWeight: 700, letterSpacing: '-0.03em' }}>
          Library <span style={{ color: theme.muted, fontWeight: 500 }}>·</span>{' '}
          <span style={{ color: theme.muted, fontWeight: 600, fontSize: 24 }}>{games.length}</span>
        </h1>
        {onAddGame && (
          <button onClick={onAddGame} style={btn.accent}>+ Add game</button>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
        {['All', ...STATUSES].map(s => {
          const color = s === 'All' ? theme.ink : statusColor(s)
          const active = status === s
          return (
            <button key={s} onClick={() => setStatus(s)} style={{
              padding: '8px 14px', borderRadius: 999,
              background: active ? color : theme.surface,
              color: active ? '#fff' : theme.ink,
              border: 'none', cursor: 'pointer', fontWeight: 600,
              fontSize: 13, fontFamily: fonts.body,
              display: 'inline-flex', alignItems: 'center', gap: 8,
              boxShadow: active ? 'inset 0 -2px 0 rgba(0,0,0,0.15)' : theme.shadow,
            }}>
              {s}
              <span style={{
                padding: '1px 7px', borderRadius: 999,
                background: active ? 'rgba(255,255,255,0.25)' : theme.card,
                fontSize: 10, fontWeight: 700,
                color: active ? '#fff' : theme.muted,
              }}>{counts[s]}</span>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <div style={{
          padding: 60, background: theme.surface, borderRadius: 20,
          textAlign: 'center', boxShadow: theme.shadow,
        }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎮</div>
          <h3 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 800, color: theme.ink }}>
            {games.length === 0 ? 'No games yet' : `Nothing in ${status}`}
          </h3>
          <p style={{ color: theme.muted, fontSize: 14, marginTop: 6 }}>
            {games.length === 0 ? 'Click "Add game" up top to get started.' : 'Try a different status filter.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14 }}>
          {filtered.map(g => (
            <GameCard key={g.id} game={g} onEdit={onEdit} onDelete={onDelete} onStatusChange={onStatusChange} />
          ))}
        </div>
      )}
    </div>
  )
}
