// EditGameModal — edit status, dates, notes, custom cover for an existing game.

import { useState } from 'react'
import { theme, fonts, btn, STATUSES, statusColor } from '../lib/theme'
import Cover from './Cover'
import { Backdrop, modalStyle, closeBtnStyle, inputStyle, Label } from './AddGameModal'

export default function EditGameModal({ game, onSave, onClose }) {
  const [status, setStatus] = useState(game.status || 'Backlog')
  const [startDate, setStartDate] = useState(game.start_date || '')
  const [targetDate, setTargetDate] = useState(game.target_date || '')
  const [notes, setNotes] = useState(game.notes || '')
  const [cover, setCover] = useState(game.cover || '')

  const commit = () => {
    onSave?.({
      ...game,
      status,
      start_date: startDate || null,
      target_date: targetDate || null,
      notes,
      cover,
    })
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
