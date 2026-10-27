// RecentCompletedWidget — shelf of the most recently completed games.

import { theme, fonts } from '../../lib/theme'
import Cover from '../Cover'
import SectionHead from './SectionHead'

export default function RecentCompletedWidget({ games = [], size, isMobile }) {
  const cols = size === 'full' && !isMobile ? 4 : 2
  const completed = games
    .filter(g => g.status === 'Completed')
    .sort((a, b) => (b.updated_at || '').localeCompare(a.updated_at || ''))
    .slice(0, cols * 2)

  return (
    <section>
      <SectionHead title="Recently completed ✓" size={22} />
      {completed.length === 0 ? (
        <div style={{ padding: 24, background: theme.surface, borderRadius: 16, color: theme.muted, fontSize: 13, boxShadow: theme.shadow }}>
          Nothing completed yet.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 14 }}>
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
    </section>
  )
}
