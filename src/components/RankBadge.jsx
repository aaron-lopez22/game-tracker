// RankBadge — the #N chip on top-list covers. #1 orange, #2–3 honey, rest plain.

import { theme, fonts } from '../lib/theme'

export default function RankBadge({ rank, size = 30 }) {
  return (
    <div style={{
      position: 'absolute', top: size * 0.25, left: size * 0.25,
      width: size, height: size, borderRadius: size * 0.32,
      background: rank === 1 ? theme.accent : rank <= 3 ? theme.accent3 : theme.surface,
      color: rank <= 3 ? '#fff' : theme.ink,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: fonts.display, fontWeight: 800, fontSize: size * 0.52, lineHeight: 1,
      boxShadow: '0 3px 10px rgba(0,0,0,0.28)',
    }}>{rank}</div>
  )
}
