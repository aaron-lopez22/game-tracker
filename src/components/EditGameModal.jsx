import { useState } from 'react'
const STATUSES = ['Playing', 'Completed', 'Backlog', 'Dropped']

function EditGameModal({ game, onSave, onClose }) {
  const [form, setForm] = useState({
    title: game.title,
    genre: game.genre,
    status: game.status,
    platform: game.platform,
    startDate: game.startDate,
    goal: game.goal,
    completion: game.completion,
    notes: game.notes,
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    onSave({ ...game, ...form })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md flex flex-col gap-4 shadow-2xl">

        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#4997D0]">Edit Game</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Game title"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4997D0]"
        />

        <input
          name="genre"
          value={form.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4997D0]"
        />

        <input
          name="platform"
          value={form.platform}
          onChange={handleChange}
          placeholder="Platform"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4997D0]"
        />

        <input
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          placeholder="Start date"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4997D0]"
        />

        <input
          name="goal"
          value={form.goal}
          onChange={handleChange}
          placeholder="Your goal"
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4997D0]"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#4997D0]"
        >
          {STATUSES.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500">Completion: {form.completion}%</label>
          <input
            type="range"
            name="completion"
            min="0"
            max="100"
            value={form.completion}
            onChange={handleChange}
            className="accent-[#4997D0]"
          />
        </div>

        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
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
            onClick={handleSave}
            className="px-4 py-2 text-sm bg-[#4997D0] text-white rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  )
}

export default EditGameModal