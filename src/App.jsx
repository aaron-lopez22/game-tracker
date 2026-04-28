import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import GameCard from './components/GameCard'
import GameListRow from './components/GameListRow'
import EditGameModal from './components/EditGameModal'
import AddGameModal from './components/AddGameModal'

const TABS = ['All', 'Playing', 'Completed', 'Backlog', 'Dropped']

const TAB_COLORS = {
  All: '#F2CB57',
  Playing: '#F28B50',
  Completed: '#8C1C03',
  Backlog: '#BF3604',
  Dropped: '#8C1C03',
}

export default function App() {
  const [games, setGames] = useState([])
  const [editingGame, setEditingGame] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [activeTab, setActiveTab] = useState('All')
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('grid')

  useEffect(() => { fetchGames() }, [])

  const fetchGames = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('games')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) console.error('Error fetching games:', error)
    else setGames(data)
    setLoading(false)
  }

  const filteredGames = activeTab === 'All'
    ? games
    : games.filter(game => game.status === activeTab)

  const countFor = (tab) => tab === 'All'
    ? games.length
    : games.filter(g => g.status === tab).length

  const handleAdd = async (newGame) => {
    const { data, error } = await supabase
      .from('games')
      .insert([{
        title: newGame.title,
        genre: newGame.genre,
        genres: newGame.genres,
        platform: newGame.platform,
        cover: newGame.cover,
        description: newGame.description,
        metacritic: newGame.metacritic,
        playtime: newGame.playtime,
        released: newGame.released,
        developer: newGame.developer,
        status: newGame.status,
        start_date: newGame.startDate,
        target_date: newGame.targetDate,
        notes: newGame.notes,
      }])
      .select()
    if (error) console.error('Error adding game:', error)
    else setGames([data[0], ...games])
  }

  const handleEdit = (game) => setEditingGame(game)

  const handleSave = async (updatedGame) => {
    const { error } = await supabase
      .from('games')
      .update({
        title: updatedGame.title,
        genre: updatedGame.genre,
        platform: updatedGame.platform,
        status: updatedGame.status,
        start_date: updatedGame.startDate || updatedGame.start_date,
        target_date: updatedGame.targetDate || updatedGame.target_date,
        notes: updatedGame.notes,
      })
      .eq('id', updatedGame.id)
    if (error) console.error('Error updating game:', error)
    else {
      setGames(games.map(g => g.id === updatedGame.id ? { ...g, ...updatedGame } : g))
      setEditingGame(null)
    }
  }

  const handleDelete = async (id) => {
    const { error } = await supabase.from('games').delete().eq('id', id)
    if (error) console.error('Error deleting game:', error)
    else setGames(games.filter(g => g.id !== id))
  }

  const viewBtnStyle = (active) => ({
    background: active ? '#F2CB57' : 'none',
    border: `1px solid #F2CB57`,
    color: active ? '#8C1C03' : '#F2CB57',
    width: '32px',
    height: '32px',
    borderRadius: '3px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    transition: 'all 0.2s',
  })

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#BF3604' }}>
      <div className="scanline" />

      <div style={{
        background: '#8C1C03',
        borderBottom: '3px solid #F2CB57',
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
            color: '#F2CB57',
            textTransform: 'uppercase',
          }}>
            — personal collection —
          </span>
          <h1 className="bebas" style={{
            fontSize: '56px',
            letterSpacing: '3px',
            lineHeight: '1',
            color: '#F2EDDC',
          }}>
            GAME <span style={{ color: '#F2CB57' }}>TRACKER</span>
          </h1>
          <span style={{
            fontSize: '11px',
            fontWeight: '600',
            color: '#F28B50',
            letterSpacing: '2px',
            marginTop: '2px',
          }}>
            TRACK · PLAN · CONQUER
          </span>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          style={{
            background: '#F2CB57',
            color: '#8C1C03',
            border: 'none',
            padding: '10px 24px',
            fontFamily: 'Barlow, sans-serif',
            fontSize: '12px',
            fontWeight: '800',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            borderRadius: '3px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#F2EDDC'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#F2CB57'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          + ADD GAME
        </button>
      </div>

      <div style={{
        background: '#1a0800',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '2px solid #8C1C03',
      }}>
        <div style={{ display: 'flex' }}>
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
                color: activeTab === tab ? '#F2CB57' : '#BF3604',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === tab
                  ? '3px solid #F2CB57'
                  : '3px solid transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '-1px',
                transition: 'color 0.2s',
                fontFamily: 'Barlow, sans-serif',
              }}
              onMouseEnter={e => {
                if (activeTab !== tab) e.currentTarget.style.color = '#F28B50'
              }}
              onMouseLeave={e => {
                if (activeTab !== tab) e.currentTarget.style.color = '#BF3604'
              }}
            >
              {tab}
              <span style={{
                background: activeTab === tab ? TAB_COLORS[tab] : '#8C1C03',
                color: '#F2EDDC',
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

        <div style={{ display: 'flex', gap: '6px' }}>
          <button onClick={() => setView('grid')} style={viewBtnStyle(view === 'grid')} title="Grid view">⊞</button>
          <button onClick={() => setView('list')} style={viewBtnStyle(view === 'list')} title="List view">☰</button>
        </div>
      </div>

      <div style={{ padding: '28px 32px' }}>
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '100px' }}>
            <p className="bebas" style={{ color: '#F2EDDC', fontSize: '32px', letterSpacing: '2px' }}>
              LOADING...
            </p>
          </div>
        ) : filteredGames.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '100px', gap: '12px' }}>
            <p className="bebas" style={{ color: '#F2EDDC', fontSize: '32px', letterSpacing: '2px' }}>
              {games.length === 0 ? 'NO GAMES YET' : `NO GAMES IN ${activeTab.toUpperCase()}`}
            </p>
            <p style={{ color: '#F2EDDC', fontSize: '12px', fontWeight: '500', letterSpacing: '1px' }}>
              {games.length === 0 ? 'CLICK + ADD GAME TO GET STARTED' : 'ADD A GAME OR SWITCH TABS'}
            </p>
          </div>
        ) : view === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="game-grid">
            {filteredGames.map(game => (
              <GameCard key={game.id} game={game} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr 120px 100px 130px 40px',
              gap: '12px',
              padding: '8px 14px',
              fontSize: '9px',
              fontWeight: '700',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#F2CB57',
              borderBottom: '1px solid rgba(242,203,87,0.3)',
              marginBottom: '4px',
            }}>
              <div></div>
              <div>Title</div>
              <div>Platform</div>
              <div>Status</div>
              <div>Finish By</div>
              <div></div>
            </div>
            {filteredGames.map(game => (
              <GameListRow key={game.id} game={game} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddGameModal onAdd={handleAdd} onClose={() => setShowAddModal(false)} />
      )}
      {editingGame && (
        <EditGameModal game={editingGame} onSave={handleSave} onClose={() => setEditingGame(null)} />
      )}
    </div>
  )
}