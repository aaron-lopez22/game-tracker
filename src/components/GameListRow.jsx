import { useState } from 'react'

const STATUS_COLORS = {
  Playing: { bg: '#F28B50', color: '#8C1C03' },
  Completed: { bg: 'transparent', color: '#8C1C03', border: '1px solid #8C1C03' },
  Backlog: { bg: '#8C1C03', color: '#F2EDDC' },
  Dropped: { bg: 'transparent', color: '#BF3604', border: '1px solid #BF3604' },
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
        background: hovered ? '#F2CB57' : '#F2EDDC',
        border: hovered ? '1px solid #8C1C03' : '1px solid rgba(140,28,3,0.2)',
        borderRadius: '3px',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.15s',
        position: 'relative',
      }}
    >
      <div style={{
        width: '52px', height: '52px', borderRadius: '2px',
        overflow: 'hidden', border: '1px solid #BF3604', flexShrink: 0,
      }}>
        {game.cover ? (
          <img src={game.cover} alt={game.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{
            width: '100%', height: '100%', background: '#8C1C03',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px', color: '#BF3604',
          }}>◆</div>
        )}
      </div>

      <div>
        <p style={{
          fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px',
          color: hovered ? '#BF3604' : '#8C1C03',
          letterSpacing: '1px', transition: 'color 0.2s',
        }}>
          {game.title}
        </p>
        <p style={{ fontSize: '11px', fontWeight: '500', color: '#BF3604', marginTop: '2px' }}>
          {game.genre} {game.developer ? `· ${game.developer}` : ''}
        </p>
      </div>

      <p style={{ fontSize: '12px', fontWeight: '600', color: '#8C1C03' }}>
        {game.platform}
      </p>

      <span style={{
        fontSize: '8px', fontWeight: '700', letterSpacing: '1.5px',
        textTransform: 'uppercase', padding: '3px 8px', borderRadius: '2px',
        whiteSpace: 'nowrap', background: status.bg, color: status.color,
        border: status.border || 'none', display: 'inline-block',
      }}>
        {game.status}
      </span>

      <p style={{ fontSize: '12px', fontWeight: '500', color: '#BF3604' }}>
        {game.target_date || '—'}
      </p>

      <div style={{ position: 'relative' }}>
        <button
          onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen) }}
          style={{
            background: menuOpen ? '#8C1C03' : 'none',
            border: '1px solid #8C1C03',
            color: menuOpen ? '#F2EDDC' : '#8C1C03',
            borderRadius: '3px', padding: '2px 8px',
            fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#8C1C03'
            e.currentTarget.style.color = '#F2EDDC'
          }}
          onMouseLeave={e => {
            if (!menuOpen) {
              e.currentTarget.style.background = 'none'
              e.currentTarget.style.color = '#8C1C03'
            }
          }}
        >
          ···
        </button>

        {menuOpen && (
          <div style={{
            position: 'absolute', top: '32px', right: '0',
            background: '#F2EDDC', border: '1px solid #8C1C03',
            borderRadius: '3px', zIndex: 10, overflow: 'hidden', minWidth: '130px',
          }}>
            <button
              onClick={(e) => { e.stopPropagation(); onEdit(game); setMenuOpen(false) }}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '10px 14px', fontSize: '11px', fontWeight: '600',
                letterSpacing: '1.5px', textTransform: 'uppercase',
                color: '#8C1C03', background: 'none', border: 'none',
                borderBottom: '1px solid rgba(140,28,3,0.2)',
                cursor: 'pointer', fontFamily: 'Barlow, sans-serif', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.target.style.background = '#8C1C03'; e.target.style.color = '#F2EDDC' }}
              onMouseLeave={e => { e.target.style.background = 'none'; e.target.style.color = '#8C1C03' }}
            >✏ Edit</button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(game.id); setMenuOpen(false) }}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '10px 14px', fontSize: '11px', fontWeight: '600',
                letterSpacing: '1.5px', textTransform: 'uppercase',
                color: '#BF3604', background: 'none', border: 'none',
                cursor: 'pointer', fontFamily: 'Barlow, sans-serif', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.target.style.background = 'rgba(191,54,4,0.1)'; e.target.style.color = '#8C1C03' }}
              onMouseLeave={e => { e.target.style.background = 'none'; e.target.style.color = '#BF3604' }}
            >✕ Delete</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default GameListRow