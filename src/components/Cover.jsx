// Cover — programmatic cover-art fallback for games without a real cover.
// In production you almost always have a real `cover` URL from RAWG, so this
// is just a safety net to keep the layout from looking broken when an image
// is missing. Pass `tint="warm"` to bias toward orange palettes (e.g. for
// the top-3 favorites on a profile page).

const PALETTES = [
  ['#2b3a4a', '#7d99b6', '#f3e9d8', 'cool'],
  ['#3a2620', '#a44a3f', '#f2d6b8', 'warm'],
  ['#1f2a23', '#4d6b51', '#dee5c4', 'forest'],
  ['#3a2d4a', '#7c5a9d', '#e8d4f0', 'violet'],
  ['#4a2f1d', '#c47a3a', '#f8e3b6', 'amber'],
  ['#1b2735', '#3a5878', '#c9d8e8', 'midnight'],
  ['#2d1f1a', '#6e3a2e', '#e8c2a0', 'rust'],
  ['#3a3622', '#8a7a3f', '#ede4c4', 'olive'],
  ['#28202d', '#5a3d72', '#d8c4e8', 'plum'],
  ['#1a2e2a', '#3a7060', '#c4e0d4', 'jade'],
  ['#3d2018', '#8a3a28', '#f4cbb0', 'brick'],
]

const WARM = new Set(['warm', 'amber', 'rust', 'brick'])

const hashStr = (s = '') => {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

function paletteFor(title, tint) {
  const h = hashStr(title)
  const pool = tint === 'warm' ? PALETTES.filter(p => WARM.has(p[3])) : PALETTES
  const p = pool[h % pool.length]
  return { from: p[0], to: p[1], fg: p[2] }
}

export default function Cover({ src, title, width = '100%', height = '100%', radius = 8, tint, style = {} }) {
  // Prefer a real cover URL when available
  if (src) {
    return (
      <img
        src={src}
        alt={title}
        style={{ width, height, borderRadius: radius, objectFit: 'cover', display: 'block', ...style }}
      />
    )
  }
  const c = paletteFor(title || '', tint)
  return (
    <div style={{
      width, height, borderRadius: radius, overflow: 'hidden', position: 'relative',
      background: `linear-gradient(155deg, ${c.from} 0%, ${c.to} 100%)`,
      display: 'flex', alignItems: 'flex-end', padding: '10%',
      ...style,
    }}>
      <div style={{
        color: c.fg,
        fontFamily: '"Bricolage Grotesque", system-ui, sans-serif',
        fontSize: typeof width === 'number' ? Math.max(11, width / 12) : 14,
        fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05,
        textShadow: '0 1px 12px rgba(0,0,0,0.3)',
        maxWidth: '90%',
      }}>{title}</div>
    </div>
  )
}
