// TopAllTimeWidget — "{Name}'s All-Time Top 10" as a 5-column cover grid.

import { theme, fonts, btn } from '../../lib/theme'
import Cover from '../Cover'
import Icon from '../Icon'
import RankBadge from '../RankBadge'
import SectionHead, { EmptyList } from './SectionHead'

export default function TopAllTimeWidget({ games = [], ownerName, isOwner, onEdit }) {
  const firstName = (ownerName || '').split(' ')[0]
  return (
    <section>
      <SectionHead
        title={firstName ? `${firstName}'s All-Time Top 10` : 'All-Time Top 10'}
        sub="The games that made me."
        right={isOwner && games.length > 0 && (
          <button onClick={onEdit} style={btn.ghost}><Icon name="drag" size={14} /> Edit Top 10</button>
        )}
      />
      {games.length === 0 ? (
        <EmptyList text="Pick up to 10 favorites from your library." isOwner={isOwner} onAdd={onEdit} />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 16 }}>
          {games.map((g, i) => (
            <div key={g.id}>
              <div style={{ position: 'relative', aspectRatio: '3 / 4', borderRadius: 16, overflow: 'hidden', boxShadow: theme.shadowRaised }}>
                <Cover src={g.cover} title={g.title} radius={0} tint={i < 3 ? 'warm' : undefined} />
                <RankBadge rank={i + 1} size={i === 0 ? 40 : 32} />
              </div>
              <div style={{
                marginTop: 8, fontFamily: fonts.display, fontWeight: 700, fontSize: 15,
                color: theme.ink, lineHeight: 1.15,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{g.title}</div>
              <div style={{ fontSize: 12, color: theme.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {g.genre || '—'}{g.released ? ' · ' + String(g.released).slice(0, 4) : ''}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
