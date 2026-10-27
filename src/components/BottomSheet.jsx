// BottomSheet — mobile panel that slides up from the bottom over a dim backdrop.
// Tap the backdrop to close. Locks page scroll while open.

import { useEffect } from 'react'
import { theme, fonts } from '../lib/theme'

export default function BottomSheet({ title, onClose, height = '75vh', children }) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(28,24,21,0.45)',
      display: 'flex', alignItems: 'flex-end',
    }}>
      <div onClick={(e) => e.stopPropagation()} role="dialog" aria-label={title} style={{
        width: '100%', height, background: theme.bg, borderRadius: '28px 28px 0 0',
        padding: '10px 20px calc(24px + env(safe-area-inset-bottom))',
        boxShadow: '0 -12px 40px rgba(0,0,0,0.2)',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ width: 40, height: 5, borderRadius: 3, background: theme.faint, margin: '0 auto 16px', flex: 'none' }} />
        {title && (
          <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 22, color: theme.ink, marginBottom: 12, flex: 'none' }}>{title}</div>
        )}
        {children}
      </div>
    </div>
  )
}
