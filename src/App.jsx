import { useState } from 'react'

const STATUS_COLORS = {
  Playing: 'bg-[#4997D0] text-white',
  Completed: 'bg-green-600 text-white',
  Backlog: 'bg-gray-400 text-white',
  Dropped: 'bg-red-500 text-white',
}

function GameCard({ game, onEdit }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-white rounded-xl p-5 flex flex-col gap-3 shadow-xl relative">

      <div className="flex items-center justify-between">
        <h2 className="text-[#4997D0] text-xl font-bold">{game.title}</h2>
        <div className="flex items-center gap-2">
          <span className={`${STATUS_COLORS[game.status]} text-xs font-semibold px-3 py-1 rounded-full`}>
            {game.status}
          </span>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-400 hover:text-[#4997D0] font-bold text-lg px-1"
          >
            ···
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute top-12 right-4 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <button
            onClick={() => { onEdit(game); setMenuOpen(false) }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#EAF4FB] hover:text-[#4997D0]"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => setMenuOpen(false)}
            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
          >
            🗑️ Delete
          </button>
        </div>
      )}

      <p className="text-gray-500 text-sm">{game.genre}</p>

      <div className="flex flex-col gap-1 text-sm text-gray-600">
        <p>🎮 Platform: <span className="font-semibold">{game.platform}</span></p>
        <p>📅 Started: <span className="font-semibold">{game.startDate}</span></p>
        <p>🎯 Goal: <span className="font-semibold">{game.goal}</span></p>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-[#4997D0] h-2 rounded-full"
          style={{ width: `${game.completion}%` }}
        />
      </div>
      <p className="text-gray-400 text-xs">{game.completion}% complete</p>

      {game.notes && (
        <p className="text-gray-600 text-sm border-t border-[#4997D0] pt-3">{game.notes}</p>
      )}

    </div>
  )
}

export default function App() {
  const [games, setGames] = useState([
    {
      id: 1,
      title: 'Elden Ring',
      genre: 'RPG',
      status: 'Playing',
      platform: 'PC',
      startDate: 'March 1, 2026',
      goal: 'Beat Malenia and finish main story',
      completion: 45,
      notes: 'Need to finish Nokron and get to Morgott',
    },
    {
      id: 2,
      title: 'God of War',
      genre: 'Action-Adventure',
      status: 'Completed',
      platform: 'PS5',
      startDate: 'January 10, 2026',
      goal: 'Full completion',
      completion: 100,
      notes: '',
    },
    {
      id: 3,
      title: 'Hollow Knight',
      genre: 'Metroidvania',
      status: 'Backlog',
      platform: 'PC',
      startDate: 'Not started',
      goal: 'Finish main story first run',
      completion: 0,
      notes: 'Start after Elden Ring',
    },
  ])

  const handleEdit = (game) => {
    console.log('Edit clicked for:', game.title)
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: '#1a2a3a' }}>

      <div className="flex items-center gap-4 mb-2">
        <div className="w-2 h-10 bg-[#4997D0] rounded-full" />
        <h1 className="text-4xl font-bold text-[#4997D0]">🎮 Game Tracker</h1>
        <div className="w-2 h-10 bg-[#4997D0] rounded-full" />
      </div>

      <p className="text-gray-400 mb-8 ml-6">Track your backlog and progress</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map(game => (
          <GameCard key={game.id} game={game} onEdit={handleEdit} />
        ))}
      </div>

    </div>
  )
}
