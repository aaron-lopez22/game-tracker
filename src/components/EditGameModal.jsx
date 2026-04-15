import { useState } from 'react'

const STATUSES = ['Playing', 'Completed', 'Backlog', 'Dropped']

function EditGameModal({ game, onSave, onClose }) {
  const [form, setForm] = useState({
    title: game.title,
    genre: game.genre,
    status: game.status,
    platform: game.platform,
    startDate: game.startDate,
    targetDate: game.targetDate,
    notes: game.notes || '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    onSave({ ...game, ...form })
    onClose()
  }

  const inputStyle = {
    width: '100%',
    background: '#0d3530',
    border: '1px solid #127369',
    borderRadius: '3px',
    padding: '10px 14px',
    color: '#F0EDE6',
    fontSize: '12px',
    fontFamily: 'Barlow, sans-serif',
    letterSpacing: '0.5px',
    outline: 'none',
  }

  const labelStyle = {
    fontSize: '9px',
    fontWeight: '700',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#127369',
    marginBottom: '6px',
    display: 'block',
  }

  const fieldStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  }

  return (
    <div style={{
      position: 'fixed',
      inset: '0',
      background: 'rgba(0,0,0,0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
    }}>
      <div style={{
        background: '#10403B',
        border: '1px solid #127369',
        borderRadius: '4px',
        padding: '28px',
        width: '100%',
        maxWidth: '440px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '3px', color: '#4C5958', textTransform: 'uppercase', marginBottom: '4px' }}>
              — editing —
            </p>
            <h2 style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '28px',
              letterSpacing: '2px',
              color: '#FFFFFF',
            }}>
              {game.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid #4C5958',
              color: '#4C5958',
              borderRadius: '3px',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.target.style.borderColor = '#A62E2E'
              e.target.style.color = '#A62E2E'
            }}
            onMouseLeave={e => {
              e.target.style.borderColor = '#4C5958'
              e.target.style.color = '#4C5958'
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ height: '1px', background: 'rgba(18,115,105,0.3)' }} />

        <div style={fieldStyle}>
          <label style={labelStyle}>Title</label>
          <input name="title" value={form.title} onChange={handleChange} style={inputStyle} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Genre</label>
            <input name="genre" value={form.genre} onChange={handleChange} style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Platform</label>
            <input name="platform" value={form.platform} onChange={handleChange} style={inputStyle} />
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={{ ...inputStyle, cursor: 'pointer' }}
          >
            {STATUSES.map(s => (
              <option key={s} value={s} style={{ background: '#10403B' }}>{s}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Date Started</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              style={{ ...inputStyle, colorScheme: 'dark' }}
            />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Target Finish</label>
            <input
              type="date"
              name="targetDate"
              value={form.targetDate}
              onChange={handleChange}
              style={{ ...inputStyle, colorScheme: 'dark' }}
            />
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Notes & Plans</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Write your plans, strategies, goals..."
            style={{
              ...inputStyle,
              resize: 'none',
              lineHeight: '1.6',
            }}
          />
        </div>

        <div style={{ height: '1px', background: 'rgba(18,115,105,0.3)' }} />

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: '1px solid #4C5958',
              color: '#4C5958',
              padding: '10px 20px',
              borderRadius: '3px',
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: 'Barlow, sans-serif',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#8AA6A3'
              e.currentTarget.style.color = '#8AA6A3'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#4C5958'
              e.currentTarget.style.color = '#4C5958'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              background: '#127369',
              border: '1px solid #127369',
              color: '#F0EDE6',
              padding: '10px 20px',
              borderRadius: '3px',
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: 'Barlow, sans-serif',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#8AA6A3'
              e.currentTarget.style.borderColor = '#8AA6A3'
              e.currentTarget.style.color = '#10403B'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#127369'
              e.currentTarget.style.borderColor = '#127369'
              e.currentTarget.style.color = '#F0EDE6'
            }}
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  )
}

export default EditGameModal