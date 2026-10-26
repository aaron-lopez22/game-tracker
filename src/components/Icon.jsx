// Icon — small stroke icons shared across the app.

export default function Icon({ name, size = 16, color = 'currentColor', strokeWidth = 1.75 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'home':    return <svg {...p}><path d="M3 12 12 3l9 9"/><path d="M5 10v11h14V10"/></svg>
    case 'grid':    return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
    case 'user':    return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>
    case 'plus':    return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>
    case 'search':  return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m21 21-5-5"/></svg>
    case 'moon':    return <svg {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>
    case 'sun':     return <svg {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
    case 'check':   return <svg {...p}><path d="M5 12l5 5L20 7"/></svg>
    case 'x':       return <svg {...p}><path d="M6 6l12 12M18 6 6 18"/></svg>
    case 'arrow-down': return <svg {...p}><path d="M12 5v14M5 12l7 7 7-7"/></svg>
    case 'drag':    return <svg {...p}>{[6, 12, 18].map(y => [9, 15].map(x => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.2" fill={color} />))}</svg>
    default: return null
  }
}
