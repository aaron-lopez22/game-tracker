// StatsWidget — "By the numbers": status counts + total hours.

import { theme, fonts } from '../../lib/theme'

export default function StatsWidget({ games = [], size }) {
  const stats = {
    completed: games.filter(g => g.status === 'Completed').length,
    playing:   games.filter(g => g.status === 'Playing').length,
    backlog:   games.filter(g => g.status === 'Backlog').length,
    dropped:   games.filter(g => g.status === 'Dropped').length,
    hours: games.reduce((s, g) => s + (g.playtime || 0), 0),
  }

  return (
    <section style={{ background: theme.surface, borderRadius: 20, padding: 24, boxShadow: theme.shadow }}>
      <h3 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 18, color: theme.ink }}>By the numbers</h3>
      <div style={{ display: 'grid', gridTemplateColumns: size === 'full' ? 'repeat(4, minmax(0, 1fr))' : '1fr', gap: 14 }}>
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
    </section>
  )
}
