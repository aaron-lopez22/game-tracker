// ArrangeMode — reorder, resize, and hide profile widgets (mockup T4).
// Edits a draft copy of the layout; nothing is saved until Done.

import { useState } from 'react'
import {
  DndContext, PointerSensor, KeyboardSensor, useSensor, useSensors, closestCenter,
} from '@dnd-kit/core'
import {
  SortableContext, useSortable, arrayMove, sortableKeyboardCoordinates, rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { theme, fonts, btn, LINK_PLATFORMS } from '../lib/theme'
import { WIDGET_INFO } from '../lib/layout'
import Avatar from './Avatar'
import Cover from './Cover'
import Icon from './Icon'
import LiveBadge from './LiveBadge'
import { PlatformIcon } from './LinkTree'

export default function ArrangeMode({ layout, preview, onCancel, onDone }) {
  const [draft, setDraft] = useState(layout)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return
    const from = draft.findIndex(w => w.kind === active.id)
    const to = draft.findIndex(w => w.kind === over.id)
    setDraft(arrayMove(draft, from, to))
  }

  const patch = (kind, changes) => setDraft(draft.map(w => w.kind === kind ? { ...w, ...changes } : w))
  // Restored widgets go to the bottom so you can see where they landed
  const restore = (kind) => {
    const w = draft.find(x => x.kind === kind)
    setDraft([...draft.filter(x => x.kind !== kind), { ...w, hidden: false }])
  }

  const visible = draft.filter(w => !w.hidden)
  const hidden = draft.filter(w => w.hidden)
  const nameOf = (kind) => kind === 'top_year' ? `Best of ${preview.year}` : WIDGET_INFO[kind].name

  return (
    <div style={{ padding: '4px 36px 60px' }}>
      {/* Banner */}
      <div style={{
        padding: '14px 20px', borderRadius: 16, background: theme.ink, color: theme.bg,
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <Icon name="grid" size={18} color={theme.bg} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 17 }}>Arranging your profile</div>
          <div style={{ fontSize: 13, opacity: 0.75 }}>Drag sections to reorder. Set each to half or full width. Hide what you don't want.</div>
        </div>
        <button onClick={onCancel} style={{ ...btn.ghost, background: 'transparent', color: theme.bg, boxShadow: 'none' }}>Cancel</button>
        <button onClick={() => onDone?.(draft)} style={btn.accent}>
          <Icon name="check" size={14} color="#fff" strokeWidth={2.5} /> Done
        </button>
      </div>

      <div style={{ paddingTop: 24, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Fixed header placeholder */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 18, background: theme.surface, opacity: 0.7 }}>
            <Avatar name={preview.profile?.display || 'You'} src={preview.profile?.avatar_url} size={40} radius={12} />
            <div style={{ flex: 1, fontWeight: 600, color: theme.ink }}>Profile header</div>
            <span style={{ fontSize: 12, color: theme.muted }}>Always on top</span>
          </div>

          {visible.length === 0 ? (
            <div style={{ padding: 32, borderRadius: 18, border: `2px dashed ${theme.faint}`, color: theme.muted, textAlign: 'center', fontSize: 13 }}>
              Every section is hidden. Add some back from the right.
            </div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={visible.map(w => w.kind)} strategy={rectSortingStrategy}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 14 }}>
                  {visible.map(w => (
                    <WidgetCard
                      key={w.kind}
                      widget={w}
                      name={nameOf(w.kind)}
                      preview={preview}
                      onSize={(size) => patch(w.kind, { size })}
                      onHide={() => patch(w.kind, { hidden: true })}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>

        {/* Hidden sections */}
        <aside style={{
          background: theme.surface, borderRadius: 20, padding: 18, boxShadow: theme.shadow,
          alignSelf: 'start', display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 18, color: theme.ink }}>Hidden sections</div>
          <div style={{ fontSize: 13, color: theme.muted, marginTop: -4 }}>Add them back any time.</div>
          {hidden.length === 0 && (
            <div style={{ fontSize: 13, color: theme.muted, padding: '8px 0' }}>Nothing hidden.</div>
          )}
          {hidden.map(w => (
            <div key={w.kind} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, borderRadius: 14, background: theme.bg }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: theme.ink }}>{nameOf(w.kind)}</div>
                <div style={{ fontSize: 11, color: theme.muted }}>{WIDGET_INFO[w.kind].desc}</div>
              </div>
              <button onClick={() => restore(w.kind)} aria-label={`Show ${nameOf(w.kind)}`} style={{
                width: 32, height: 32, borderRadius: 10, background: theme.blush, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><Icon name="plus" size={15} color={theme.accent} strokeWidth={2.5} /></button>
            </div>
          ))}
        </aside>
      </div>
    </div>
  )
}

function WidgetCard({ widget, name, preview, onSize, onHide }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: widget.kind })
  // Keep buttons inside the card from starting a drag
  const noDrag = { onPointerDown: (e) => e.stopPropagation(), onKeyDown: (e) => e.stopPropagation() }

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={{
      gridColumn: widget.size === 'full' ? 'span 2' : 'span 1',
      transform: [CSS.Translate.toString(transform), isDragging && 'rotate(-1deg)'].filter(Boolean).join(' ') || undefined,
      transition,
      position: 'relative', zIndex: isDragging ? 2 : 'auto',
      background: theme.surface, borderRadius: 18, padding: 16,
      boxShadow: isDragging ? '0 24px 48px rgba(0,0,0,0.22)' : theme.shadow,
      outline: isDragging ? `3px solid ${theme.accent}` : 'none',
      display: 'flex', flexDirection: 'column', gap: 12,
      cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Icon name="drag" size={18} color={theme.ink} />
        <div style={{ flex: 1, minWidth: 0, fontFamily: fonts.display, fontWeight: 700, fontSize: 16, color: theme.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
        <div style={{ display: 'flex', padding: 3, borderRadius: 9, background: theme.bg }}>
          {['half', 'full'].map(s => {
            const on = widget.size === s
            return (
              <button key={s} {...noDrag} onClick={() => onSize(s)} aria-pressed={on} style={{
                padding: '4px 10px', borderRadius: 7, border: 'none', cursor: 'pointer',
                fontSize: 11, fontWeight: 600, fontFamily: fonts.body,
                background: on ? theme.surface : 'transparent',
                color: on ? theme.ink : theme.muted,
                boxShadow: on ? theme.shadow : 'none',
              }}>{s === 'half' ? 'Half' : 'Full'}</button>
            )
          })}
        </div>
        <button {...noDrag} onClick={onHide} title="Hide" aria-label={`Hide ${name}`} style={{
          width: 30, height: 30, borderRadius: 9, background: theme.bg, border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Icon name="x" size={13} color={theme.muted} /></button>
      </div>
      <WidgetPreview kind={widget.kind} small={widget.size === 'half'} preview={preview} />
    </div>
  )
}

// A tiny sketch of what each widget shows, using real data.
function WidgetPreview({ kind, small, preview }) {
  const { allTime = [], yearGames = [], games = [], nowPlaying, links = [] } = preview
  const h = small ? 44 : 64
  const empty = (text) => <div style={{ fontSize: 12, color: theme.muted }}>{text}</div>

  const strip = (list, warm) => list.length === 0 ? empty('No games yet') : (
    <div style={{ display: 'flex', gap: 5 }}>
      {list.slice(0, small ? 5 : 10).map((g, i) => (
        <div key={g.id} style={{ flex: '0 0 auto', width: h * 0.75, height: h }}>
          <Cover src={g.cover} title={g.title} radius={5} tint={warm && i < 3 ? 'warm' : undefined} />
        </div>
      ))}
    </div>
  )

  switch (kind) {
    case 'top_all_time': return strip(allTime, true)
    case 'top_year': return strip(yearGames)
    case 'recent_completed': return strip(games.filter(g => g.status === 'Completed'))
    case 'currently_playing': return strip(games.filter(g => g.status === 'Playing'))
    case 'now_playing': return nowPlaying ? (
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <Cover src={nowPlaying.cover} title={nowPlaying.title} width={h * 0.75} height={h} radius={6} />
        <div style={{ minWidth: 0 }}>
          <LiveBadge />
          <div style={{ fontWeight: 600, fontSize: 13, marginTop: 4, color: theme.ink }}>{nowPlaying.title}</div>
        </div>
      </div>
    ) : empty('Not playing anything')
    case 'links': {
      const shown = links.filter(l => l.enabled !== false && l.url)
      return shown.length === 0 ? empty('No links yet') : (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {shown.slice(0, 8).map(l => {
            const p = LINK_PLATFORMS[l.platform] || LINK_PLATFORMS.custom
            return (
              <div key={l.id || l.url} style={{ width: 30, height: 30, borderRadius: 8, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PlatformIcon name={l.platform} size={15} color={p.textColor} />
              </div>
            )
          })}
        </div>
      )
    }
    case 'stats': {
      const count = (s) => games.filter(g => g.status === s).length
      const hours = games.reduce((s, g) => s + (g.playtime || 0), 0)
      return <div style={{ fontSize: 13, color: theme.muted }}>{count('Completed')} completed · {count('Backlog')} in backlog · {hours.toLocaleString()}h</div>
    }
    default: return null
  }
}
