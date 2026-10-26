// AddGameModal — RAWG search + status + notes. Hearth visual style.
// Behavior matches your existing modal. Pass onAdd({ ...gameFields }) to commit.

import { useState } from 'react'
import { theme, fonts, btn, STATUSES, statusColor } from '../lib/theme'
import Cover from './Cover'
import { modalStyle, closeBtnStyle, inputStyle } from '../lib/modalStyles'

const API_KEY = import.meta.env.VITE_RAWG_API_KEY

export default function AddGameModal({ onAdd, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selected, setSelected] = useState(null)
  const [status, setStatus] = useState('Backlog')
  const [startDate, setStartDate] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [notes, setNotes] = useState('')
  const [customCover, setCustomCover] = useState('')
  const [loading, setLoading] = useState(false)

  const search = async () => {
    if (!query.trim()) return
    setLoading(true)
    try {
      const r = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(query)}&page_size=6`)
      const data = await r.json()
      setResults(data.results || [])
    } finally {
      setLoading(false)
    }
  }

  const pick = async (g) => {
    setSelected(g)
    setResults([])
    setQuery(g.name)
    // hydrate details
    try {
      const r = await fetch(`https://api.rawg.io/api/games/${g.id}?key=${API_KEY}`)
      const d = await r.json()
      setSelected({
        ...g,
        description: d.description_raw ? d.description_raw.slice(0, 200) + '…' : '',
        metacritic: d.metacritic || null,
        playtime: d.playtime || null,
        genres: d.genres?.map(x => x.name) || [],
        released: d.released || '',
        developer: d.developers?.[0]?.name || '',
      })
    } catch { /* keep basic info if details fail */ }

  }

  const commit = () => {
    if (!selected) return
    onAdd({
      title: selected.name || '',
      genre: selected.genres?.[0] || 'Unknown',
      genres: selected.genres || [],
      platform: selected.platforms?.[0]?.platform?.name || 'Unknown',
      cover: customCover || selected.background_image || null,
      description: selected.description || '',
      metacritic: selected.metacritic || null,
      playtime: selected.playtime || null,
      released: selected.released || '',
      developer: selected.developer || '',
      status,
      startDate,
      targetDate,
      notes,
    })
    onClose?.()
  }

  return (
    <Backdrop onClose={onClose}>
      <div style={modalStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: theme.muted, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>📦 New entry</div>
            <h2 style={{ fontFamily: fonts.display, fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 4 }}>Add a game</h2>
          </div>
          <button onClick={onClose} style={closeBtnStyle} aria-label="Close">✕</button>
        </div>

        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px',
          background: theme.surface, borderRadius: 14, border: `2px solid ${theme.accent}`,
          boxShadow: '0 0 0 4px ' + theme.accent + '20',
        }}>
          <span style={{ fontSize: 16 }}>🔍</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && search()}
            placeholder="Search by title…"
            autoFocus
            style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 15, color: theme.ink, flex: 1, fontFamily: fonts.body, fontWeight: 500 }}
          />
          <button onClick={search} disabled={!query.trim() || loading} style={{ ...btn.accent, padding: '6px 14px', fontSize: 12 }}>
            {loading ? '…' : 'Search'}
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 280, overflowY: 'auto' }}>
            {results.map(r => (
              <button key={r.id} onClick={() => pick(r)} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: 12,
                background: theme.surface, borderRadius: 12, cursor: 'pointer',
                border: '2px solid transparent', boxShadow: theme.shadow,
                textAlign: 'left',
              }}>
                <Cover src={r.background_image} title={r.name} width={48} height={64} radius={8} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: fonts.display, fontSize: 15, fontWeight: 700, color: theme.ink }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: theme.muted, marginTop: 3 }}>{r.released}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Selected card */}
        {selected && (
          <div style={{ marginTop: 14, padding: 12, background: theme.blush, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 14, border: `2px solid ${theme.accent}` }}>
            <Cover src={customCover || selected.background_image} title={selected.name} width={48} height={64} radius={8} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: fonts.display, fontSize: 16, fontWeight: 700, color: theme.ink }}>{selected.name}</div>
              <div style={{ fontSize: 12, color: theme.muted, marginTop: 3 }}>
                {(selected.developer || selected.developers?.[0]?.name || '')}
                {selected.released && ` · ${selected.released}`}
              </div>
            </div>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: theme.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>✓</div>
          </div>
        )}

        {/* Status */}
        <div style={{ marginTop: 22 }}>
          <Label>Status</Label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {STATUSES.map(s => (
              <button key={s} onClick={() => setStatus(s)} style={{
                padding: '8px 14px', borderRadius: 10,
                background: status === s ? statusColor(s) : theme.surface,
                color: status === s ? '#fff' : theme.ink,
                border: 'none', cursor: 'pointer', fontWeight: 600,
                fontSize: 12, fontFamily: fonts.body,
                boxShadow: status === s ? 'inset 0 -2px 0 rgba(0,0,0,0.18)' : theme.shadow,
              }}>{s}</button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <Label>Started</Label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <Label>Target finish</Label>
            <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} style={inputStyle} />
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <Label>Custom cover URL <span style={{ color: theme.muted, fontWeight: 400 }}>(optional — overrides RAWG)</span></Label>
          <input
            type="url" value={customCover} onChange={(e) => setCustomCover(e.target.value)}
            placeholder="https://…"
            style={inputStyle}
          />
        </div>

        <div style={{ marginTop: 18 }}>
          <Label>Notes</Label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
            placeholder="Plans, strategies, vibes…"
            style={{ ...inputStyle, resize: 'none' }} />
        </div>

        <div style={{ marginTop: 22, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button onClick={onClose} style={btn.ghost}>Cancel</button>
          <button onClick={commit} disabled={!selected} style={{ ...btn.accent, opacity: selected ? 1 : 0.5 }}>+ Add to library</button>
        </div>
      </div>
    </Backdrop>
  )
}

export function Backdrop({ onClose, children }) {
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(35,32,28,0.5)',
      backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 50, padding: 20,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 660, maxHeight: '90vh', overflowY: 'auto', borderRadius: 24 }}>
        {children}
      </div>
    </div>
  )
}

export function Label({ children }) {
  return (
    <div style={{
      fontSize: 11, color: theme.muted, fontWeight: 600,
      letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8,
    }}>{children}</div>
  )
}
