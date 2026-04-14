import { useState } from 'react'

const STATUS_COLORS = {
  Playing: 'bg-[#4997D0] text-white',
  Completed: 'bg-green-600 text-white',
  Backlog: 'bg-gray-400 text-white',
  Dropped: 'bg-red-500 text-white',
}

function GameCard({ game, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col shadow-xl relative">

      {game.cover && (
        <img
          src={game.cover}
          alt={game.title}
          className="w-full h-36 object-cover"
        />
      )}

      <div className="p-5 flex flex-col gap-3">

        <div className="flex items-center justify-between">
          <h2 className="text-[#4997D0] text-lg font-bold leading-tight">{game.title}</h2>
          <div className="flex items-center gap-2">
            <span className={`${STATUS_COLORS[game.status]} text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap`}>
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
          <div className="absolute top-40 right-4 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <button
              onClick={() => { onEdit(game); setMenuOpen(false) }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#EAF4FB] hover:text-[#4997D0]"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => { onDelete(game.id); setMenuOpen(false) }}
              className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
            >
              🗑️ Delete
            </button>
          </div>
        )}

        <div className="flex flex-col gap-1 text-sm text-gray-600">
          <p>🎮 <span className="font-semibold">{game.platform}</span></p>
          <p>🕹️ <span className="font-semibold">{game.genre}</span></p>
          {game.startDate && (
            <p>📅 Started: <span className="font-semibold">{game.startDate}</span></p>
          )}
          {game.targetDate && (
            <p>🎯 Finish by: <span className="font-semibold">{game.targetDate}</span></p>
          )}
        </div>

        {game.notes && (
          <p className="text-gray-500 text-sm border-t border-gray-100 pt-3">{game.notes}</p>
        )}

      </div>
    </div>
  )
}

export default GameCard