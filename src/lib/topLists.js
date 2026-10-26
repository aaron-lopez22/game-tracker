// Top lists data layer: All-Time Top 10 + Best of {year}.
// Rows live in the `top_entries` table (see supabase/phase2-migration.sql).

import { supabase } from './supabase'

export const MAX_LIST = 10
export const currentYear = () => new Date().getFullYear()

// ───────────────── Supabase calls

// Every entry (both lists, all years) for one profile.
export async function loadTopEntries(profileId) {
  return supabase
    .from('top_entries')
    .select('*')
    .eq('profile_id', profileId)
    .order('position')
}

// Save a whole list in one go. `gameIds` is the new order (index 0 = #1).
// Covers add, remove, and reorder: games not in `gameIds` are removed,
// the rest are inserted or updated with their new position.
export async function saveTopList(profileId, listType, year, gameIds) {
  let del = supabase.from('top_entries').delete()
    .eq('profile_id', profileId)
    .eq('list_type', listType)
  del = year == null ? del.is('year', null) : del.eq('year', year)
  if (gameIds.length) del = del.not('game_id', 'in', `(${gameIds.join(',')})`)
  const delRes = await del
  if (delRes.error) return delRes
  if (gameIds.length === 0) return { data: [], error: null }

  const rows = gameIds.map((gameId, i) => ({
    profile_id: profileId,
    list_type: listType,
    year: listType === 'year' ? year : null,
    game_id: gameId,
    position: i + 1,
  }))
  return supabase
    .from('top_entries')
    .upsert(rows, { onConflict: 'profile_id,list_type,year,game_id' })
    .select()
}

// ───────────────── Helpers (no network)

const sameList = (e, listType, year) =>
  e.list_type === listType && (listType === 'all_time' || e.year === year)

// Game ids in a list, in rank order.
export function listIds(entries, listType, year) {
  return entries
    .filter(e => sameList(e, listType, year))
    .sort((a, b) => a.position - b.position)
    .map(e => e.game_id)
}

// Game objects in a list, in rank order. Skips games that no longer exist.
export function listGames(entries, games, listType, year) {
  const byId = new Map(games.map(g => [g.id, g]))
  return listIds(entries, listType, year).map(id => byId.get(id)).filter(Boolean)
}

// Replace one list's entries locally (for optimistic updates).
export function replaceList(entries, listType, year, newRows) {
  return [...entries.filter(e => !sameList(e, listType, year)), ...newRows]
}

// Years shown in the year picker: every year with entries, plus this year.
export function listYears(entries) {
  const years = new Set([currentYear()])
  entries.forEach(e => { if (e.list_type === 'year' && e.year) years.add(e.year) })
  return [...years].sort((a, b) => b - a)
}
