import { useState } from 'react'
import GameCard from './components/GameCard'
import EditGameModal from './components/EditGameModal'
import AddGameModal from './components/AddGameModal'

const TABS = ['All', 'Playing', 'Completed', 'Backlog', 'Dropped']

const TAB_COLORS = {
  All: '#127369',
  Playing: '#127369',
  Completed: '#127369',
  Backlog: '#4C5958',
  Dropped: '#A62E2E',
}

export default function App() {
  const [games, setGames] = useState([])
  const [editingGame, setEditingGame] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [activeTab, setActiveTab] = useState('All')

  const filteredGames = activeTab === 'All'
    ? games
    : games.filter(game => game.status === activeTab)

  const countFor = (tab) => tab === 'All'
    ? games.length
    : games.filter(g => g.status === tab).length

  const handleAdd = (newGame) => {
    setGames([...games, newGame])
  }

  const handleEdit = (game) => {
    setEditingGame(game)
  }

  const handleSave = (updatedGame) => {
    setGames(games.map(g => g.id === updatedGame.id ? updatedGame : g))
    setEditingGame(null)
  }

  const handleDelete = (id) => {
    setGames(games.filter(g => g.id !== id))
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#10403B' }}>
      <div className="scanline" />

      <div style={{
        borderBottom: '2px solid #127369',
        padding: '28px 32px 20px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '4px',
            color: '#8AA6A3',
            textTransform: 'uppercase',
          }}>
            — personal collection —
          </span>
          <h1 className="bebas" style={{
            fontSize: '56px',
            letterSpacing: '3px',
            lineHeight: '1',
            color: '#F0EDE6',
          }}>
            GAME <span style={{ color: '#127369' }}>TRACKER</span>
          </h1>
          <span style={{
            fontSize: '11px',
            color: '#4C5958',
            letterSpacing: '2px',
            marginTop: '2px',
          }}>
            TRACK · PLAN · CONQUER
          </span>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          style={{
            background: '#127369',
            color: '#F0EDE6',
            border: 'none',
            padding: '10px 24px',
            fontFamily: 'Barlow, sans-serif',
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            borderRadius: '3px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.target.style.background = '#8AA6A3'
            e.target.style.color = '#10403B'
            e.target.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.target.style.background = '#127369'
            e.target.style.color = '#F0EDE6'
            e.target.style.transform = 'translateY(0)'
          }}
        >
          + ADD GAME
        </button>
      </div>

      <div style={{
        background: '#0d3530',
        padding: '0 32px',
        display: 'flex',
        borderBottom: '1px solid #127369',
      }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '14px 20px',
              fontSize: '11px',
              fontWeight: '600',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: activeTab === tab ? '#8AA6A3' : '#4C5958',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab ? '3px solid #127369' : '3px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '-1px',
              transition: 'color 0.2s',
              fontFamily: 'Barlow, sans-serif',
            }}
            onMouseEnter={e => {
              if (activeTab !== tab) e.currentTarget.style.color = '#8AA6A3'
            }}
            onMouseLeave={e => {
              if (activeTab !== tab) e.currentTarget.style.color = '#4C5958'
            }}
          >
            {tab}
            <span style={{
              background: activeTab === tab ? TAB_COLORS[tab] : '#A62E2E',
               color: '#FFFFFF',
              fontSize: '10px',
              fontWeight: '700',
              padding: '2px 7px',
              borderRadius: '20px',
              letterSpacing: '0',
            }}>
              {countFor(tab)}
            </span>
          </button>
        ))}
      </div>

      <div style={{ padding: '28px 32px' }}>
        {filteredGames.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '100px',
            gap: '12px',
          }}>
            <p className="bebas" style={{
              color: '#4C5958',
              fontSize: '32px',
              letterSpacing: '2px',
            }}>
              {games.length === 0 ? 'NO GAMES YET' : `NO GAMES IN ${activeTab.toUpperCase()}`}
            </p>
            <p style={{ color: '#4C5958', fontSize: '12px', letterSpacing: '1px' }}>
              {games.length === 0 ? 'CLICK + ADD GAME TO GET STARTED' : 'ADD A GAME OR SWITCH TABS'}
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
          }}>
            {filteredGames.map(game => (
              <GameCard
                key={game.id}
                game={game}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddGameModal
          onAdd={handleAdd}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {editingGame && (
        <EditGameModal
          game={editingGame}
          onSave={handleSave}
          onClose={() => setEditingGame(null)}
        />
      )}
    </div>
  )
}