// Home — landing dashboard. Greeting, stat row, currently playing list,
// Top 10 strip, backlog peek.

import { theme, fonts, btn } from '../lib/theme'
import useIsMobile from '../lib/useIsMobile'
import Cover from './Cover'
import RankBadge from './RankBadge'
import SectionHead from './widgets/SectionHead'

export default function Home({ games = [], topTen = [], onPickGame, onNavigate }) {
  const isMobile = useIsMobile()
  const playing = games.filter(g => g.status === 'Playing')
  const top10   = topTen.slice(0, 10)
  const backlog = games.filter(g => g.status === 'Backlog').slice(0, 6)

  const counts = {
    Playing:   games.filter(g => g.status === 'Playing').length,
    Backlog:   games.filter(g => g.status === 'Backlog').length,
    Completed: games.filter(g => g.status === 'Completed').length,
  }
  const hours = games.reduce((s, g) => s + (g.playtime || 0), 0)

  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 5)  return 'Late-night gaming'
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  })()

  if (isMobile) {
    return (
      <MobileHome
        greeting={greeting} counts={counts} hours={hours}
        playing={playing} top10={top10} backlog={backlog.slice(0, 3)}
        onPickGame={onPickGame} onNavigate={onNavigate}
      />
    )
  }

  return (
    <div style={{ padding: '24px 36px 60px' }}>
      {/* Greeting */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
        <h1 style={{ fontFamily: fonts.display, fontSize: 48, fontWeight: 700, letterSpacing: '-0.03em', color: theme.ink, lineHeight: 1 }}>
          {greeting} <span style={{ display: 'inline-block', transform: 'rotate(8deg)' }}>👋</span>
        </h1>
      </div>
      <p style={{ color: theme.muted, fontSize: 15, marginBottom: 28 }}>
        You've got <strong style={{ color: theme.ink }}>{counts.Playing}</strong> in progress and <strong style={{ color: theme.ink }}>{counts.Backlog}</strong> waiting in your backlog.
      </p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 32 }}>
        {[
          { k: 'Playing',   v: counts.Playing,   color: theme.accent,  icon: '▶' },
          { k: 'Backlog',   v: counts.Backlog,   color: theme.accent3, icon: '📚' },
          { k: 'Completed', v: counts.Completed, color: theme.accent2, icon: '✓' },
          { k: 'Total hours', v: hours.toLocaleString(), color: theme.ink, icon: '⏱' },
        ].map(s => (
          <div key={s.k} style={{
            background: theme.surface, borderRadius: 14, padding: 18,
            display: 'flex', alignItems: 'center', gap: 14, boxShadow: theme.shadow,
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: s.color + '22', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: 16, color: s.color,
            }}>{s.icon}</div>
            <div>
              <div style={{ fontFamily: fonts.display, fontSize: 26, fontWeight: 700, color: theme.ink, lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: 11, color: theme.muted, marginTop: 3 }}>{s.k}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>
        {/* Currently playing */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <h2 style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>Currently playing</h2>
            <span style={{ fontSize: 12, color: theme.muted }}>{playing.length} games</span>
          </div>

          {playing.length === 0 ? (
            <div style={{ padding: 24, background: theme.surface, borderRadius: 16, color: theme.muted, fontSize: 13, textAlign: 'center' }}>
              No games in progress. Add one to get started.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {playing.map(g => (
                <button key={g.id} onClick={() => onPickGame?.(g)} style={{
                  background: theme.surface, borderRadius: 16, padding: 16,
                  display: 'grid', gridTemplateColumns: '100px 1fr', gap: 18,
                  alignItems: 'center', boxShadow: theme.shadow, border: 'none',
                  cursor: 'pointer', textAlign: 'left',
                }}>
                  <Cover src={g.cover} title={g.title} width={100} height={130} radius={10} />
                  <div>
                    <h3 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: theme.ink, lineHeight: 1.1 }}>{g.title}</h3>
                    <div style={{ marginTop: 6, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {g.genre && <Chip>{g.genre}</Chip>}
                      {g.platform && <Chip>{g.platform}</Chip>}
                    </div>
                    {g.notes && (
                      <p style={{ fontSize: 13, color: theme.muted, marginTop: 8, lineHeight: 1.5, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{g.notes}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Top 10 strip */}
          {top10.length > 0 && (
            <div style={{ marginTop: 32 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
                <h2 style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>Your Top 10 🏆</h2>
                <button onClick={() => onNavigate?.('profile')} style={{ fontSize: 12, color: theme.accent, cursor: 'pointer', fontWeight: 600, background: 'transparent', border: 'none' }}>View profile →</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
                {top10.map((g, i) => (
                  <button key={g.id} onClick={() => onPickGame?.(g)} style={{ position: 'relative', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}>
                    <Cover src={g.cover} title={g.title} width="100%" height={140} radius={10} tint={i < 3 ? 'warm' : undefined} />
                    <div style={{
                      position: 'absolute', top: 6, left: 6,
                      width: 24, height: 24, borderRadius: 8,
                      background: i < 3 ? theme.accent : theme.ink,
                      color: i < 3 ? '#fff' : theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: fonts.display, fontSize: 13, fontWeight: 800,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                    }}>{i + 1}</div>
                    <div style={{
                      marginTop: 6, fontSize: 11, fontWeight: 500, color: theme.ink,
                      lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap', textAlign: 'left',
                    }}>{g.title}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Backlog peek */}
        <aside>
          <div style={{ background: theme.surface, borderRadius: 16, padding: 18, boxShadow: theme.shadow }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h3 style={{ fontFamily: fonts.display, fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>Up next 📚</h3>
              <span style={{ fontSize: 11, color: theme.muted }}>{counts.Backlog} in backlog</span>
            </div>
            {backlog.length === 0 ? (
              <div style={{ color: theme.muted, fontSize: 13, textAlign: 'center', padding: 16 }}>Backlog is empty.</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {backlog.map(g => (
                  <button key={g.id} onClick={() => onPickGame?.(g)} style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}>
                    <Cover src={g.cover} title={g.title} width="100%" height={100} radius={8} />
                    <div style={{ fontSize: 10, fontWeight: 500, color: theme.ink, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 5, textAlign: 'left' }}>{g.title}</div>
                  </button>
                ))}
              </div>
            )}
            <button onClick={() => onNavigate?.('library')} style={{ ...btn.ghost, width: '100%', justifyContent: 'center', marginTop: 12, background: 'transparent', boxShadow: 'none', color: theme.accent }}>
              View backlog →
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}

// Mobile Home (mockup M1): 2×2 stats, stacked rows, Top 10 scroll strip, 3-col Up next.
function MobileHome({ greeting, counts, hours, playing, top10, backlog, onPickGame, onNavigate }) {
  const linkBtn = { fontSize: 13, fontWeight: 600, color: theme.accent, background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: fonts.body }
  return (
    <div style={{ padding: '8px 20px 24px', display: 'flex', flexDirection: 'column', gap: 26 }}>
      <h1 style={{ fontFamily: fonts.display, fontSize: 30, fontWeight: 700, letterSpacing: '-0.03em', color: theme.ink, lineHeight: 1.1 }}>
        {greeting} 👋
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          ['Playing', counts.Playing, theme.accent],
          ['Backlog', counts.Backlog, theme.accent3],
          ['Completed', counts.Completed, theme.accent2],
          ['Hours', hours.toLocaleString(), theme.ink],
        ].map(([k, v, c]) => (
          <div key={k} style={{ background: theme.surface, borderRadius: 16, padding: 14, boxShadow: theme.shadow }}>
            <div style={{ fontFamily: fonts.display, fontSize: 26, fontWeight: 700, color: c, lineHeight: 1 }}>{v}</div>
            <div style={{ fontSize: 12, color: theme.muted, marginTop: 4 }}>{k}</div>
          </div>
        ))}
      </div>

      <div>
        <SectionHead title="Currently playing" size={21} />
        {playing.length === 0 ? (
          <div style={{ padding: 20, background: theme.surface, borderRadius: 16, color: theme.muted, fontSize: 13, textAlign: 'center' }}>
            No games in progress. Tap + to add one.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {playing.map(g => (
              <button key={g.id} onClick={() => onPickGame?.(g)} style={{
                display: 'flex', gap: 14, alignItems: 'center', background: theme.surface, borderRadius: 16,
                padding: 10, boxShadow: theme.shadow, border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: fonts.body,
              }}>
                <Cover src={g.cover} title={g.title} width={56} height={74} radius={10} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 16, color: theme.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</div>
                  <div style={{ fontSize: 12, color: theme.muted }}>{[g.platform, g.genre].filter(Boolean).join(' · ')}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {top10.length > 0 && (
        <div>
          <SectionHead title="Your Top 10" size={21} right={<button onClick={() => onNavigate?.('profile')} style={linkBtn}>Profile →</button>} />
          <div className="no-scrollbar" style={{ display: 'flex', gap: 10, overflowX: 'auto', margin: '0 -20px', padding: '0 20px' }}>
            {top10.map((g, i) => (
              <button key={g.id} onClick={() => onPickGame?.(g)} style={{ flex: '0 0 104px', background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', fontFamily: fonts.body }}>
                <div style={{ position: 'relative', height: 138, borderRadius: 12, overflow: 'hidden' }}>
                  <Cover src={g.cover} title={g.title} radius={0} tint={i < 3 ? 'warm' : undefined} />
                  <RankBadge rank={i + 1} size={24} />
                </div>
                <div style={{ marginTop: 6, fontSize: 12, fontWeight: 600, color: theme.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <SectionHead title="Up next" size={21} right={<button onClick={() => onNavigate?.('library')} style={linkBtn}>Backlog →</button>} />
        {backlog.length === 0 ? (
          <div style={{ color: theme.muted, fontSize: 13, textAlign: 'center', padding: 16 }}>Backlog is empty.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
            {backlog.map(g => (
              <button key={g.id} onClick={() => onPickGame?.(g)} aria-label={g.title} style={{ height: 140, background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}>
                <Cover src={g.cover} title={g.title} radius={12} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Chip({ children }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '4px 10px', borderRadius: 999,
      fontSize: 11, fontWeight: 500,
      background: theme.blush, color: theme.ink,
    }}>{children}</span>
  )
}
