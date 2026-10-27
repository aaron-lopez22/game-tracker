// TopAllTimeWidget — "{Name}'s All-Time Top 10" as a 5-column cover grid.

import { theme, fonts, btn } from '../../lib/theme'
import Cover from '../Cover'
import Icon from '../Icon'
import RankBadge from '../RankBadge'
import SectionHead, { EmptyList } from './SectionHead'

export default function TopAllTimeWidget({ games = [], ownerName, isOwner, onEdit, isMobile }) {
  const firstName = (ownerName || '').split(' ')[0]
  return (
    <section>
      <SectionHead
        title={isMobile ? 'All-Time Top 10' : firstName ? `${firstName}'s All-Time Top 10` : 'All-Time Top 10'}
        sub={isMobile ? undefined : 'The games that made me.'}
        size={isMobile ? 22 : 26}
        right={isOwner && games.length > 0 && (
          <button onClick={onEdit} style={btn.ghost}><Icon name="drag" size={14} /> {isMobile ? 'Edit' : 'Edit Top 10'}</button>
        )}
      />
      {games.length === 0 ? (
        <EmptyList text="Pick up to 10 favorites from your library." isOwner={isOwner} onAdd={onEdit} />
      ) : isMobile ? (
        <MobileTopTen games={games} />
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

// Mobile (mockup M3): #1 as a large hero card, #2–10 in a 3×3 grid.
function MobileTopTen({ games }) {
  const [one, ...rest] = games
  return (
    <>
      <div style={{ position: 'relative', height: 220, borderRadius: 18, overflow: 'hidden', boxShadow: theme.shadowRaised }}>
        <Cover src={one.cover} title={one.title} radius={0} tint="warm" />
        <RankBadge rank={1} size={44} />
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, padding: '40px 16px 14px',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', color: '#fff',
        }}>
          <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 22, lineHeight: 1.15 }}>{one.title}</div>
          <div style={{ fontSize: 12, opacity: 0.85 }}>
            {one.genre || '—'}{one.released ? ' · ' + String(one.released).slice(0, 4) : ''}
          </div>
        </div>
      </div>
      {rest.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10, marginTop: 10 }}>
          {rest.map((g, i) => (
            <div key={g.id}>
              <div style={{ position: 'relative', aspectRatio: '3 / 4', borderRadius: 12, overflow: 'hidden' }}>
                <Cover src={g.cover} title={g.title} radius={0} tint={i < 2 ? 'warm' : undefined} />
                <RankBadge rank={i + 2} size={26} />
              </div>
              <div style={{ marginTop: 5, fontSize: 12, fontWeight: 600, color: theme.ink, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
