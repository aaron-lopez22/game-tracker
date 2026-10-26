// LinksWidget — "Find me online" link tree. Links are edited via Edit profile.

import { theme } from '../../lib/theme'
import LinkTree from '../LinkTree'
import SectionHead from './SectionHead'

export default function LinksWidget({ links = [], size, isOwner }) {
  const hasLinks = links.some(l => l.enabled !== false && l.url)
  return (
    <section>
      <SectionHead title="Find me online ✦" size={22} />
      {hasLinks ? (
        <LinkTree links={links} columns={size === 'full' ? 4 : 2} compact />
      ) : (
        <div style={{ padding: 24, background: theme.surface, borderRadius: 16, color: theme.muted, fontSize: 13, textAlign: 'center', boxShadow: theme.shadow }}>
          {isOwner ? 'No links yet. Add some with Edit profile.' : 'No links yet.'}
        </div>
      )}
    </section>
  )
}
