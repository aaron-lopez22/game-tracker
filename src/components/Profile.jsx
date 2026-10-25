// Profile — the public sharable profile page.
// Shows: banner with bio + Now Playing, Top 10 (drag-to-reorder), LinkTree,
// Recently Completed shelf, by-the-numbers stats.

import { useState } from 'react'
import { theme, fonts, btn } from '../lib/theme'
import Avatar from './Avatar'
import Cover from './Cover'
import TopTen from './TopTen'
import LinkTree from './LinkTree'
import LinkEditor from './LinkEditor'

export default function Profile({
  profile,              // { username, display, bio, avatar_url, joined }
  games = [],           // all games (for Top 10 + completed)
  nowPlaying,           // single game currently playing
  links = [],           // array of { id, platform, url, label, enabled }
  isOwner = false,      // show edit UI?
  onSaveProfile,        // (patch) => void
  onSaveLinks,          // (newLinks) => void
  onReorderTopTen,      // (newRanks) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draftProfile, setDraftProfile] = useState(profile)
  const [draftLinks, setDraftLinks] = useState(links)

  const topTen = games.filter(g => g.rank && g.rank > 0)
  const completed = games
    .filter(g => g.status === 'Completed')
    .sort((a, b) => (b.updated_at || '').localeCompare(a.updated_at || ''))
    .slice(0, 8)

  const stats = {
    completed: games.filter(g => g.status === 'Completed').length,
    playing:   games.filter(g => g.status === 'Playing').length,
    backlog:   games.filter(g => g.status === 'Backlog').length,
    dropped:   games.filter(g => g.status === 'Dropped').length,
    hours: games.reduce((s, g) => s + (g.playtime || 0), 0),
  }

  const saveAll = () => {
    onSaveProfile?.(draftProfile)
    onSaveLinks?.(draftLinks)
    setEditing(false)
  }

  return (
    <div style={{ padding: '16px 36px 60px' }}>
      {/* Banner */}
      <section style={{
        background: `linear-gradient(135deg, ${theme.blush} 0%, ${theme.sage} 100%)`,
        borderRadius: 24, padding: 32, position: 'relative', overflow: 'hidden',
        boxShadow: theme.shadowRaised,
      }}>
        <div style={{
          position: 'absolute', top: 20, right: 30,
          fontFamily: fonts.display, fontSize: 240, fontWeight: 700,
          color: 'rgba(255,255,255,0.15)', lineHeight: 0.8, pointerEvents: 'none',
        }}>✦</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 28, alignItems: 'center', position: 'relative' }}>
          <Avatar name={draftProfile.display} src={draftProfile.avatar_url} size={140} radius={28} style={{ fontSize: 52, boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }} />
          <div>
            <div style={{ fontSize: 13, color: theme.ink, opacity: 0.7, fontWeight: 500 }}>
              @{draftProfile.username}{profile.joined ? ` · joined ${profile.joined}` : ''}
            </div>
            {editing ? (
              <input
                value={draftProfile.display || ''}
                onChange={(e) => setDraftProfile({ ...draftProfile, display: e.target.value })}
                style={{
                  fontFamily: fonts.display, fontSize: 64, fontWeight: 700,
                  letterSpacing: '-0.035em', color: theme.ink, lineHeight: 1,
                  marginTop: 6, background: 'rgba(255,255,255,0.4)', border: 'none',
                  borderRadius: 8, padding: '4px 8px', width: '100%', outline: 'none',
                }}
              />
            ) : (
              <h1 style={{
                fontFamily: fonts.display, fontSize: 64, fontWeight: 700,
                letterSpacing: '-0.035em', color: theme.ink, lineHeight: 1, marginTop: 6,
              }}>{draftProfile.display || draftProfile.username}</h1>
            )}
            {editing ? (
              <textarea
                value={draftProfile.bio || ''}
                onChange={(e) => setDraftProfile({ ...draftProfile, bio: e.target.value })}
                rows={2}
                style={{
                  marginTop: 12, fontSize: 16, color: theme.ink, maxWidth: 540,
                  width: '100%', background: 'rgba(255,255,255,0.4)', border: 'none',
                  borderRadius: 8, padding: 10, fontFamily: fonts.body, outline: 'none',
                  resize: 'none',
                }}
              />
            ) : (
              <p style={{ marginTop: 12, fontSize: 16, color: theme.ink, opacity: 0.85, maxWidth: 540, lineHeight: 1.45 }}>
                {draftProfile.bio || 'No bio yet.'}
              </p>
            )}
          </div>

          {/* Now Playing card */}
          {nowPlaying && (
            <div style={{
              background: theme.surface, borderRadius: 16, padding: 16, minWidth: 240,
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            }}>
              <LiveBadge />
              <div style={{ fontSize: 11, color: theme.muted, marginTop: 8, fontWeight: 500 }}>Right now playing</div>
              <div style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: theme.ink, marginTop: 2 }}>{nowPlaying.title}</div>
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Cover src={nowPlaying.cover} title={nowPlaying.title} width={44} height={58} radius={6} />
                <div style={{ fontSize: 11, color: theme.muted, lineHeight: 1.4, fontFamily: fonts.mono }}>
                  {(nowPlaying.playtime || 0)}h logged
                </div>
              </div>
            </div>
          )}
        </div>

        {isOwner && (
          <div style={{ marginTop: 22, display: 'flex', gap: 10 }}>
            {!editing ? (
              <button onClick={() => setEditing(true)} style={btn.primary}>Edit profile</button>
            ) : (
              <>
                <button onClick={saveAll} style={btn.accent}>Save changes</button>
                <button onClick={() => { setEditing(false); setDraftProfile(profile); setDraftLinks(links) }} style={btn.ghost}>Cancel</button>
              </>
            )}
          </div>
        )}
      </section>

      {/* Link Tree (or editor in edit mode) */}
      {(links.length > 0 || editing) && (
        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 800, letterSpacing: '-0.025em', marginBottom: 14 }}>
            Find me online ✦
          </h2>
          {editing ? (
            <LinkEditor links={draftLinks} onChange={setDraftLinks} />
          ) : (
            <LinkTree links={links} columns={4} compact />
          )}
        </section>
      )}

      {/* Top 10 */}
      <section style={{ marginTop: 36 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <h2 style={{ fontFamily: fonts.display, fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em' }}>Top 10 🏆</h2>
            {isOwner && <p style={{ color: theme.muted, fontSize: 13, marginTop: 4 }}>Drag tiles to reorder.</p>}
          </div>
        </div>
        <TopTen games={topTen} onReorder={onReorderTopTen} editable={isOwner} />
      </section>

      {/* Stats + recent completions */}
      <section style={{ marginTop: 36, display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 20 }}>
        <div style={{ background: theme.surface, borderRadius: 20, padding: 24, boxShadow: theme.shadow }}>
          <h3 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 18 }}>By the numbers</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              ['Completed', stats.completed, theme.statusCompleted],
              ['Now playing', stats.playing, theme.statusPlaying],
              ['Backlog', stats.backlog, theme.statusBacklog],
              ['Dropped', stats.dropped, theme.muted],
            ].map(([k, v, color]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                <div style={{ flex: 1, fontSize: 14, color: theme.ink }}>{k}</div>
                <div style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 700, color: theme.ink }}>{v}</div>
              </div>
            ))}
          </div>
          {stats.hours > 0 && (
            <div style={{ marginTop: 22, padding: 16, borderRadius: 14, background: theme.blush, textAlign: 'center' }}>
              <div style={{ fontFamily: fonts.display, fontSize: 44, fontWeight: 800, color: theme.ink, lineHeight: 1 }}>{stats.hours.toLocaleString()}h</div>
              <div style={{ fontSize: 12, color: theme.muted, marginTop: 4 }}>logged across {stats.completed + stats.playing} games</div>
            </div>
          )}
        </div>

        <div>
          <h3 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 14 }}>Recently completed ✓</h3>
          {completed.length === 0 ? (
            <div style={{ padding: 24, background: theme.surface, borderRadius: 16, color: theme.muted, fontSize: 13 }}>
              Nothing completed yet.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              {completed.map(g => (
                <div key={g.id} style={{ background: theme.surface, borderRadius: 14, overflow: 'hidden', boxShadow: theme.shadow }}>
                  <Cover src={g.cover} title={g.title} width="100%" height={170} radius={0} />
                  <div style={{ padding: 12 }}>
                    <div style={{ fontFamily: fonts.display, fontSize: 14, fontWeight: 700, color: theme.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</div>
                    <div style={{ fontFamily: fonts.mono, fontSize: 10, color: theme.muted, marginTop: 4 }}>{(g.target_date || '').slice(0, 10) || 'completed'}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function LiveBadge() {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 9px 3px 7px', borderRadius: 999,
      background: theme.accent2, color: '#fff', fontSize: 10, fontWeight: 700,
      letterSpacing: '0.06em', textTransform: 'uppercase',
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: '50%', background: '#fff',
        animation: 'hearth-pulse 1.6s ease-in-out infinite',
      }} />
      live
    </span>
  )
}
