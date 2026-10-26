// Shared styles for the Add / Edit game modals.

import { theme, fonts } from './theme'

export const modalStyle = {
  background: theme.bg, borderRadius: 24, padding: 32,
  boxShadow: '0 20px 80px rgba(0,0,0,0.3)',
}

export const closeBtnStyle = {
  width: 32, height: 32, borderRadius: 10, background: theme.surface, border: 'none',
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: theme.muted, fontSize: 16, boxShadow: theme.shadow,
}

export const inputStyle = {
  width: '100%', padding: '10px 14px', background: theme.surface,
  border: 'none', borderRadius: 10, fontSize: 13, color: theme.ink,
  fontFamily: fonts.body, outline: 'none', boxShadow: theme.shadow,
}
