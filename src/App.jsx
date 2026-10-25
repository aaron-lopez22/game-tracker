// App.jsx — top-level orchestrator. Replaces your existing App.jsx.
// Owns: games list (from Supabase), profile + links (from Supabase),
// current page, modal state. Children stay presentational.

import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'

import AppShell from './components/AppShell'
import Home from './components/Home'
import Library from './components/Library'
import Profile from './components/Profile'
import AddGameModal from './components/AddGameModal'
import EditGameModal from './components/EditGameModal'

// While you don't have auth yet, we hard-code "you" as the profile owner.
// When you wire up Supabase auth, swap this for the real user id.
const MY_PROFILE_ID = 'me'

const DEFAULT_PROFILE = {
  id: MY_PROFILE_ID,
  username: 'aaron',
  display: 'Aaron Lopez',
  bio: 'Backlog enjoyer. RPG-pilled.',
  avatar_url: null,
  joined: 'March 2025',
}

export default function App() {
  const [games, setGames] = useState([])
  const [profile, setProfile] = useState(DEFAULT_PROFILE)
  const [links, setLinks] = useState([])
  const [page, setPage] = useState('home')
  const [search, setSearch] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)

  // ───────────────── Load
  useEffect(() => {
    (async () => {
      setLoading(true)
      const [gamesRes, profileRes, linksRes] = await Promise.all([
        supabase.from('games').select('*').order('created_at', { ascending: false }),
        supabase.from('profiles').select('*').eq('id', MY_PROFILE_ID).maybeSingle(),
        supabase.from('profile_links').select('*').eq('profile_id', MY_PROFILE_ID).order('sort_order'),
      ])
      if (!gamesRes.error)   setGames(gamesRes.data || [])
      if (profileRes.data)   setProfile({ ...DEFAULT_PROFILE, ...profileRes.data })
      if (!linksRes.error)   setLinks(linksRes.data || [])
      setLoading(false)
    })()
  }, [])

  // ───────────────── Game CRUD
  const handleAdd = async (g) => {
    const row = {
      title: g.title,
      genre: g.genre,
      genres: g.genres,
      platform: g.platform,
      cover: g.cover,
      description: g.description,
      metacritic: g.metacritic,
      playtime: g.playtime,
      released: g.released,
      developer: g.developer,
      status: g.status,
      start_date: g.startDate || null,
      target_date: g.targetDate || null,
      notes: g.notes,
    }
    const { data, error } = await supabase.from('games').insert([row]).select()
    if (error) return console.error(error)
    setGames([data[0], ...games])
  }

  const handleSave = async (g) => {
    const patch = {
      status: g.status,
      start_date: g.start_date || null,
      target_date: g.target_date || null,
      notes: g.notes,
      cover: g.cover,
      rank: g.rank ?? null,
    }
    const { error } = await supabase.from('games').update(patch).eq('id', g.id)
    if (error) return console.error(error)
    setGames(games.map(x => x.id === g.id ? { ...x, ...patch } : x))
    setEditing(null)
  }

  const handleDelete = async (id) => {
    const { error } = await supabase.from('games').delete().eq('id', id)
    if (error) return console.error(error)
    setGames(games.filter(g => g.id !== id))
  }

  const handleStatusChange = async (g, status) => {
    const { error } = await supabase.from('games').update({ status }).eq('id', g.id)
    if (error) return console.error(error)
    setGames(games.map(x => x.id === g.id ? { ...x, status } : x))
  }

  // ───────────────── Top 10 reorder
  const handleReorderTopTen = async (newRanks) => {
    // newRanks: [{ id, rank }, ...]
    // Optimistic update first
    const rankMap = Object.fromEntries(newRanks.map(r => [r.id, r.rank]))
    setGames(games.map(g => g.id in rankMap ? { ...g, rank: rankMap[g.id] } : g))

    // Then persist each
    await Promise.all(newRanks.map(r =>
      supabase.from('games').update({ rank: r.rank }).eq('id', r.id)
    ))
  }

  // ───────────────── Profile + Links
  const handleSaveProfile = async (patch) => {
    setProfile({ ...profile, ...patch })
    await supabase.from('profiles').upsert({ id: MY_PROFILE_ID, ...patch })
  }

  const handleSaveLinks = async (newLinks) => {
    // Replace strategy: delete all, re-insert. Simple, ~10 rows max.
    setLinks(newLinks)
    await supabase.from('profile_links').delete().eq('profile_id', MY_PROFILE_ID)
    if (newLinks.length === 0) return
    const rows = newLinks.map((l, i) => ({
      profile_id: MY_PROFILE_ID,
      platform: l.platform,
      url: l.url,
      label: l.label || null,
      enabled: l.enabled !== false,
      sort_order: i,
    }))
    await supabase.from('profile_links').insert(rows)
  }

  // ───────────────── Render
  const nowPlaying = games.find(g => g.status === 'Playing')

  return (
    <AppShell
      active={page}
      onNavigate={setPage}
      onAddGame={() => setAddOpen(true)}
      user={profile}
      search={page === 'library' ? search : undefined}
      onSearchChange={page === 'library' ? setSearch : undefined}
    >
      {loading ? (
        <div style={{ padding: 60, textAlign: 'center', color: '#7a7065' }}>Loading your games…</div>
      ) : page === 'home' ? (
        <Home
          games={games}
          onPickGame={setEditing}
          onNavigate={setPage}
        />
      ) : page === 'library' ? (
        <Library
          games={games}
          search={search}
          onEdit={setEditing}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
          onAddGame={() => setAddOpen(true)}
        />
      ) : (
        <Profile
          profile={profile}
          games={games}
          nowPlaying={nowPlaying}
          links={links}
          isOwner={true}
          onSaveProfile={handleSaveProfile}
          onSaveLinks={handleSaveLinks}
          onReorderTopTen={handleReorderTopTen}
        />
      )}

      {addOpen   && <AddGameModal onAdd={handleAdd} onClose={() => setAddOpen(false)} />}
      {editing   && <EditGameModal game={editing} onSave={handleSave} onClose={() => setEditing(null)} />}
    </AppShell>
  )
}
