// MobileEditHeader — Cancel · Title · Done bar for full-screen mobile edit modes,
// with a one-line hint underneath.

import { theme, fonts, btn } from '../lib/theme'

export default function MobileEditHeader({ title, hint, onCancel, onDone }) {
  return (
    <>
      <div style={{ padding: '4px 4px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <button onClick={onCancel} style={{
          height: 44, padding: '0 12px', border: 'none', background: 'transparent',
          color: theme.muted, fontSize: 15, fontFamily: fonts.body, cursor: 'pointer',
        }}>Cancel</button>
        <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 17, color: theme.ink, textAlign: 'center', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
        <button onClick={onDone} style={{ ...btn.accent, height: 44 }}>Done</button>
      </div>
      {hint && <div style={{ padding: '0 16px 12px', fontSize: 13, color: theme.muted, textAlign: 'center' }}>{hint}</div>}
    </>
  )
}
