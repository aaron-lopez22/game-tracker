import { useState } from 'react'
import GameCard from './components/GameCard'
import EditGameModal from './components/EditGameModal'
import AddGameModal from './components/AddGameModal'

const TABS = ['All', 'Playing', 'Completed', 'Backlog', 'Dropped']

const TAB_COLORS = {
  All: 'bg-[#4997D0]',
  Playing: 'bg-[#4997D0]',
  Completed: 'bg-green-600',
  Backlog: 'bg-gray-400',
  Dropped: 'bg-red-500',
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

  const handleClose = () => {
    setEditingGame(null)
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#1a2a3a' }}>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-2 h-10 bg-[#4997D0] rounded-full" />
          <h1 className="text-4xl font-bold text-[#4997D0]">🎮 Game Tracker</h1>
          <div className="w-2 h-10 bg-[#4997D0] rounded-full" />
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#4997D0] text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-600"
        >
          + Add Game
        </button>
      </div>

      <div className="flex gap-2 mb-8 flex-wrap">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
         className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
  activeTab === tab
    ? `${TAB_COLORS[tab]} text-white shadow-lg scale-105`
    : 'bg-gray-700 text-white hover:bg-gray-600'
}`}
          >
            {tab}
            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {countFor(tab)}
            </span>
          </button>
        ))}
      </div>

      {filteredGames.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 gap-4">
          <p className="text-gray-500 text-xl">
            {games.length === 0 ? 'No games yet' : `No games in ${activeTab}`}
          </p>
          <p className="text-gray-600 text-sm">
            {games.length === 0 ? 'Click + Add Game to get started' : 'Add a game or switch tabs'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          onClose={handleClose}
        />
      )}

    </div>
  )
}
