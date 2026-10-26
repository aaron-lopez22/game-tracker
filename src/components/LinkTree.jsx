// LinkTree — MySpace-style external links section.
// Renders an array of { id, platform, url, label, enabled } as colorful pills.

import { theme, fonts, LINK_PLATFORMS } from '../lib/theme'

export function PlatformIcon({ name, size = 20, color = 'currentColor' }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: color }
  switch (name) {
    case 'twitch':    return <svg {...p}><path d="M4 2v16h4v4l4-4h4l6-6V2H4zm16 9l-3 3h-4l-3 3v-3H6V4h14v7zM15 7h2v5h-2V7zm-5 0h2v5h-2V7z"/></svg>
    case 'discord':   return <svg {...p}><path d="M19.27 5.33A18.7 18.7 0 0 0 15 4l-.2.3a17 17 0 0 0-4.6 0L10 4a18.7 18.7 0 0 0-4.27 1.33C2.74 9.79 2 14.16 2.37 18.46c1.8 1.34 3.54 2.15 5.25 2.69c.4-.56.77-1.16 1.08-1.78c-.59-.22-1.16-.5-1.7-.83c.14-.1.28-.21.42-.32c3.27 1.55 6.82 1.55 10.07 0c.14.11.28.22.42.32c-.54.33-1.11.61-1.7.83c.31.62.68 1.22 1.08 1.78c1.71-.54 3.45-1.35 5.25-2.69c.43-4.97-.7-9.3-3.27-13.13zM8.52 14.91c-1.04 0-1.9-.95-1.9-2.12c0-1.17.85-2.13 1.9-2.13c1.05 0 1.91.96 1.9 2.13c0 1.17-.86 2.12-1.9 2.12zm6.96 0c-1.04 0-1.9-.95-1.9-2.12c0-1.17.85-2.13 1.9-2.13c1.05 0 1.91.96 1.9 2.13c0 1.17-.85 2.12-1.9 2.12z"/></svg>
    case 'tiktok':    return <svg {...p}><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74a2.89 2.89 0 0 1 2.31-4.64a2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/></svg>
    case 'youtube':   return <svg {...p}><path d="M23 7.5s-.2-1.6-.8-2.3c-.7-.9-1.5-.9-1.9-1C17.4 4 12 4 12 4s-5.4 0-8.3.2c-.4.1-1.2.1-1.9 1c-.6.7-.8 2.3-.8 2.3S.8 9.3.8 11.2v1.7c0 1.9.2 3.7.2 3.7s.2 1.6.8 2.3c.7.9 1.7.9 2.1 1C5.6 20 12 20 12 20s5.4 0 8.3-.2c.4-.1 1.2-.1 1.9-1c.6-.7.8-2.3.8-2.3s.2-1.9.2-3.7v-1.7c0-1.9-.2-3.6-.2-3.6zM9.7 14.6V8.4l6.4 3.1l-6.4 3.1z"/></svg>
    case 'twitter':   return <svg {...p}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    case 'instagram': return <svg {...p}><path d="M12 2.16c3.2 0 3.58 0 4.85.07c3.25.15 4.77 1.69 4.92 4.92c.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92c-1.27.06-1.64.07-4.85.07s-3.58 0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.16 15.58 2.16 15.2 2.16 12s0-3.58.07-4.85C2.38 3.92 3.89 2.38 7.15 2.23C8.42 2.16 8.8 2.16 12 2.16zm0 1.84c-3.15 0-3.52 0-4.79.07c-2.16.1-3.17 1.12-3.27 3.27c-.07 1.27-.07 1.64-.07 4.79s0 3.52.07 4.79c.1 2.15 1.11 3.17 3.27 3.27c1.27.06 1.64.07 4.79.07s3.52 0 4.79-.07c2.16-.1 3.17-1.12 3.27-3.27c.06-1.27.07-1.64.07-4.79s0-3.52-.07-4.79c-.1-2.15-1.11-3.17-3.27-3.27c-1.27-.06-1.64-.07-4.79-.07zm0 3.04a4.96 4.96 0 1 1 0 9.92a4.96 4.96 0 0 1 0-9.92zm0 8.18a3.22 3.22 0 1 0 0-6.44a3.22 3.22 0 0 0 0 6.44zm5.16-9.4a1.16 1.16 0 1 1 0 2.32a1.16 1.16 0 0 1 0-2.32z"/></svg>
    case 'steam':     return <svg {...p}><path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.1 6.9 9.4l3.4-3.6a3 3 0 0 1-1.4-.3l-3.7-2.6a2 2 0 1 0 1.5-.7l4.5 1.7l4.4-7.3a3 3 0 1 1 1 3.9l-4.4 7.3l1.7 4.5a2 2 0 1 0-.7 1.5l-2.6-3.7c-.1-.4-.2-.9-.3-1.4l-3.6 3.4C3.9 19.9 2 16.2 2 12C2 6.5 6.5 2 12 2zm5 6.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3z"/></svg>
    case 'bsky':      return <svg {...p}><path d="M12 11.8C10.7 9.1 7.1 4.2 3.7 2C2 1 1 1.7 1 3.4c0 1 .5 8 .9 9c1 4 4.7 4.5 8 4c-5.5 1-10 4-6 8c2 2 6 .5 8-2c-1 2-1 5.5 3 7c4 1 7-3 6-7c1 4 5.5 4.4 7-2c.4-1 .9-8 .9-9c0-1.7-1-2.4-2.7-1.4C16.9 4.2 13.3 9.1 12 11.8z"/></svg>
    default:          return <svg {...p}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
  }
}

export default function LinkTree({ links = [], compact = false, columns = 4 }) {
  const visible = links.filter(l => l.enabled !== false && l.url)
  if (visible.length === 0) return null

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: 10,
    }}>
      {visible.map(l => <LinkPill key={l.id || l.url} link={l} compact={compact} />)}
    </div>
  )
}

export function LinkPill({ link, compact = false }) {
  const p = LINK_PLATFORMS[link.platform] || LINK_PLATFORMS.custom
  const displayUrl = (link.url || '').replace(/^https?:\/\//, '').replace(/\/$/, '')
  return (
    <a href={link.url} target="_blank" rel="noreferrer" style={{
      display: 'flex', alignItems: 'center', gap: compact ? 10 : 14,
      padding: compact ? 10 : 14, background: theme.surface, borderRadius: 14,
      textDecoration: 'none', color: theme.ink, boxShadow: theme.shadow,
      transition: 'transform 0.18s ease, box-shadow 0.18s ease',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = theme.shadowRaised }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)';   e.currentTarget.style.boxShadow = theme.shadow }}
    >
      <div style={{
        width: compact ? 36 : 44, height: compact ? 36 : 44,
        borderRadius: Math.max(8, compact ? 10 : 12),
        background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: p.textColor, flexShrink: 0,
        boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.18)',
      }}>
        <PlatformIcon name={link.platform} size={compact ? 18 : 22} color={p.textColor} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: fonts.display, fontWeight: 700,
          fontSize: compact ? 13 : 15, color: theme.ink,
          letterSpacing: '-0.01em', lineHeight: 1.1,
        }}>{link.label || p.label}</div>
        <div style={{
          fontFamily: fonts.mono, fontSize: compact ? 10 : 11,
          color: theme.muted, marginTop: 2,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{displayUrl}</div>
      </div>
    </a>
  )
}
