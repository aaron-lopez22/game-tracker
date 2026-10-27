// Profile — the public sharable profile page.
// Fixed banner (avatar, name, bio, Now Playing) on top, then a grid of
// widgets the owner can reorder, resize, and hide with Arrange.

import { useState } from 'react'
import { theme, fonts, btn, LINK_PLATFORMS } from '../lib/theme'
import { currentYear, listGames, listIds, listYears } from '../lib/topLists'
import { normalizeLayout } from '../lib/layout'
import useIsMobile from '../lib/useIsMobile'
import Avatar from './Avatar'
import Cover from './Cover'
import Icon from './Icon'
import LiveBadge from './LiveBadge'
import LinkEditor from './LinkEditor'
import { PlatformIcon } from './LinkTree'
import TopListEditor from './TopListEditor'
import ArrangeMode from './ArrangeMode'
import { WIDGETS } from './widgets'

export default function Profile({
  profile,              // { username, display, bio, avatar_url, joined, layout }
  games = [],           // all games (for top lists + completed)
  topEntries = [],      // rows from top_entries (both lists, all years)
  nowPlaying,           // single game currently playing
  links = [],           // array of { id, platform, url, label, enabled }
  isOwner = false,      // show edit UI?
  onSaveProfile,        // (patch) => void
  onSaveLinks,          // (newLinks) => void
  onSaveTopList,        // (listType, year, gameIds) => void
  onSaveLayout,         // (layout) => void
}) {
  const [editing, setEditing] = useState(false)
  const [draftProfile, setDraftProfile] = useState(profile)
  const [draftLinks, setDraftLinks] = useState(links)
  const [editingList, setEditingList] = useState(null) // null | 'all_time' | 'year'
  const [arranging, setArranging] = useState(false)
  const [year, setYear] = useState(currentYear())
  const isMobile = useIsMobile()

  const layout = normalizeLayout(profile.layout)
  const allTime = listGames(topEntries, games, 'all_time')
  const yearGames = listGames(topEntries, games, 'year', year)
  const years = [...new Set([year, ...listYears(topEntries)])].sort((a, b) => b - a)

  const startEditList = (listType) => {
    setEditingList(listType)
    window.scrollTo(0, 0)
  }

  if (editingList) {
    const isYear = editingList === 'year'
    return (
      <TopListEditor
        title={isYear ? `Best of ${year}` : 'All-Time Top 10'}
        games={games}
        initialIds={listIds(topEntries, editingList, year)}
        onCancel={() => setEditingList(null)}
        onDone={(ids) => {
          onSaveTopList?.(editingList, isYear ? year : null, ids)
          setEditingList(null)
        }}
      />
    )
  }

  if (arranging) {
    return (
      <ArrangeMode
        layout={layout}
        preview={{ profile, games, allTime, yearGames, year, nowPlaying, links }}
        onCancel={() => setArranging(false)}
        onDone={(newLayout) => {
          onSaveLayout?.(newLayout)
          setArranging(false)
        }}
      />
    )
  }

  // Props each widget needs, keyed by layout kind
  const widgetProps = {
    top_all_time:      { games: allTime, ownerName: profile.display, isOwner, onEdit: () => startEditList('all_time') },
    top_year:          { games: yearGames, year, years, onYearChange: setYear, isOwner, onEdit: () => startEditList('year') },
    now_playing:       { nowPlaying },
    links:             { links, isOwner },
    recent_completed:  { games },
    stats:             { games },
    currently_playing: { games },
  }
  const visible = layout.filter(w => !w.hidden)

  const saveAll = () => {
    onSaveProfile?.({ display: draftProfile.display, bio: draftProfile.bio })
    onSaveLinks?.(draftLinks)
    setEditing(false)
  }
  const cancelEdit = () => { setEditing(false); setDraftProfile(profile); setDraftLinks(links) }
  const startArrange = () => { setArranging(true); window.scrollTo(0, 0) }

  const ownerButtons = isOwner && (
    !editing ? (
      <>
        <button onClick={() => setEditing(true)} style={btn.primary}>Edit profile</button>
        <button onClick={startArrange} style={btn.ghost}>
          <Icon name="grid" size={14} /> Arrange
        </button>
      </>
    ) : (
      <>
        <button onClick={saveAll} style={btn.accent}>Save changes</button>
        <button onClick={cancelEdit} style={btn.ghost}>Cancel</button>
      </>
    )
  )

  return (
    <div style={{ padding: isMobile ? '8px 20px 24px' : '16px 36px 60px' }}>
      {/* Banner */}
      {isMobile ? (
        <MobileBanner
          draftProfile={draftProfile}
          setDraftProfile={setDraftProfile}
          editing={editing}
          nowPlaying={nowPlaying}
          links={links}
          buttons={ownerButtons}
        />
      ) : (
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
                  marginTop: 6, background: theme.surface + '99', border: 'none',
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
                  width: '100%', background: theme.surface + '99', border: 'none',
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
          <div style={{ marginTop: 22, display: 'flex', gap: 10 }}>{ownerButtons}</div>
        )}
      </section>
      )}

      {/* Link editor (edit mode only; works even if the Links widget is hidden) */}
      {editing && (
        <section style={{ marginTop: 28 }}>
          <h2 style={{ fontFamily: fonts.display, fontSize: isMobile ? 22 : 28, fontWeight: 800, letterSpacing: '-0.025em', marginBottom: 14 }}>
            Find me online ✦
          </h2>
          <LinkEditor links={draftLinks} onChange={setDraftLinks} />
        </section>
      )}

      {/* Widgets */}
      {visible.length === 0 ? (
        isOwner && (
          <div style={{ marginTop: isMobile ? 28 : 36, padding: 32, borderRadius: 20, border: `2px dashed ${theme.faint}`, color: theme.muted, textAlign: 'center', fontSize: 14 }}>
            Every section is hidden. Use Arrange to add some back.
          </div>
        )
      ) : (
        <div style={{
          marginTop: isMobile ? 28 : 36, display: 'grid',
          gridTemplateColumns: isMobile ? 'minmax(0, 1fr)' : 'repeat(2, minmax(0, 1fr))',
          gap: isMobile ? 28 : '36px 24px', alignItems: 'start',
        }}>
          {visible.map(w => {
            const Widget = WIDGETS[w.kind]
            // Mobile: everything is full width
            const size = isMobile ? 'full' : w.size
            return (
              <div key={w.kind} style={{ gridColumn: size === 'full' && !isMobile ? 'span 2' : 'span 1', minWidth: 0 }}>
                <Widget {...widgetProps[w.kind]} size={size} isMobile={isMobile} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// Mobile banner (mockup M3): stacked, same gradient as desktop, round link icons.
function MobileBanner({ draftProfile, setDraftProfile, editing, nowPlaying, links, buttons }) {
  const shown = links.filter(l => l.enabled !== false && l.url)
  const field = { background: theme.surface + '99', border: 'none', borderRadius: 8, outline: 'none', color: theme.ink, width: '100%' }
  return (
    <section style={{
      background: `linear-gradient(135deg, ${theme.blush} 0%, ${theme.sage} 100%)`,
      borderRadius: 24, padding: 20, boxShadow: theme.shadowRaised,
    }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <Avatar name={draftProfile.display} src={draftProfile.avatar_url} size={72} radius={22} style={{ fontSize: 28 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          {editing ? (
            <input
              value={draftProfile.display || ''}
              onChange={(e) => setDraftProfile({ ...draftProfile, display: e.target.value })}
              style={{ ...field, fontFamily: fonts.display, fontWeight: 700, padding: '6px 8px' }}
            />
          ) : (
            <div style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, color: theme.ink, overflowWrap: 'anywhere' }}>
              {draftProfile.display || draftProfile.username}
            </div>
          )}
          <div style={{ fontFamily: fonts.mono, fontSize: 12, color: theme.ink, opacity: 0.7, marginTop: 2 }}>@{draftProfile.username}</div>
        </div>
      </div>

      {editing ? (
        <textarea
          value={draftProfile.bio || ''}
          onChange={(e) => setDraftProfile({ ...draftProfile, bio: e.target.value })}
          rows={3}
          style={{ ...field, marginTop: 12, padding: 10, fontFamily: fonts.body, resize: 'none' }}
        />
      ) : (
        <p style={{ margin: '12px 0', color: theme.ink, opacity: 0.85, fontSize: 14, lineHeight: 1.45 }}>{draftProfile.bio || 'No bio yet.'}</p>
      )}

      {nowPlaying && !editing && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
          <LiveBadge label="Now playing" />
          <span style={{ fontWeight: 600, fontSize: 13, color: theme.ink }}>{nowPlaying.title}</span>
        </div>
      )}

      {shown.length > 0 && !editing && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          {shown.map(l => {
            const p = LINK_PLATFORMS[l.platform] || LINK_PLATFORMS.custom
            return (
              <a key={l.id || l.url} href={l.url} target="_blank" rel="noreferrer" aria-label={l.label || p.label} style={{
                width: 44, height: 44, borderRadius: '50%', background: p.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.18)',
              }}>
                <PlatformIcon name={l.platform} size={20} color={p.textColor} />
              </a>
            )
          })}
        </div>
      )}

      {buttons && <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: editing ? 12 : 0 }}>{buttons}</div>}
    </section>
  )
}
