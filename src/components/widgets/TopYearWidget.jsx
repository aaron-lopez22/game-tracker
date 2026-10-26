// TopYearWidget — "Best of {year}" as one card with a 10-column row of covers.
// The year pill switches between every year that has entries (plus this year).

import { theme, fonts, btn } from '../../lib/theme'
import Cover from '../Cover'
import Icon from '../Icon'
import RankBadge from '../RankBadge'
import SectionHead, { EmptyList } from './SectionHead'

export default function TopYearWidget({ games = [], year, years = [], onYearChange, isOwner, onEdit, size }) {
  return (
    <section>
      <SectionHead
        title={`Best of ${year}`}
        sub="Favorite games I played this year. Past years stay on the profile."
        right={
          <div style={{ display: 'flex', gap: 8 }}>
            <YearPicker year={year} years={years} onChange={onYearChange} />
            {isOwner && games.length > 0 && (
              <button onClick={onEdit} style={btn.ghost}><Icon name="drag" size={14} /> Edit</button>
            )}
          </div>
        }
      />
      {games.length === 0 ? (
        <EmptyList text={`No favorites picked for ${year} yet.`} isOwner={isOwner} onAdd={onEdit} />
      ) : (
        <div style={{
          background: theme.surface, borderRadius: 20, padding: 18, boxShadow: theme.shadow,
          display: 'grid', gridTemplateColumns: `repeat(${size === 'half' ? 5 : 10}, minmax(0, 1fr))`, gap: 10,
        }}>
          {games.map((g, i) => (
            <div key={g.id}>
              <div style={{ position: 'relative', aspectRatio: '3 / 4', borderRadius: 10, overflow: 'hidden' }}>
                <Cover src={g.cover} title={g.title} radius={0} />
                <RankBadge rank={i + 1} size={22} />
              </div>
              <div style={{
                marginTop: 6, fontSize: 11, fontWeight: 600, color: theme.ink, lineHeight: 1.2,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{g.title}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

// Pill-shaped native <select>, so it works with keyboard and on phones.
function YearPicker({ year, years, onChange }) {
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <select
        value={year}
        onChange={(e) => onChange?.(Number(e.target.value))}
        aria-label="Pick a year"
        style={{
          appearance: 'none', WebkitAppearance: 'none',
          padding: '8px 32px 8px 14px', borderRadius: 999, border: 'none',
          background: theme.surface, boxShadow: theme.shadow, color: theme.ink,
          fontSize: 13, fontWeight: 600, fontFamily: fonts.body, cursor: 'pointer', outline: 'none',
        }}
      >
        {years.map(y => <option key={y} value={y}>{y}</option>)}
      </select>
      <span style={{ position: 'absolute', right: 12, pointerEvents: 'none', display: 'flex' }}>
        <Icon name="arrow-down" size={12} color={theme.muted} />
      </span>
    </div>
  )
}
