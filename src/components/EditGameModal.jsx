// EditGameModal — edit status, dates, notes, custom cover, and top list
// placement for an existing game. Top list changes only save on Save.

import { useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import { theme, fonts, btn, STATUSES, statusColor } from '../lib/theme'
import { MAX_LIST, currentYear, listIds } from '../lib/topLists'
import Cover from './Cover'
import Icon from './Icon'
import { Backdrop, Label } from './AddGameModal'
import { modalStyle, closeBtnStyle, inputStyle } from '../lib/modalStyles'

export default function EditGameModal({ game, games = [], topEntries = [], onSave, onClose }) {
  const [status, setStatus] = useState(game.status || 'Backlog')
  const [startDate, setStartDate] = useState(game.start_date || '')
  const [targetDate, setTargetDate] = useState(game.target_date || '')
  const [notes, setNotes] = useState(game.notes || '')
  const [cover, setCover] = useState(game.cover || '')

  // Top lists: snapshot each list when the modal opens, edit a draft copy
  const [lists] = useState(() => {
    const year = currentYear()
    return [
      { listType: 'all_time', year: null, title: 'All-Time Top 10' },
      { listType: 'year', year, title: `Best of ${year}` },
    ].map(l => ({ ...l, original: listIds(topEntries, l.listType, l.year) }))
  })
  const [drafts, setDrafts] = useState(() => lists.map(l => l.original))
  const setDraft = (k, ids) => setDrafts(drafts.map((d, i) => i === k ? ids : d))

  const commit = () => {
    const topChanges = lists
      .map((l, k) => ({ listType: l.listType, year: l.year, gameIds: drafts[k], original: l.original }))
      .filter(c => c.gameIds.join(',') !== c.original.join(','))
    onSave?.({
      ...game,
      status,
      start_date: startDate || null,
      target_date: targetDate || null,
      notes,
      cover,
    }, topChanges)
  }

  return (
    <Backdrop onClose={onClose}>
      <div style={modalStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: theme.muted, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>✏️ Editing</div>
            <h2 style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 4 }}>{game.title}</h2>
          </div>
          <button onClick={onClose} style={closeBtnStyle} aria-label="Close">✕</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 12, background: theme.surface, borderRadius: 12, boxShadow: theme.shadow }}>
          <Cover src={cover} title={game.title} width={64} height={84} radius={10} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: theme.muted }}>{game.developer || 'Unknown developer'} · {String(game.released || '').slice(0, 4)}</div>
            <div style={{ fontSize: 13, color: theme.ink, marginTop: 4 }}>
              {game.platform || '—'} · {game.genre || 'Unknown'}
            </div>
          </div>
        </div>

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

        <div style={{ marginTop: 22 }}>
          <Label>Top lists</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {lists.map((l, k) => (
              <TopListRow
                key={l.listType}
                title={l.title}
                game={game}
                games={games}
                ids={drafts[k]}
                onChange={(ids) => setDraft(k, ids)}
              />
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
          <Label>Custom cover URL</Label>
          <input type="url" value={cover} onChange={(e) => setCover(e.target.value)} placeholder="https://…" style={inputStyle} />
        </div>

        <div style={{ marginTop: 18 }}>
          <Label>Notes</Label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} style={{ ...inputStyle, resize: 'none' }} />
        </div>

        <div style={{ marginTop: 22, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button onClick={onClose} style={btn.ghost}>Cancel</button>
          <button onClick={commit} style={btn.accent}>Save changes</button>
        </div>
      </div>
    </Backdrop>
  )
}

// One row per top list: rank + move/remove if the game is in it,
// "Add as #N" if there's room, or a swap chooser if the list is full.
function TopListRow({ title, game, games, ids, onChange }) {
  const [swapping, setSwapping] = useState(false)
  const pos = ids.indexOf(game.id)
  const full = ids.length >= MAX_LIST
  const byId = new Map(games.map(g => [g.id, g]))

  let sub, right
  if (pos >= 0) {
    sub = `Ranked #${pos + 1}`
    right = (
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
          <select
            value={pos + 1}
            onChange={(e) => onChange(arrayMove(ids, pos, Number(e.target.value) - 1))}
            aria-label={`Position in ${title}`}
            style={{
              ...btn.ghost, appearance: 'none', WebkitAppearance: 'none',
              padding: '9px 30px 9px 14px', background: theme.blush, boxShadow: 'none',
              color: theme.ink, fontWeight: 600, outline: 'none',
            }}
          >
            {ids.map((_, i) => <option key={i} value={i + 1}>#{i + 1}</option>)}
          </select>
          <span style={{ position: 'absolute', right: 11, pointerEvents: 'none', display: 'flex' }}>
            <Icon name="arrow-down" size={12} color={theme.muted} />
          </span>
        </div>
        <button onClick={() => onChange(ids.filter(id => id !== game.id))} style={btn.ghost}>Remove</button>
      </div>
    )
  } else if (!full) {
    sub = `${ids.length} of ${MAX_LIST} spots used`
    right = (
      <button onClick={() => onChange([...ids, game.id])} style={btn.accent}>
        <Icon name="plus" size={14} color="#fff" strokeWidth={2.5} /> Add as #{ids.length + 1}
      </button>
    )
  } else {
    sub = 'List is full'
    right = (
      <button onClick={() => setSwapping(!swapping)} style={btn.ghost}>
        {swapping ? 'Cancel' : 'Add…'}
      </button>
    )
  }

  return (
    <div style={{ padding: 14, background: theme.surface, borderRadius: 14, boxShadow: theme.shadow }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: theme.ink }}>{title}</div>
          <div style={{ fontSize: 12, color: theme.muted }}>{sub}</div>
        </div>
        {right}
      </div>

      {swapping && pos < 0 && full && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${theme.rule}` }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: theme.ink, marginBottom: 8 }}>Swap out which game?</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {ids.map((id, i) => {
              const g = byId.get(id)
              return (
                <button
                  key={id}
                  onClick={() => { onChange(ids.map(x => x === id ? game.id : x)); setSwapping(false) }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '6px 8px',
                    background: 'transparent', border: 'none', borderRadius: 10, cursor: 'pointer',
                    textAlign: 'left', fontFamily: fonts.body, color: theme.ink,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = theme.bg }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                >
                  <span style={{ width: 24, fontFamily: fonts.display, fontWeight: 800, color: theme.muted }}>#{i + 1}</span>
                  <Cover src={g?.cover} title={g?.title || ''} width={28} height={38} radius={5} />
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g?.title || 'Unknown game'}</span>
                  <span style={{ fontSize: 12, color: theme.accent, fontWeight: 600 }}>Swap</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
