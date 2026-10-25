// TopTen — drag-to-reorder ranked grid of the user's favorite games.
// Reads rank from `games` (where game.rank is 1-10) and notifies the parent
// when the order changes via onReorder(newOrderedIds).
// Uses @dnd-kit (install: npm i @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities)

import {
  DndContext, PointerSensor, KeyboardSensor, useSensor, useSensors, closestCenter,
} from '@dnd-kit/core'
import {
  SortableContext, useSortable, arrayMove, sortableKeyboardCoordinates, rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { theme, fonts } from '../lib/theme'
import Cover from './Cover'

export default function TopTen({ games = [], onReorder, editable = true }) {
  // Ensure games are sorted by rank, defaulting missing ranks to the end
  const ordered = [...games].sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99)).slice(0, 10)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const handleDragEnd = (e) => {
    const { active, over } = e
    if (!over || active.id === over.id) return
    const oldIdx = ordered.findIndex(g => g.id === active.id)
    const newIdx = ordered.findIndex(g => g.id === over.id)
    const reordered = arrayMove(ordered, oldIdx, newIdx)
    onReorder?.(reordered.map((g, i) => ({ id: g.id, rank: i + 1 })))
  }

  if (ordered.length === 0) {
    return (
      <div style={{
        padding: 40, background: theme.surface, borderRadius: 20,
        boxShadow: theme.shadow, textAlign: 'center',
      }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🏆</div>
        <h3 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 800, color: theme.ink }}>No top games yet</h3>
        <p style={{ color: theme.muted, fontSize: 14, marginTop: 6 }}>
          Mark up to 10 completed games as favorites to build your Top 10.
        </p>
      </div>
    )
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={ordered.map(g => g.id)} strategy={rectSortingStrategy}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
          gridAutoRows: '300px', gap: 14,
        }}>
          {ordered.map((g, i) => (
            <SortableTile key={g.id} game={g} rank={i + 1} editable={editable} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

function SortableTile({ game, rank, editable }) {
  const isTop = rank === 1
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: game.id, disabled: !editable })

  const style = {
    gridColumn: isTop ? 'span 2' : 'span 1',
    gridRow:    isTop ? 'span 2' : 'span 1',
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    background: theme.surface, borderRadius: 16, overflow: 'hidden',
    boxShadow: isDragging ? theme.shadowRaised : theme.shadow,
    position: 'relative', display: 'flex', flexDirection: 'column',
    cursor: editable ? 'grab' : 'default',
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...(editable ? listeners : {})}>
      <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
        <Cover src={game.cover} title={game.title} width="100%" height="100%" radius={0} tint={rank <= 3 ? 'warm' : undefined} />
        <div style={{
          position: 'absolute', top: 10, left: 10,
          width: isTop ? 56 : 32, height: isTop ? 56 : 32,
          borderRadius: isTop ? 16 : 10,
          background: rank === 1 ? theme.accent : rank <= 3 ? theme.accent3 : '#fff',
          color: rank <= 3 ? '#fff' : theme.ink,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: fonts.display, fontSize: isTop ? 28 : 16, fontWeight: 800,
          boxShadow: '0 3px 10px rgba(0,0,0,0.3)', lineHeight: 1,
        }}>{rank}</div>
        {isTop && (
          <div style={{
            position: 'absolute', top: 14, right: 14, padding: '4px 10px',
            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
            borderRadius: 999, color: '#fff', fontSize: 10, fontWeight: 600,
            letterSpacing: '0.06em', textTransform: 'uppercase',
          }}>Most loved</div>
        )}
      </div>
      <div style={{ padding: isTop ? '14px 16px' : '10px 12px', borderTop: `1px solid ${theme.rule}` }}>
        <div style={{
          fontFamily: fonts.display, fontSize: isTop ? 18 : 13, fontWeight: 700,
          color: theme.ink, letterSpacing: '-0.01em', lineHeight: 1.1,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{game.title}</div>
        <div style={{
          fontSize: isTop ? 12 : 10, color: theme.muted, marginTop: 3,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{game.genre || '—'}{game.released ? ' · ' + String(game.released).slice(0, 4) : ''}</div>
      </div>
    </div>
  )
}
