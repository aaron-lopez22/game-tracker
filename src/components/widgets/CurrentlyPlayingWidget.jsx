// CurrentlyPlayingWidget — every game marked Playing.

import { theme, fonts } from '../../lib/theme'
import Cover from '../Cover'
import SectionHead from './SectionHead'

export default function CurrentlyPlayingWidget({ games = [], size }) {
  const playing = games.filter(g => g.status === 'Playing')
  return (
    <section>
      <SectionHead title="Currently playing" sub={`${playing.length} ${playing.length === 1 ? 'game' : 'games'}`} size={22} />
      {playing.length === 0 ? (
        <div style={{ padding: 24, background: theme.surface, borderRadius: 16, color: theme.muted, fontSize: 13, boxShadow: theme.shadow }}>
          Nothing in progress right now.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: size === 'full' ? 'repeat(auto-fill, minmax(260px, 1fr))' : '1fr', gap: 10 }}>
          {playing.map(g => (
            <div key={g.id} style={{ display: 'flex', gap: 14, alignItems: 'center', background: theme.surface, borderRadius: 16, padding: 10, boxShadow: theme.shadow }}>
              <Cover src={g.cover} title={g.title} width={56} height={74} radius={10} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 16, color: theme.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</div>
                <div style={{ fontSize: 12, color: theme.muted }}>{[g.platform, g.genre].filter(Boolean).join(' · ')}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
