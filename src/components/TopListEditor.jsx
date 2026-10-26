// TopListEditor — edit mode for a top list (mockup T2).
// 10 slots: drag filled tiles to reorder, × to remove, empty slots focus the
// library search on the right. Nothing is saved until Done.

import { useMemo, useRef, useState } from 'react'
import {
  DndContext, PointerSensor, KeyboardSensor, useSensor, useSensors, closestCenter,
} from '@dnd-kit/core'
import {
  SortableContext, useSortable, arrayMove, sortableKeyboardCoordinates, rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { theme, fonts, btn } from '../lib/theme'
import { MAX_LIST } from '../lib/topLists'
import Cover from './Cover'
import Icon from './Icon'
import RankBadge from './RankBadge'

export default function TopListEditor({ title, games = [], initialIds = [], onCancel, onDone }) {
  const byId = useMemo(() => new Map(games.map(g => [g.id, g])), [games])
  const [ids, setIds] = useState(() => initialIds.filter(id => byId.has(id)).slice(0, MAX_LIST))
  const [query, setQuery] = useState('')
  const searchRef = useRef(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return
    setIds(arrayMove(ids, ids.indexOf(active.id), ids.indexOf(over.id)))
  }

  const add = (id) => { if (ids.length < MAX_LIST && !ids.includes(id)) setIds([...ids, id]) }
  const remove = (id) => setIds(ids.filter(x => x !== id))

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? games.filter(g => (g.title || '').toLowerCase().includes(q)) : games
  }, [games, query])

  const full = ids.length >= MAX_LIST

  return (
    <div style={{ padding: '4px 36px 60px' }}>
      {/* Banner */}
      <div style={{
        padding: '14px 20px', borderRadius: 16, background: theme.ink, color: theme.bg,
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <Icon name="drag" size={18} color={theme.bg} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 17 }}>Editing {title}</div>
          <div style={{ fontSize: 13, opacity: 0.75 }}>Drag to reorder. Click × to remove. Pick games on the right to fill empty slots.</div>
        </div>
        <button onClick={onCancel} style={{ ...btn.ghost, background: 'transparent', color: theme.bg, boxShadow: 'none' }}>Cancel</button>
        <button onClick={() => onDone?.(ids)} style={btn.accent}>
          <Icon name="check" size={14} color="#fff" strokeWidth={2.5} /> Done
        </button>
      </div>

      <div style={{ paddingTop: 24, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: 28 }}>
        {/* Slots */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={ids} strategy={rectSortingStrategy}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 14, alignContent: 'start' }}>
              {ids.map((id, i) => (
                <SortableSlot key={id} game={byId.get(id)} rank={i + 1} onRemove={() => remove(id)} />
              ))}
              {Array.from({ length: MAX_LIST - ids.length }).map((_, i) => (
                <EmptySlot key={`empty-${i}`} rank={ids.length + i + 1} onClick={() => searchRef.current?.focus()} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {/* Library picker */}
        <aside style={{
          background: theme.surface, borderRadius: 20, padding: 18, boxShadow: theme.shadow,
          display: 'flex', flexDirection: 'column', gap: 12, alignSelf: 'start',
        }}>
          <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 18, color: theme.ink }}>Add from your library</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: theme.bg, borderRadius: 12 }}>
            <Icon name="search" size={14} color={theme.muted} />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your games…"
              style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: theme.ink, flex: 1, fontFamily: fonts.body }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 520, overflowY: 'auto' }}>
            {results.length === 0 && (
              <div style={{ color: theme.muted, fontSize: 13, padding: 8 }}>No games match.</div>
            )}
            {results.map(g => {
              const pos = ids.indexOf(g.id)
              return (
                <div key={g.id} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: 8, borderRadius: 12,
                  background: pos >= 0 ? theme.bg : 'transparent',
                }}>
                  <Cover src={g.cover} title={g.title} width={36} height={48} radius={6} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: theme.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</div>
                    <div style={{ fontSize: 11, color: theme.muted }}>{g.status}</div>
                  </div>
                  {pos >= 0 ? (
                    <span style={{ fontSize: 12, fontWeight: 700, color: theme.accent2, padding: '0 8px' }}>#{pos + 1}</span>
                  ) : (
                    <button
                      onClick={() => add(g.id)}
                      disabled={full}
                      title={full ? 'List is full. Remove a game first.' : undefined}
                      style={{
                        ...btn.ghost, padding: '6px 12px', fontSize: 12, boxShadow: 'none',
                        background: theme.blush, opacity: full ? 0.5 : 1,
                        cursor: full ? 'not-allowed' : 'pointer',
                      }}
                    >Add</button>
                  )}
                </div>
              )
            })}
          </div>
        </aside>
      </div>
    </div>
  )
}

function SortableSlot({ game, rank, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: game.id })
  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={{
      transform: [CSS.Transform.toString(transform), isDragging && 'rotate(-3deg)'].filter(Boolean).join(' ') || undefined,
      transition,
      position: 'relative', zIndex: isDragging ? 2 : 'auto',
      background: theme.surface, borderRadius: 16, padding: 8,
      boxShadow: isDragging ? '0 24px 48px rgba(0,0,0,0.22)' : theme.shadow,
      outline: isDragging ? `3px solid ${theme.accent}` : 'none',
      cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none',
    }}>
      <div style={{ position: 'relative', aspectRatio: '3 / 4', borderRadius: 10, overflow: 'hidden' }}>
        <Cover src={game.cover} title={game.title} radius={0} tint={rank <= 3 ? 'warm' : undefined} />
        <RankBadge rank={rank} size={28} />
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          onClick={onRemove}
          aria-label={`Remove ${game.title}`}
          style={{
            position: 'absolute', top: 7, right: 7, width: 26, height: 26, borderRadius: 8,
            background: 'rgba(0,0,0,0.55)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        ><Icon name="x" size={13} color="#fff" strokeWidth={2.5} /></button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
        <Icon name="drag" size={14} color={theme.muted} />
        <div style={{ fontWeight: 600, fontSize: 12, color: theme.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{game.title}</div>
      </div>
    </div>
  )
}

function EmptySlot({ rank, onClick }) {
  return (
    <button onClick={onClick} style={{
      aspectRatio: '3 / 4.6', borderRadius: 16, border: `2px dashed ${theme.faint}`,
      background: 'transparent', cursor: 'pointer', fontFamily: fonts.body,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
      color: theme.muted,
    }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: theme.blush, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="plus" size={18} color={theme.accent} strokeWidth={2.5} />
      </div>
      <div style={{ fontWeight: 600, fontSize: 13 }}>Add #{rank}</div>
    </button>
  )
}
