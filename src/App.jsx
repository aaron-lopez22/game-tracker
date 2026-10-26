// App.jsx — top-level orchestrator. Replaces your existing App.jsx.
// Owns: games list (from Supabase), profile + links (from Supabase),
// current page, modal state. Children stay presentational.

import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import { loadTopEntries, saveTopList, replaceList, listGames } from './lib/topLists'

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
  const [topEntries, setTopEntries] = useState([])
  const [page, setPage] = useState('home')
  const [search, setSearch] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)

  // ───────────────── Load
  useEffect(() => {
    (async () => {
      setLoading(true)
      const [gamesRes, profileRes, linksRes, topRes] = await Promise.all([
        supabase.from('games').select('*').order('created_at', { ascending: false }),
        supabase.from('profiles').select('*').eq('id', MY_PROFILE_ID).maybeSingle(),
        supabase.from('profile_links').select('*').eq('profile_id', MY_PROFILE_ID).order('sort_order'),
        loadTopEntries(MY_PROFILE_ID),
      ])
      if (!gamesRes.error)   setGames(gamesRes.data || [])
      if (profileRes.data)   setProfile({ ...DEFAULT_PROFILE, ...profileRes.data })
      if (!linksRes.error)   setLinks(linksRes.data || [])
      if (!topRes.error)     setTopEntries(topRes.data || [])
      else console.error('Could not load top lists. Has supabase/phase2-migration.sql been run?', topRes.error)
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

  // topChanges: [{ listType, year, gameIds }] for any top list edited in the modal
  const handleSave = async (g, topChanges = []) => {
    const patch = {
      status: g.status,
      start_date: g.start_date || null,
      target_date: g.target_date || null,
      notes: g.notes,
      cover: g.cover,
    }
    const { error } = await supabase.from('games').update(patch).eq('id', g.id)
    if (error) return console.error(error)
    setGames(games.map(x => x.id === g.id ? { ...x, ...patch } : x))
    topChanges.forEach(c => handleSaveTopList(c.listType, c.year, c.gameIds))
    setEditing(null)
  }

  const handleDelete = async (id) => {
    const { error } = await supabase.from('games').delete().eq('id', id)
    if (error) return console.error(error)
    setGames(games.filter(g => g.id !== id))
    // The database removes its top list rows automatically (on delete cascade)
    setTopEntries(prev => prev.filter(e => e.game_id !== id))
  }

  const handleStatusChange = async (g, status) => {
    const { error } = await supabase.from('games').update({ status }).eq('id', g.id)
    if (error) return console.error(error)
    setGames(games.map(x => x.id === g.id ? { ...x, status } : x))
  }

  // ───────────────── Top lists
  // Saves a whole list. gameIds is the new order (index 0 = #1).
  const handleSaveTopList = async (listType, year, gameIds) => {
    // Optimistic update first, with temporary rows
    const temp = gameIds.map((gameId, i) => ({
      id: `temp-${listType}-${year}-${gameId}`,
      profile_id: MY_PROFILE_ID, list_type: listType,
      year: listType === 'year' ? year : null,
      game_id: gameId, position: i + 1,
    }))
    setTopEntries(prev => replaceList(prev, listType, year, temp))

    // Then persist, and swap in the real rows
    const { data, error } = await saveTopList(MY_PROFILE_ID, listType, year, gameIds)
    if (error) {
      console.error(error)
      // Roll back to whatever the database actually has
      const res = await loadTopEntries(MY_PROFILE_ID)
      if (!res.error) setTopEntries(res.data || [])
      return
    }
    setTopEntries(prev => replaceList(prev, listType, year, data))
  }

  // ───────────────── Profile + Links
  const handleSaveProfile = async (patch) => {
    setProfile({ ...profile, ...patch })
    await supabase.from('profiles').upsert({ id: MY_PROFILE_ID, ...patch })
  }

  const handleSaveLayout = async (layout) => {
    setProfile(prev => ({ ...prev, layout }))
    const { error } = await supabase.from('profiles').update({ layout }).eq('id', MY_PROFILE_ID)
    if (error) console.error('Could not save layout. Has supabase/phase2-migration.sql been run?', error)
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
          topTen={listGames(topEntries, games, 'all_time')}
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
          topEntries={topEntries}
          nowPlaying={nowPlaying}
          links={links}
          isOwner={true}
          onSaveProfile={handleSaveProfile}
          onSaveLinks={handleSaveLinks}
          onSaveTopList={handleSaveTopList}
          onSaveLayout={handleSaveLayout}
        />
      )}

      {addOpen   && <AddGameModal onAdd={handleAdd} onClose={() => setAddOpen(false)} />}
      {editing   && (
        <EditGameModal
          game={editing}
          games={games}
          topEntries={topEntries}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}
    </AppShell>
  )
}
