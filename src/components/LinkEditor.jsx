// LinkEditor — manage profile links. Pass `links` + onChange(newLinks).
// Add a row, pick a platform, paste a URL, toggle visibility, delete.

import { useState } from 'react'
import { theme, fonts, btn, LINK_PLATFORMS } from '../lib/theme'
import { LinkPill } from './LinkTree'

const PLATFORM_KEYS = Object.keys(LINK_PLATFORMS)

export default function LinkEditor({ links = [], onChange }) {
  const [draft, setDraft] = useState(links)

  const update = (next) => {
    setDraft(next)
    onChange?.(next)
  }

  const add = () => {
    update([
      ...draft,
      { id: crypto.randomUUID(), platform: 'twitch', url: '', label: '', enabled: true },
    ])
  }

  const patch = (id, p) => update(draft.map(l => l.id === id ? { ...l, ...p } : l))
  const remove = (id) => update(draft.filter(l => l.id !== id))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {draft.length === 0 && (
        <div style={{ padding: 16, background: theme.card, borderRadius: 12, color: theme.muted, fontSize: 13, textAlign: 'center' }}>
          No links yet. Add your first social or custom link.
        </div>
      )}

      {draft.map((l) => {
        const p = LINK_PLATFORMS[l.platform] || LINK_PLATFORMS.custom
        return (
          <div key={l.id} style={{
            display: 'grid', gridTemplateColumns: '140px 1fr 1fr auto auto', gap: 8,
            padding: 10, background: theme.surface, borderRadius: 12, boxShadow: theme.shadow,
            alignItems: 'center',
          }}>
            <select value={l.platform} onChange={(e) => patch(l.id, { platform: e.target.value })} style={selectStyle}>
              {PLATFORM_KEYS.map(k => (
                <option key={k} value={k}>{LINK_PLATFORMS[k].label}</option>
              ))}
            </select>
            <input
              type="url" value={l.url} placeholder={`https://${p.label.toLowerCase().replace(/[^a-z]/g, '')}.com/you`}
              onChange={(e) => patch(l.id, { url: e.target.value })}
              style={inputStyle}
            />
            <input
              type="text" value={l.label || ''} placeholder={`Label (defaults to "${p.label}")`}
              onChange={(e) => patch(l.id, { label: e.target.value })}
              style={inputStyle}
            />
            <button onClick={() => patch(l.id, { enabled: !l.enabled })}
              title={l.enabled ? 'Hide on profile' : 'Show on profile'}
              style={{
                ...btn.ghost, padding: '8px 12px', fontSize: 12,
                background: l.enabled ? theme.sage : theme.surface,
              }}>
              {l.enabled ? '👁  Visible' : '🚫  Hidden'}
            </button>
            <button onClick={() => remove(l.id)} style={{
              ...btn.ghost, padding: '8px 10px', color: '#c0392b',
            }} aria-label="Delete">✕</button>
          </div>
        )
      })}

      <button onClick={add} style={{ ...btn.accent, alignSelf: 'flex-start', marginTop: 4 }}>
        + Add a link
      </button>

      {/* Preview */}
      {draft.some(l => l.enabled && l.url) && (
        <div style={{ marginTop: 12 }}>
          <div style={{
            fontSize: 11, color: theme.muted, fontWeight: 600,
            letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8,
          }}>Preview</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {draft.filter(l => l.enabled && l.url).map(l => (
              <LinkPill key={l.id} link={l} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const inputStyle = {
  width: '100%', padding: '8px 12px', background: theme.bg,
  border: 'none', borderRadius: 8, fontSize: 13, color: theme.ink,
  fontFamily: fonts.body, outline: 'none',
}
const selectStyle = { ...inputStyle, cursor: 'pointer' }
