import { useState } from 'react'

const STATUS_COLORS = {
  Playing: { bg: '#127369', color: '#8AA6A3' },
  Completed: { bg: 'transparent', color: '#127369', border: '1px solid #127369' },
  Backlog: { bg: '#4C5958', color: '#F0EDE6' },
  Dropped: { bg: 'transparent', color: '#A62E2E', border: '1px solid #A62E2E' },
}

function GameCard({ game, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)

  const status = STATUS_COLORS[game.status] || STATUS_COLORS.Backlog

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMenuOpen(false) }}
      style={{
        background: '#0d3530',
        border: hovered ? '1px solid #8AA6A3' : '1px solid #127369',
        borderRadius: '4px',
        overflow: 'hidden',
        position: 'relative',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 24px rgba(18,115,105,0.25)' : 'none',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      }}
    >
      {game.cover && (
        <img
          src={game.cover}
          alt={game.title}
          style={{
            width: '100%',
            height: expanded ? '160px' : '110px',
            objectFit: 'cover',
            display: 'block',
            transition: 'height 0.3s ease',
          }}
        />
      )}

      {!game.cover && (
        <div style={{
          width: '100%',
          height: expanded ? '160px' : '110px',
          background: '#127369',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          color: '#0d3530',
          transition: 'height 0.3s ease',
        }}>
          ◆
        </div>
      )}

      <button
        onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen) }}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: menuOpen ? '#127369' : 'rgba(13,53,48,0.9)',
          color: '#8AA6A3',
          border: '1px solid #127369',
          borderRadius: '3px',
          padding: '2px 8px',
          fontSize: '14px',
          fontWeight: '700',
          letterSpacing: '1px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          zIndex: 2,
        }}
        onMouseEnter={e => {
          e.target.style.background = '#127369'
          e.target.style.color = '#F0EDE6'
        }}
        onMouseLeave={e => {
          if (!menuOpen) {
            e.target.style.background = 'rgba(13,53,48,0.9)'
            e.target.style.color = '#8AA6A3'
          }
        }}
      >
        ···
      </button>

      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '36px',
          right: '8px',
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

      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
          <h2
            className="bebas"
            onClick={() => setExpanded(!expanded)}
            style={{
              fontSize: '22px',
              letterSpacing: '1px',
              lineHeight: '1.1',
              color: hovered ? '#8AA6A3' : '#FFFFFF',
              cursor: 'pointer',
              transition: 'color 0.2s',
            }}
          >
            {game.title}
          </h2>
          <span style={{
            fontSize: '9px',
            fontWeight: '700',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            padding: '3px 9px',
            borderRadius: '2px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            background: status.bg,
            color: status.color,
            border: status.border || 'none',
          }}>
            {game.status}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <p style={{ fontSize: '11px', color: '#4C5958', letterSpacing: '0.5px' }}>
            ◼ <span style={{ color: '#8AA6A3', fontWeight: '600' }}>{game.platform}</span>
            &nbsp;·&nbsp;{game.genre}
          </p>
          {game.startDate && (
            <p style={{ fontSize: '11px', color: '#4C5958' }}>
              Started: <span style={{ color: '#8AA6A3', fontWeight: '600' }}>{game.startDate}</span>
            </p>
          )}
          {game.targetDate && (
            <p style={{ fontSize: '11px', color: '#4C5958' }}>
              Finish by: <span style={{ color: '#8AA6A3', fontWeight: '600' }}>{game.targetDate}</span>
            </p>
          )}
        </div>

        {game.notes && (
          <p style={{
            fontSize: '11px',
            color: '#4C5958',
            fontStyle: 'italic',
            borderTop: '1px solid rgba(18,115,105,0.3)',
            paddingTop: '8px',
            lineHeight: '1.5',
          }}>
            {game.notes}
          </p>
        )}

        <div
          onClick={() => setExpanded(!expanded)}
          style={{
            fontSize: '10px',
            fontWeight: '600',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#127369',
            textAlign: 'center',
            paddingTop: '4px',
            cursor: 'pointer',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.target.style.color = '#8AA6A3'}
          onMouseLeave={e => e.target.style.color = '#127369'}
        >
          {expanded ? '▼ COLLAPSE' : '▶ EXPAND DETAILS'}
        </div>
      </div>

      <div style={{
        maxHeight: expanded ? '500px' : '0',
        overflow: 'hidden',
        opacity: expanded ? 1 : 0,
        transition: 'max-height 0.35s ease, opacity 0.3s ease',
      }}>
        <div style={{
          padding: '0 16px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          borderTop: '1px solid rgba(18,115,105,0.3)',
        }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
            {game.metacritic && (
              <div style={{
                background: '#10403B',
                border: '1px solid rgba(18,115,105,0.3)',
                borderRadius: '3px',
                padding: '8px 10px',
              }}>
                <p style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#127369', marginBottom: '6px' }}>Metacritic</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '36px', height: '36px',
                    background: game.metacritic >= 75 ? '#127369' : '#8a7a12',
                    borderRadius: '3px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '18px',
                    color: '#F0EDE6',
                  }}>
                    {game.metacritic}
                  </div>
                  <span style={{ fontSize: '10px', color: '#8AA6A3', lineHeight: '1.4' }}>
                    {game.metacritic >= 90 ? 'Universal\nAcclaim' : game.metacritic >= 75 ? 'Generally\nFavorable' : 'Mixed'}
                  </span>
                </div>
              </div>
            )}

            {game.playtime && (
              <div style={{
                background: '#10403B',
                border: '1px solid rgba(18,115,105,0.3)',
                borderRadius: '3px',
                padding: '8px 10px',
              }}>
                <p style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#127369', marginBottom: '6px' }}>Avg Playtime</p>
                <p className="bebas" style={{ fontSize: '22px', color: '#F0EDE6', letterSpacing: '1px' }}>
                  {game.playtime} HRS
                </p>
              </div>
            )}
          </div>

          {game.description && (
            <div style={{
              background: '#10403B',
              border: '1px solid rgba(18,115,105,0.3)',
              borderRadius: '3px',
              padding: '8px 10px',
            }}>
              <p style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#127369', marginBottom: '6px' }}>About</p>
              <p style={{ fontSize: '11px', color: '#8AA6A3', lineHeight: '1.6' }}>{game.description}</p>
            </div>
          )}

          {game.genres && game.genres.length > 0 && (
            <div style={{
              background: '#10403B',
              border: '1px solid rgba(18,115,105,0.3)',
              borderRadius: '3px',
              padding: '8px 10px',
            }}>
              <p style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#127369', marginBottom: '8px' }}>Genres</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
           {game.genres.map((g, index) => (
  <span key={index} style={{
    background: '#0d3530',
    border: '1px solid rgba(18,115,105,0.4)',
    color: '#8AA6A3',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    padding: '3px 8px',
    borderRadius: '2px',
  }}>
    {typeof g === 'object' ? g.name : g}
  </span>
))}
              </div>
            </div>
          )}

          {game.released && (
            <div style={{
              background: '#10403B',
              border: '1px solid rgba(18,115,105,0.3)',
              borderRadius: '3px',
              padding: '8px 10px',
            }}>
              <p style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#127369', marginBottom: '4px' }}>Released</p>
              <p style={{ fontSize: '11px', color: '#8AA6A3' }}>
                {game.released} {game.developer && `· ${game.developer}`}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default GameCard