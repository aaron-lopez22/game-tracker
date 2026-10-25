// Avatar — gradient circle/square with initials, derived from a name hash.
// Used everywhere a user appears (top nav, profile, friend lists).

const hashStr = (s = '') => {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

export default function Avatar({ name = '', src, size = 36, radius = 10, style = {} }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={{ width: size, height: size, borderRadius: radius, objectFit: 'cover', display: 'block', flexShrink: 0, ...style }}
      />
    )
  }
  const hue = hashStr(name) % 360
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(s => s[0].toUpperCase())
    .join('')
  return (
    <div style={{
      width: size, height: size, borderRadius: radius,
      background: `linear-gradient(135deg, oklch(0.72 0.09 ${hue}), oklch(0.55 0.10 ${(hue + 40) % 360}))`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontWeight: 600, fontSize: size * 0.38,
      flexShrink: 0,
      boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.12)',
      ...style,
    }}>{initials}</div>
  )
}
