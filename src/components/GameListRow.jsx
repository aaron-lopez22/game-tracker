import { useState } from 'react'

const STATUS_COLORS = {
  Playing: { bg: '#127369', color: '#8AA6A3' },
  Completed: { bg: 'transparent', color: '#127369', border: '1px solid #127369' },
  Backlog: { bg: '#4C5958', color: '#F0EDE6' },
  Dropped: { bg: 'transparent', color: '#A62E2E', border: '1px solid #A62E2E' },
}

function GameListRow({ game, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState(false)

  const status = STATUS_COLORS[game.status] || STATUS_COLORS.Backlog

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMenuOpen(false) }}
      style={{
        display: 'grid',
        gridTemplateColumns: '60px 1fr 120px 100px 130px 40px',
        gap: '12px',
        padding: '10px 14px',
        background: hovered ? 'rgba(18,115,105,0.1)' : '#0d3530',
        border: hovered ? '1px solid #8AA6A3' : '1px solid rgba(18,115,105,0.2)',
        borderRadius: '3px',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.15s',
        position: 'relative',
      }}
    >
      <div style={{
        width: '52px',
        height: '52px',
        borderRadius: '2px',
        overflow: 'hidden',
        border: '1px solid rgba(18,115,105,0.3)',
        flexShrink: 0,
      }}>
        {game.cover ? (
          <img
            src={game.cover}
            alt={game.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: '#127369',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            color: '#0d3530',
          }}>
            ◆
          </div>
        )}
      </div>

      <div>
        <p style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '18px',
          color: hovered ? '#8AA6A3' : '#FFFFFF',
          letterSpacing: '1px',
          transition: 'color 0.2s',
        }}>
          {game.title}
        </p>
        <p style={{
          fontSize: '11px',
          fontWeight: '500',
          color: '#4C5958',
          marginTop: '2px',
        }}>
          {game.genre} {game.developer ? `· ${game.developer}` : ''}
        </p>
      </div>

      <p style={{ fontSize: '12px', fontWeight: '600', color: '#FFFFFF' }}>
        {game.platform}
      </p>

      <span style={{
        fontSize: '8px',
        fontWeight: '700',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        padding: '3px 8px',
        borderRadius: '2px',
        whiteSpace: 'nowrap',
        background: status.bg,
        color: status.color,
        border: status.border || 'none',
        display: 'inline-block',
      }}>
        {game.status}
      </span>

      <p style={{ fontSize: '12px', fontWeight: '500', color: '#8AA6A3' }}>
        {game.target_date || '—'}
      </p>

      <div style={{ position: 'relative' }}>
        <button
          onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen) }}
          style={{
            background: 'none',
            border: '1px solid #127369',
            color: '#8AA6A3',
            borderRadius: '3px',
            padding: '2px 8px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#127369'
            e.currentTarget.style.color = '#FFFFFF'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'none'
            e.currentTarget.style.color = '#8AA6A3'
          }}
        >
          ···
        </button>

        {menuOpen && (
          <div style={{
            position: 'absolute',
            top: '32px',
            right: '0',
            background: '#0d3530',
            border: '1px solid #127369',
            borderRadius: '3px',
            zIndex: 10,
            overflow: 'hidden',
            minWidth: '130px',
          }}>
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(game); setMenuOpen(false) }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '10px 14px',
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#8AA6A3',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(18,115,105,0.3)',
                cursor: 'pointer',
                fontFamily: 'Barlow, sans-serif',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                e.target.style.background = '#127369'
                e.target.style.color = '#F0EDE6'
              }}
              onMouseLeave={e => {
                e.target.style.background = 'none'
                e.target.style.color = '#8AA6A3'
              }}
            >
              ✏ Edit
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(game.id); setMenuOpen(false) }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '10px 14px',
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#A62E2E',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Barlow, sans-serif',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                e.target.style.background = 'rgba(166,46,46,0.15)'
                e.target.style.color = '#ff6b6b'
              }}
              onMouseLeave={e => {
                e.target.style.background = 'none'
                e.target.style.color = '#A62E2E'
              }}
            >
              ✕ Delete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default GameListRow