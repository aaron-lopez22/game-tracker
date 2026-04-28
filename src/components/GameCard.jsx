import { useState } from 'react'

const STATUS_COLORS = {
  Playing: { bg: '#F28B50', color: '#8C1C03' },
  Completed: { bg: 'transparent', color: '#8C1C03', border: '1px solid #8C1C03' },
  Backlog: { bg: '#8C1C03', color: '#F2EDDC' },
  Dropped: { bg: 'transparent', color: '#BF3604', border: '1px solid #BF3604' },
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
        background: '#F2EDDC',
        border: hovered ? '1px solid #8C1C03' : '1px solid #BF3604',
        borderRadius: '4px',
        overflow: 'hidden',
        position: 'relative',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 24px rgba(140,28,3,0.3)' : 'none',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
      }}
    >
      {game.cover ? (
        <img
          src={game.cover}
          alt={game.title}
          style={{
            width: '100%',
            height: expanded ? '160px' : '140px',
            objectFit: 'cover',
            display: 'block',
            transition: 'height 0.3s ease',
          }}
        />
      ) : (
        <div style={{
          width: '100%',
          height: expanded ? '160px' : '140px',
          background: '#8C1C03',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          color: '#BF3604',
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
          background: menuOpen ? '#8C1C03' : 'rgba(242,237,220,0.9)',
          color: menuOpen ? '#F2EDDC' : '#8C1C03',
          border: '1px solid #8C1C03',
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
          e.target.style.background = '#8C1C03'
          e.target.style.color = '#F2EDDC'
        }}
        onMouseLeave={e => {
          if (!menuOpen) {
            e.target.style.background = 'rgba(242,237,220,0.9)'
            e.target.style.color = '#8C1C03'
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
          background: '#F2EDDC',
          border: '1px solid #8C1C03',
          borderRadius: '3px',
          zIndex: 10,
          overflow: 'hidden',
          minWidth: '130px',
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
          >
            ✏ Edit
          </button>
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
              fontSize: '22px', letterSpacing: '1px', lineHeight: '1.1',
              color: hovered ? '#BF3604' : '#8C1C03',
              cursor: 'pointer', transition: 'color 0.2s',
            }}
          >
            {game.title}
          </h2>
          <span style={{
            fontSize: '9px', fontWeight: '700', letterSpacing: '1.5px',
            textTransform: 'uppercase', padding: '3px 9px', borderRadius: '2px',
            whiteSpace: 'nowrap', flexShrink: 0,
            background: status.bg, color: status.color, border: status.border || 'none',
          }}>
            {game.status}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <p style={{ fontSize: '12px', fontWeight: '500', color: '#BF3604', letterSpacing: '0.5px' }}>
            ◼ <span style={{ color: '#8C1C03', fontWeight: '600' }}>{game.platform}</span>
            &nbsp;·&nbsp;{game.genre}
          </p>
          {game.start_date && (
            <p style={{ fontSize: '12px', fontWeight: '500', color: '#BF3604' }}>
              Started: <span style={{ color: '#8C1C03', fontWeight: '600' }}>{game.start_date}</span>
            </p>
          )}
          {game.target_date && (
            <p style={{ fontSize: '12px', fontWeight: '500', color: '#BF3604' }}>
              Finish by: <span style={{ color: '#8C1C03', fontWeight: '600' }}>{game.target_date}</span>
            </p>
          )}
        </div>

        {game.notes && (
          <p style={{
            fontSize: '12px', fontWeight: '500', color: '#BF3604',
            fontStyle: 'italic', borderTop: '1px solid rgba(140,28,3,0.2)',
            paddingTop: '8px', lineHeight: '1.6',
          }}>
            {game.notes}
          </p>
        )}

        <div
          onClick={() => setExpanded(!expanded)}
          style={{
            fontSize: '10px', fontWeight: '600', letterSpacing: '2px',
            textTransform: 'uppercase', color: '#BF3604',
            textAlign: 'center', paddingTop: '4px', cursor: 'pointer', transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.target.style.color = '#8C1C03'}
          onMouseLeave={e => e.target.style.color = '#BF3604'}
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
          padding: '0 16px 16px', display: 'flex', flexDirection: 'column',
          gap: '10px', borderTop: '1px solid rgba(140,28,3,0.2)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
            {game.metacritic && (
              <div style={{
                background: '#F2EDDC',
                border: '1px solid rgba(140,28,3,0.2)',
                borderRadius: '3px', padding: '8px 10px',
              }}>
                <p style={{
                  fontSize: '9px', fontWeight: '700', letterSpacing: '2px',
                  textTransform: 'uppercase', color: '#BF3604', marginBottom: '6px',
                }}>Metacritic</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '36px', height: '36px',
                    background: game.metacritic >= 75 ? '#F28B50' : '#8C1C03',
                    borderRadius: '3px', display: 'flex', alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px', color: '#F2EDDC',
                  }}>
                    {game.metacritic}
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '500', color: '#8C1C03', lineHeight: '1.4' }}>
                    {game.metacritic >= 90 ? 'Universal Acclaim' : game.metacritic >= 75 ? 'Generally Favorable' : 'Mixed'}
                  </span>
                </div>
              </div>
            )}

            {game.playtime && (
              <div style={{
                background: '#F2EDDC',
                border: '1px solid rgba(140,28,3,0.2)',
                borderRadius: '3px', padding: '8px 10px',
              }}>
                <p style={{
                  fontSize: '9px', fontWeight: '700', letterSpacing: '2px',
                  textTransform: 'uppercase', color: '#BF3604', marginBottom: '6px',
                }}>Avg Playtime</p>
                <p className="bebas" style={{ fontSize: '22px', color: '#8C1C03', letterSpacing: '1px' }}>
                  {game.playtime} HRS
                </p>
              </div>
            )}
          </div>

          {game.description && (
            <div style={{
              background: '#F2EDDC',
              border: '1px solid rgba(140,28,3,0.2)',
              borderRadius: '3px', padding: '8px 10px',
            }}>
              <p style={{
                fontSize: '9px', fontWeight: '700', letterSpacing: '2px',
                textTransform: 'uppercase', color: '#BF3604', marginBottom: '6px',
              }}>About</p>
              <p style={{ fontSize: '12px', fontWeight: '500', color: '#8C1C03', lineHeight: '1.6' }}>
                {game.description}
              </p>
            </div>
          )}

          {game.genres && game.genres.length > 0 && (
            <div style={{
              background: '#F2EDDC',
              border: '1px solid rgba(140,28,3,0.2)',
              borderRadius: '3px', padding: '8px 10px',
            }}>
              <p style={{
                fontSize: '9px', fontWeight: '700', letterSpacing: '2px',
                textTransform: 'uppercase', color: '#BF3604', marginBottom: '8px',
              }}>Genres</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {game.genres.map((g, index) => (
                  <span key={index} style={{
                    background: '#F28B50',
                    border: '1px solid #BF3604',
                    color: '#8C1C03',
                    fontSize: '10px', fontWeight: '700',
                    letterSpacing: '1px', textTransform: 'uppercase',
                    padding: '3px 8px', borderRadius: '2px',
                  }}>
                    {typeof g === 'object' ? g.name : g}
                  </span>
                ))}
              </div>
            </div>
          )}

          {game.released && (
            <div style={{
              background: '#F2EDDC',
              border: '1px solid rgba(140,28,3,0.2)',
              borderRadius: '3px', padding: '8px 10px',
            }}>
              <p style={{
                fontSize: '9px', fontWeight: '700', letterSpacing: '2px',
                textTransform: 'uppercase', color: '#BF3604', marginBottom: '4px',
              }}>Released</p>
              <p style={{ fontSize: '12px', fontWeight: '500', color: '#8C1C03' }}>
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