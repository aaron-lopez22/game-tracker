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
    title: selectedGame.name,
    genre: selectedGame.genres?.[0] || 'Unknown',
    genres: selectedGame.genres || [],
    platform: selectedGame.platforms?.[0]?.platform?.name || 'Unknown',
    cover: selectedGame.background_image,
    description: selectedGame.description || '',
    metacritic: selectedGame.metacritic || null,
    playtime: selectedGame.playtime || null,
    released: selectedGame.released || '',
    developer: selectedGame.developer || '',
    status,
    startDate,
    targetDate,
    notes,
  })
  onClose()
}

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md flex flex-col gap-4 shadow-2xl">

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#4997D0]">Add a Game</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchGames()}
            placeholder="Search for a game..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4997D0]"
          />
          <button
            onClick={searchGames}
            className="bg-[#4997D0] text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {loading && (
          <p className="text-sm text-gray-400 text-center">Searching...</p>
        )}

        {results.length > 0 && (
          <div className="border border-gray-200 rounded-lg overflow-hidden max-h-48 overflow-y-auto">
            {results.map(game => (
              <button
                key={game.id}
                onClick={() => handleSelect(game)}
                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-[#EAF4FB] text-left border-b border-gray-100 last:border-0"
              >
                {game.background_image && (
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                )}
                <div>
                  <p className="text-sm font-semibold text-gray-700">{game.name}</p>
                  <p className="text-xs text-gray-400">{game.released}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {selectedGame && (
          <div className="flex items-center gap-3 bg-[#EAF4FB] rounded-lg p-3">
            {selectedGame.background_image && (
              <img
                src={selectedGame.background_image}
                alt={selectedGame.name}
                className="w-12 h-12 rounded object-cover"
              />
            )}
            <div>
              <p className="text-sm font-bold text-[#4997D0]">{selectedGame.name}</p>
              <p className="text-xs text-gray-500">
                {selectedGame.genres?.[0]?.name} • {selectedGame.platforms?.[0]?.platform?.name}
              </p>
            </div>
          </div>
        )}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4997D0]"
        >
          {STATUSES.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <div className="flex gap-3">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs text-gray-500">Date Started</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4997D0]"
            />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs text-gray-500">Target Finish</label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4997D0]"
            />
          </div>
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes or plans..."
          rows={3}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4997D0] resize-none"
        />

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!selectedGame}
            className="px-4 py-2 text-sm bg-[#4997D0] text-white rounded-lg hover:bg-blue-600 disabled:opacity-40"
          >
            Add Game
          </button>
        </div>

      </div>
    </div>
  )
}

export default AddGameModal