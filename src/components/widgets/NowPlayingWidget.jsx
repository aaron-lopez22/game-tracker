// NowPlayingWidget — the one game you're playing right now.

import { theme, fonts } from '../../lib/theme'
import Cover from '../Cover'
import LiveBadge from '../LiveBadge'
import SectionHead from './SectionHead'

export default function NowPlayingWidget({ nowPlaying }) {
  return (
    <section>
      <SectionHead title="Now playing" size={22} />
      <div style={{ background: theme.surface, borderRadius: 20, padding: 18, boxShadow: theme.shadow }}>
        {nowPlaying ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Cover src={nowPlaying.cover} title={nowPlaying.title} width={72} height={96} radius={10} />
            <div style={{ minWidth: 0 }}>
              <LiveBadge />
              <div style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 700, color: theme.ink, marginTop: 6, lineHeight: 1.15 }}>{nowPlaying.title}</div>
              <div style={{ fontSize: 12, color: theme.muted, marginTop: 4 }}>
                {[nowPlaying.platform, `${nowPlaying.playtime || 0}h logged`].filter(Boolean).join(' · ')}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ color: theme.muted, fontSize: 13, textAlign: 'center', padding: 12 }}>Not playing anything right now.</div>
        )}
      </div>
    </section>
  )
}
