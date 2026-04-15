import { useState } from 'react'

const STATUSES = ['Playing', 'Completed', 'Backlog', 'Dropped']
const API_KEY = import.meta.env.VITE_RAWG_API_KEY

function AddGameModal({ onAdd, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selectedGame, setSelectedGame] = useState(null)
  const [status, setStatus] = useState('Backlog')
  const [startDate, setStartDate] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  const searchGames = async () => {
    if (!query) return
    setLoading(true)
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}&page_size=6`
    )
    const data = await response.json()
    setResults(data.results)
    setLoading(false)
  }

  const handleSelect = async (game) => {
    setSelectedGame(game)
    setResults([])
    setQuery(game.name)
    const res = await fetch(
      `https://api.rawg.io/api/games/${game.id}?key=${API_KEY}`
    )
    const detail = await res.json()
    setSelectedGame({
      ...game,
      description: detail.description_raw
        ? detail.description_raw.slice(0, 200) + '...'
        : '',
      metacritic: detail.metacritic || null,
      playtime: detail.playtime || null,
      genres: detail.genres?.map(g => g.name) || [],
      released: detail.released || '',
      developer: detail.developers?.[0]?.name || '',
    })
  }

  const handleAdd = () => {
    if (!selectedGame) return
    onAdd({
      id: Date.now(),
      title: selectedGame.name || '',
      genre: typeof selectedGame.genres?.[0] === 'object'
        ? selectedGame.genres[0].name
        : selectedGame.genres?.[0] || 'Unknown',
      genres: (selectedGame.genres || []).map(g =>
        typeof g === 'object' ? g.name : g
      ),
      platform: typeof selectedGame.platforms?.[0]?.platform === 'object'
        ? selectedGame.platforms[0].platform.name
        : selectedGame.platforms?.[0]?.platform || 'Unknown',
      cover: selectedGame.background_image || null,
      description: selectedGame.description || '',
      metacritic: selectedGame.metacritic || null,
      playtime: selectedGame.playtime || null,
      released: selectedGame.released || '',
      developer: typeof selectedGame.developer === 'object'
        ? selectedGame.developer?.name || ''
        : selectedGame.developer || '',
      status,
      startDate,
      targetDate,
      notes,
    })
    onClose()
  }

  const inputStyle = {
    width: '100%',
    background: '#0d3530',
    border: '1px solid #127369',
    borderRadius: '3px',
    padding: '10px 14px',
    color: '#FFFFFF',
    fontSize: '13px',
    fontFamily: 'Barlow, sans-serif',
    fontWeight: '500',
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
        maxWidth: '460px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{
              fontSize: '10px',
              fontWeight: '600',
              letterSpacing: '3px',
              color: '#4C5958',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}>
              — new entry —
            </p>
            <h2 style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '28px',
              letterSpacing: '2px',
              color: '#FFFFFF',
            }}>
              ADD A GAME
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
              e.currentTarget.style.borderColor = '#A62E2E'
              e.currentTarget.style.color = '#A62E2E'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#4C5958'
              e.currentTarget.style.color = '#4C5958'
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ height: '1px', background: 'rgba(18,115,105,0.3)' }} />

        <div style={fieldStyle}>
          <label style={labelStyle}>Search Game</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchGames()}
              placeholder="Search by title..."
              style={{ ...inputStyle, flex: 1 }}
            />
            <button
              onClick={searchGames}
              style={{
                background: '#127369',
                border: '1px solid #127369',
                color: '#F0EDE6',
                padding: '10px 18px',
                borderRadius: '3px',
                fontSize: '11px',
                fontWeight: '600',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontFamily: 'Barlow, sans-serif',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#8AA6A3'
                e.currentTarget.style.color = '#10403B'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#127369'
                e.currentTarget.style.color = '#F0EDE6'
              }}
            >
              Search
            </button>
          </div>
        </div>

        {loading && (
          <p style={{
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#4C5958',
            textAlign: 'center',
          }}>
            Searching...
          </p>
        )}

        {results.length > 0 && (
          <div style={{
            border: '1px solid #127369',
            borderRadius: '3px',
            overflow: 'hidden',
            maxHeight: '200px',
            overflowY: 'auto',
          }}>
            {results.map(game => (
              <button
                key={game.id}
                onClick={() => handleSelect(game)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '10px 14px',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid rgba(18,115,105,0.2)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(18,115,105,0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                {game.background_image && (
                  <img
                    src={game.background_image}
                    alt={game.name}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '2px',
                      objectFit: 'cover',
                      flexShrink: 0,
                      border: '1px solid #127369',
                    }}
                  />
                )}
                <div>
                  <p style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#FFFFFF',
                    marginBottom: '2px',
                    fontFamily: 'Barlow, sans-serif',
                  }}>
                    {game.name}
                  </p>
                  <p style={{
                    fontSize: '10px',
                    color: '#4C5958',
                    letterSpacing: '0.5px',
                    fontFamily: 'Barlow, sans-serif',
                    fontWeight: '500',
                  }}>
                    {game.released}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {selectedGame && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: '#0d3530',
            border: '1px solid #127369',
            borderRadius: '3px',
            padding: '12px',
          }}>
            {selectedGame.background_image && (
              <img
                src={selectedGame.background_image}
                alt={selectedGame.name}
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '2px',
                  objectFit: 'cover',
                  flexShrink: 0,
                  border: '1px solid #127369',
                }}
              />
            )}
            <div>
              <p style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '18px',
                letterSpacing: '1px',
                color: '#FFFFFF',
                marginBottom: '2px',
              }}>
                {selectedGame.name}
              </p>
              <p style={{ fontSize: '11px', color: '#8AA6A3', fontWeight: '500' }}>
                {typeof selectedGame.genres?.[0] === 'object'
                  ? selectedGame.genres[0].name
                  : selectedGame.genres?.[0] || ''
                } · {selectedGame.platforms?.[0]?.platform?.name || ''}
              </p>
            </div>
          </div>
        )}

        <div style={fieldStyle}>
          <label style={labelStyle}>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ ...inputStyle, colorScheme: 'dark' }}
            />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Target Finish</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              style={{ ...inputStyle, colorScheme: 'dark' }}
            />
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>Notes & Plans</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your plans, strategies, goals..."
            rows={3}
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
            onClick={handleAdd}
            disabled={!selectedGame}
            style={{
              background: selectedGame ? '#127369' : '#0d3530',
              border: `1px solid ${selectedGame ? '#127369' : '#4C5958'}`,
              color: selectedGame ? '#F0EDE6' : '#4C5958',
              padding: '10px 20px',
              borderRadius: '3px',
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              cursor: selectedGame ? 'pointer' : 'not-allowed',
              fontFamily: 'Barlow, sans-serif',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              if (selectedGame) {
                e.currentTarget.style.background = '#8AA6A3'
                e.currentTarget.style.color = '#10403B'
              }
            }}
            onMouseLeave={e => {
              if (selectedGame) {
                e.currentTarget.style.background = '#127369'
                e.currentTarget.style.color = '#F0EDE6'
              }
            }}
          >
            Add Game
          </button>
        </div>

      </div>
    </div>
  )
}

export default AddGameModal