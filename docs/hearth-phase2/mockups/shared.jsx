/* Shared data, cover-art generator, icons, design tokens.
   Exposes everything on window so direction-a.jsx + direction-b.jsx can use it. */

// ─────────────────────────────────────────────────────────────────────
// COVER ART — programmatic so nothing 404s. Hash title to a palette
// + glyph + composition. Real app would just use <img src={cover}>.
// ─────────────────────────────────────────────────────────────────────
const COVER_PALETTES = [
  // muted, hand-picked. each: [bg-from, bg-to, glyph, mood]
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
  ['#202832', '#4a6a82', '#cbd8e3', 'slate'],
];

const COVER_PATTERNS = [
  'horizon',  // big sun/circle at horizon
  'peak',     // mountain silhouette
  'grid',     // grid of small shapes
  'orb',      // single floating shape
  'arc',      // arc from corner
  'columns',  // vertical bars
  'beam',     // diagonal beam
  'eclipse',  // two stacked circles
];

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

// Mood groups for tinting. Pass `tint="warm"` to force orange/amber covers
// for things like "your top 3 favorites" where temperature signals priority.
const WARM_MOODS = new Set(['warm', 'amber', 'rust', 'brick']);
const COOL_MOODS = new Set(['cool', 'midnight', 'slate', 'jade']);

function coverFor(title, tint) {
  const h = hashStr(title);
  let pool = COVER_PALETTES;
  if (tint === 'warm') pool = COVER_PALETTES.filter(p => WARM_MOODS.has(p[3]));
  else if (tint === 'cool') pool = COVER_PALETTES.filter(p => COOL_MOODS.has(p[3]));
  const pal = pool[h % pool.length];
  const pat = COVER_PATTERNS[(h >> 4) % COVER_PATTERNS.length];
  return { from: pal[0], to: pal[1], fg: pal[2], pattern: pat, mood: pal[3] };
}

function Cover({ title, width = '100%', height = '100%', radius = 4, showTitle = true, titleSize = null, style = {}, tint }) {
  const c = coverFor(title, tint);
  const tSize = titleSize || (typeof width === 'number' ? Math.max(10, width / 14) : 14);
  return (
    <div style={{
      position: 'relative', width, height, borderRadius: radius, overflow: 'hidden',
      background: `linear-gradient(155deg, ${c.from} 0%, ${c.to} 100%)`,
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
      ...style,
    }}>
      <CoverPattern pattern={c.pattern} fg={c.fg} />
      {showTitle && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start',
          padding: '10%',
        }}>
          <div style={{
            color: c.fg,
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: tSize,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            fontStyle: 'italic',
            textShadow: '0 1px 12px rgba(0,0,0,0.3)',
            maxWidth: '88%',
            textWrap: 'balance',
          }}>{title}</div>
        </div>
      )}
    </div>
  );
}

function CoverPattern({ pattern, fg }) {
  const opacity = 0.55;
  if (pattern === 'horizon') {
    return (
      <svg viewBox="0 0 100 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <circle cx="50" cy="75" r="28" fill={fg} opacity={opacity} />
        <rect x="0" y="76" width="100" height="64" fill={fg} opacity="0.08" />
      </svg>
    );
  }
  if (pattern === 'peak') {
    return (
      <svg viewBox="0 0 100 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <polygon points="0,140 30,55 55,85 80,30 100,75 100,140" fill={fg} opacity={opacity} />
        <circle cx="78" cy="28" r="6" fill={fg} opacity="0.85" />
      </svg>
    );
  }
  if (pattern === 'grid') {
    const dots = [];
    for (let r = 0; r < 7; r++) for (let c = 0; c < 5; c++) dots.push(<circle key={r*9+c} cx={10+c*20} cy={10+r*20} r={2.5} fill={fg} opacity={opacity} />);
    return (
      <svg viewBox="0 0 100 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>{dots}</svg>
    );
  }
  if (pattern === 'orb') {
    return (
      <svg viewBox="0 0 100 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <circle cx="68" cy="48" r="22" fill={fg} opacity={opacity} />
        <circle cx="68" cy="48" r="22" fill="none" stroke={fg} strokeWidth="0.5" opacity="0.8" />
      </svg>
    );
  }
  if (pattern === 'arc') {
    return (
      <svg viewBox="0 0 100 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <path d="M 0 140 A 140 140 0 0 1 100 0" fill="none" stroke={fg} strokeWidth="14" opacity={opacity} />
      </svg>
    );
  }
  if (pattern === 'columns') {
    return (
      <svg viewBox="0 0 100 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {[12,30,48,66,84].map((x,i)=> <rect key={i} x={x} y={20+i*4} width="6" height={90-i*6} fill={fg} opacity={opacity} />)}
      </svg>
    );
  }
  if (pattern === 'beam') {
    return (
      <svg viewBox="0 0 100 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <polygon points="-10,90 110,10 110,30 -10,110" fill={fg} opacity={opacity} />
      </svg>
    );
  }
  // eclipse
  return (
    <svg viewBox="0 0 100 140" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <circle cx="40" cy="55" r="24" fill={fg} opacity={opacity} />
      <circle cx="60" cy="65" r="22" fill={fg} opacity="0.25" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────
// AVATAR — gradient avatar from username hash
// ─────────────────────────────────────────────────────────────────────
function Avatar({ name = '', size = 32, radius = '50%', style = {} }) {
  const h = hashStr(name);
  const hue = h % 360;
  const initials = name.split(/\s+/).filter(Boolean).slice(0,2).map(s => s[0].toUpperCase()).join('');
  return (
    <div style={{
      width: size, height: size, borderRadius: radius,
      background: `linear-gradient(135deg, oklch(0.72 0.09 ${hue}), oklch(0.55 0.10 ${(hue+40)%360}))`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontWeight: 600, fontSize: size * 0.38,
      letterSpacing: '0.02em',
      boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.12)',
      flexShrink: 0,
      ...style,
    }}>{initials}</div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// DATA — based on your Supabase schema
// ─────────────────────────────────────────────────────────────────────
const ME = {
  username: 'aaron',
  display: 'Aaron Lopez',
  bio: 'Backlog enjoyer. Eternal RPG hopeful. Hollow Knight is a 10/10.',
  joined: 'March 2025',
  stats: { completed: 47, playing: 3, backlog: 28, dropped: 6, hours: 1340 },
};

// Status values match your schema: Playing | Completed | Backlog | Dropped
// Adding On-Hold per the questionnaire.
const STATUSES = ['Playing', 'Completed', 'Backlog', 'On-Hold', 'Dropped'];

const TOP_10 = [
  { rank: 1, title: 'Hollow Knight',        genre: 'Metroidvania', year: 2017, hours: 64, platform: 'Switch',  developer: 'Team Cherry',     metacritic: 90 },
  { rank: 2, title: 'Disco Elysium',        genre: 'RPG',          year: 2019, hours: 38, platform: 'PC',      developer: 'ZA/UM',           metacritic: 91 },
  { rank: 3, title: 'Outer Wilds',          genre: 'Adventure',    year: 2019, hours: 24, platform: 'PC',      developer: 'Mobius Digital',  metacritic: 85 },
  { rank: 4, title: 'Stardew Valley',       genre: 'Sim',          year: 2016, hours: 220,platform: 'Switch',  developer: 'ConcernedApe',    metacritic: 89 },
  { rank: 5, title: 'Hades',                genre: 'Roguelike',    year: 2020, hours: 71, platform: 'PC',      developer: 'Supergiant',      metacritic: 93 },
  { rank: 6, title: 'The Witcher 3',        genre: 'RPG',          year: 2015, hours: 142,platform: 'PS5',     developer: 'CD Projekt Red',  metacritic: 92 },
  { rank: 7, title: 'Celeste',              genre: 'Platformer',   year: 2018, hours: 18, platform: 'Switch',  developer: 'Maddy Makes Games',metacritic:94 },
  { rank: 8, title: 'Elden Ring',           genre: 'Action RPG',   year: 2022, hours: 98, platform: 'PS5',     developer: 'FromSoftware',    metacritic: 96 },
  { rank: 9, title: 'Inside',               genre: 'Puzzle',       year: 2016, hours: 6,  platform: 'PC',      developer: 'Playdead',        metacritic: 87 },
  { rank: 10,title: 'Pyre',                 genre: 'RPG',          year: 2017, hours: 22, platform: 'PC',      developer: 'Supergiant',      metacritic: 82 },
];

const NOW_PLAYING = [
  { title: "Baldur's Gate 3",         genre: 'RPG',      platform: 'PC',     hours: 47,  lastPlayed: '2h ago',     started: 'Feb 14',  progress: 62 },
  { title: 'Tears of the Kingdom',    genre: 'Adventure',platform: 'Switch', hours: 23,  lastPlayed: 'yesterday',  started: 'Apr 02',  progress: 28 },
  { title: 'Slay the Spire',          genre: 'Roguelike',platform: 'iOS',    hours: 12,  lastPlayed: '5 days ago', started: 'Apr 22',  progress: 40 },
];

const BACKLOG = [
  { title: 'Persona 5 Royal',    genre: 'JRPG',       platform: 'PS5',    added: 'Mar 12' },
  { title: 'Final Fantasy XVI',  genre: 'Action RPG', platform: 'PS5',    added: 'Mar 28' },
  { title: 'Dredge',             genre: 'Adventure',  platform: 'Switch', added: 'Apr 02' },
  { title: 'Pentiment',          genre: 'Narrative',  platform: 'PC',     added: 'Apr 02' },
  { title: 'Citizen Sleeper',    genre: 'Narrative',  platform: 'PC',     added: 'Apr 15' },
  { title: 'Tunic',              genre: 'Adventure',  platform: 'PC',     added: 'Apr 18' },
  { title: 'Cocoon',             genre: 'Puzzle',     platform: 'PC',     added: 'Apr 22' },
  { title: 'Sea of Stars',       genre: 'JRPG',       platform: 'Switch', added: 'May 01' },
];

const COMPLETED_RECENT = [
  { title: 'Cyberpunk 2077',     genre: 'RPG',        platform: 'PC',     finished: 'Apr 28', rating: 4 },
  { title: 'Cocoon',             genre: 'Puzzle',     platform: 'PC',     finished: 'Apr 11', rating: 5 },
  { title: 'Chants of Sennaar',  genre: 'Puzzle',     platform: 'Switch', finished: 'Mar 30', rating: 4 },
  { title: 'Slay the Princess',  genre: 'Narrative',  platform: 'PC',     finished: 'Mar 18', rating: 5 },
];

const FRIENDS = [
  { username: 'marisol',  display: 'Mari',    nowPlaying: 'Persona 5 Royal',      since: '5m',  active: true },
  { username: 'kev_42',   display: 'Kevin',   nowPlaying: "Baldur's Gate 3",      since: '12m', active: true },
  { username: 'neon',     display: 'Nora',    nowPlaying: 'Pentiment',            since: '40m', active: true },
  { username: 'rafa',     display: 'Rafa',    nowPlaying: 'Tunic',                since: '1h',  active: true },
  { username: 'jade',     display: 'Jade',    nowPlaying: null,                   since: '3h',  active: false },
  { username: 'sam.exe',  display: 'Sam',    nowPlaying: null,                   since: '1d',  active: false },
];

const ACTIVITY = [
  { user: 'marisol', verb: 'started',   target: 'Persona 5 Royal',     when: '5m ago',  kind: 'start' },
  { user: 'kev_42',  verb: 'hit',       target: '40 hours in BG3',     when: '12m ago', kind: 'milestone' },
  { user: 'neon',    verb: 'completed', target: 'Disco Elysium',       when: '2h ago',  kind: 'complete', rating: 5 },
  { user: 'rafa',    verb: 'added',     target: 'Pentiment to backlog',when: '4h ago',  kind: 'add' },
  { user: 'jade',    verb: 'rated',     target: 'Outer Wilds ★★★★★',   when: '8h ago',  kind: 'rate' },
  { user: 'marisol', verb: 'dropped',   target: 'Starfield',           when: 'yesterday', kind: 'drop' },
  { user: 'kev_42',  verb: 'put #3 in Top 10:', target: 'Hades',       when: '2d ago',  kind: 'topten' },
];

const LIBRARY = [
  ...TOP_10.map(g => ({ ...g, status: 'Completed' })),
  ...NOW_PLAYING.map(g => ({ ...g, status: 'Playing', year: 2023 })),
  ...BACKLOG.map(g => ({ ...g, status: 'Backlog', year: 2023 })),
  ...COMPLETED_RECENT.map(g => ({ ...g, status: 'Completed', year: 2023 })),
  { title: 'Starfield',          genre: 'RPG',       platform: 'PC',     status: 'Dropped',  year: 2023 },
  { title: 'Cult of the Lamb',   genre: 'Roguelike', platform: 'Switch', status: 'On-Hold',  year: 2022 },
  { title: 'Death Stranding',    genre: 'Adventure', platform: 'PS5',    status: 'On-Hold',  year: 2019 },
];

// ─────────────────────────────────────────────────────────────────────
// ICONS — minimal stroke icons
// ─────────────────────────────────────────────────────────────────────
function Icon({ name, size = 16, color = 'currentColor', strokeWidth = 1.5 }) {
  const p = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  switch (name) {
    case 'home':    return <svg {...p}><path d="M3 12 12 3l9 9"/><path d="M5 10v11h14V10"/></svg>;
    case 'grid':    return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
    case 'list':    return <svg {...p}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>;
    case 'user':    return <svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>;
    case 'users':   return <svg {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
    case 'plus':    return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case 'search':  return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m21 21-5-5"/></svg>;
    case 'play':    return <svg {...p} fill={color} stroke="none"><polygon points="6 4 20 12 6 20 6 4"/></svg>;
    case 'check':   return <svg {...p}><path d="M5 12l5 5L20 7"/></svg>;
    case 'bookmark':return <svg {...p}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>;
    case 'star':    return <svg {...p}><polygon points="12 2 15 9 22 9.5 17 14 18.5 21 12 17 5.5 21 7 14 2 9.5 9 9"/></svg>;
    case 'clock':   return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'arrow-right': return <svg {...p}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case 'arrow-up':return <svg {...p}><path d="M12 19V5M5 12l7-7 7 7"/></svg>;
    case 'arrow-down':return <svg {...p}><path d="M12 5v14M5 12l7 7 7-7"/></svg>;
    case 'drag':    return <svg {...p}><circle cx="9" cy="6" r="1.2" fill={color}/><circle cx="15" cy="6" r="1.2" fill={color}/><circle cx="9" cy="12" r="1.2" fill={color}/><circle cx="15" cy="12" r="1.2" fill={color}/><circle cx="9" cy="18" r="1.2" fill={color}/><circle cx="15" cy="18" r="1.2" fill={color}/></svg>;
    case 'pause':   return <svg {...p}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>;
    case 'x':       return <svg {...p}><path d="M6 6l12 12M18 6l-6 6-6 6"/></svg>;
    case 'settings':return <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>;
    case 'gamepad': return <svg {...p}><line x1="6" y1="11" x2="10" y2="11"/><line x1="8" y1="9" x2="8" y2="13"/><line x1="15" y1="12" x2="15.01" y2="12"/><line x1="18" y1="10" x2="18.01" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258A4 4 0 0 0 17.32 5z"/></svg>;
    case 'sun':     return <svg {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>;
    case 'moon':    return <svg {...p}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
    case 'sparkle': return <svg {...p}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>;
    default: return null;
  }
}

// ─────────────────────────────────────────────────────────────────────
// LINK PLATFORMS — MySpace-style profile link tree
// ─────────────────────────────────────────────────────────────────────
const LINK_PLATFORMS = {
  twitch:    { label: 'Twitch',    color: '#9146FF', textColor: '#fff', host: 'twitch.tv' },
  discord:   { label: 'Discord',   color: '#5865F2', textColor: '#fff', host: 'discord.gg' },
  tiktok:    { label: 'TikTok',    color: '#000000', textColor: '#fff', host: 'tiktok.com' },
  youtube:   { label: 'YouTube',   color: '#FF0033', textColor: '#fff', host: 'youtube.com' },
  twitter:   { label: 'Twitter / X',color:'#15202b', textColor: '#fff', host: 'x.com' },
  instagram: { label: 'Instagram', color: 'linear-gradient(135deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', textColor:'#fff', host: 'instagram.com' },
  steam:     { label: 'Steam',     color: '#1b2838', textColor: '#fff', host: 'steamcommunity.com' },
  bsky:      { label: 'Bluesky',   color: '#0085ff', textColor: '#fff', host: 'bsky.app' },
  custom:    { label: 'Custom',    color: '#2a241d', textColor: '#fff', host: '' },
};

function PlatformIcon({ name, size = 18, color = 'currentColor' }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: color };
  switch (name) {
    case 'twitch':
      return <svg {...p}><path d="M4 2v16h4v4l4-4h4l6-6V2H4zm16 9l-3 3h-4l-3 3v-3H6V4h14v7zM15 7h2v5h-2V7zm-5 0h2v5h-2V7z"/></svg>;
    case 'discord':
      return <svg {...p}><path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/></svg>;
    case 'tiktok':
      return <svg {...p}><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74a2.89 2.89 0 0 1 2.31-4.64a2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/></svg>;
    case 'youtube':
      return <svg {...p}><path d="M23 7.5s-.2-1.6-.8-2.3c-.7-.9-1.5-.9-1.9-1C17.4 4 12 4 12 4s-5.4 0-8.3.2c-.4.1-1.2.1-1.9 1c-.6.7-.8 2.3-.8 2.3S.8 9.3.8 11.2v1.7c0 1.9.2 3.7.2 3.7s.2 1.6.8 2.3c.7.9 1.7.9 2.1 1C5.6 20 12 20 12 20s5.4 0 8.3-.2c.4-.1 1.2-.1 1.9-1c.6-.7.8-2.3.8-2.3s.2-1.9.2-3.7v-1.7c0-1.9-.2-3.6-.2-3.6zM9.7 14.6V8.4l6.4 3.1l-6.4 3.1z"/></svg>;
    case 'twitter':
      return <svg {...p}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
    case 'instagram':
      return <svg {...p}><path d="M12 2.16c3.2 0 3.58 0 4.85.07c3.25.15 4.77 1.69 4.92 4.92c.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92c-1.27.06-1.64.07-4.85.07s-3.58 0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.16 15.58 2.16 15.2 2.16 12s0-3.58.07-4.85C2.38 3.92 3.89 2.38 7.15 2.23C8.42 2.16 8.8 2.16 12 2.16zm0 1.84c-3.15 0-3.52 0-4.79.07c-2.16.1-3.17 1.12-3.27 3.27c-.07 1.27-.07 1.64-.07 4.79s0 3.52.07 4.79c.1 2.15 1.11 3.17 3.27 3.27c1.27.06 1.64.07 4.79.07s3.52 0 4.79-.07c2.16-.1 3.17-1.12 3.27-3.27c.06-1.27.07-1.64.07-4.79s0-3.52-.07-4.79c-.1-2.15-1.11-3.17-3.27-3.27c-1.27-.06-1.64-.07-4.79-.07zm0 3.04a4.96 4.96 0 1 1 0 9.92a4.96 4.96 0 0 1 0-9.92zm0 8.18a3.22 3.22 0 1 0 0-6.44a3.22 3.22 0 0 0 0 6.44zm5.16-9.4a1.16 1.16 0 1 1 0 2.32a1.16 1.16 0 0 1 0-2.32z"/></svg>;
    case 'steam':
      return <svg {...p}><path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.1 6.9 9.4l3.4-3.6a3 3 0 0 1-1.4-.3l-3.7-2.6a2 2 0 1 0 1.5-.7l4.5 1.7l4.4-7.3a3 3 0 1 1 1 3.9l-4.4 7.3l1.7 4.5a2 2 0 1 0-.7 1.5l-2.6-3.7c-.1-.4-.2-.9-.3-1.4l-3.6 3.4C3.9 19.9 2 16.2 2 12C2 6.5 6.5 2 12 2zm5 6.5a1.5 1.5 0 1 0 0 3a1.5 1.5 0 0 0 0-3z"/></svg>;
    case 'bsky':
      return <svg {...p}><path d="M12 11.8C10.7 9.1 7.1 4.2 3.7 2C2 1 1 1.7 1 3.4c0 1 .5 8 .9 9c1 4 4.7 4.5 8 4c-5.5 1-10 4-6 8c2 2 6 .5 8-2c-1 2-1 5.5 3 7c4 1 7-3 6-7c1 4 5.5 4.4 7-2c.4-1 .9-8 .9-9c0-1.7-1-2.4-2.7-1.4C16.9 4.2 13.3 9.1 12 11.8z"/></svg>;
    case 'custom':
    default:
      return <svg {...p}><path d="M10 13.5c.42.56 1 1.04 1.66 1.42c.66.37 1.39.6 2.14.66c.75.05 1.5-.06 2.2-.34c.7-.27 1.34-.7 1.85-1.24l3-3a4.97 4.97 0 0 0 1.36-3.62a4.97 4.97 0 0 0-1.46-3.58a4.97 4.97 0 0 0-3.58-1.46a4.97 4.97 0 0 0-3.62 1.36l-1.72 1.72m-2.6 4.62a4.97 4.97 0 0 0-1.66-1.42a4.97 4.97 0 0 0-2.14-.66a4.97 4.97 0 0 0-2.2.34a4.97 4.97 0 0 0-1.85 1.24l-3 3a4.97 4.97 0 0 0-1.36 3.62a4.97 4.97 0 0 0 1.46 3.58a4.97 4.97 0 0 0 3.58 1.46a4.97 4.97 0 0 0 3.62-1.36l1.72-1.72"/></svg>;
  }
}

// Shared tweaks context — created here so it exists before direction-* read it.
const TweaksCtx = React.createContext(null);

// Expose globally
Object.assign(window, {
  Cover, CoverPattern, coverFor, hashStr, Avatar, Icon,
  ME, STATUSES, TOP_10, NOW_PLAYING, BACKLOG, COMPLETED_RECENT, FRIENDS, ACTIVITY, LIBRARY,
  LINK_PLATFORMS, PlatformIcon,
  TweaksCtx,
});
