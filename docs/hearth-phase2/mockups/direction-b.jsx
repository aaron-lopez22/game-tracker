/* Direction B — "Hearth"
   Warm playful. Peach/blush/sage palette, chunky rounded cards.
   Bricolage Grotesque display + DM Sans body.
   Tactile, shoulder-to-shoulder, cozy clubhouse energy. */

// THEME ──────────────────────────────────────────────────────────────
const HEARTH_LIGHT = {
  bg: '#f6efe4', // soft peach-cream
  surface: '#ffffff',
  card: '#fbf4e8',
  raised: '#ffffff',
  ink: '#23201c',
  muted: '#7a7065',
  faint: '#b8a99a',
  rule: 'rgba(35,32,28,0.08)',
  accent: '#e87a4a', // warm orange
  accent2: '#7c9a72', // sage
  accent3: '#d2a86a', // honey
  blush: '#f1ddd0',
  sage: '#d8e2cf',
  shadow: '0 2px 0 rgba(35,32,28,0.05), 0 8px 24px rgba(35,32,28,0.04)',
  shadowRaised: '0 4px 0 rgba(35,32,28,0.06), 0 14px 36px rgba(35,32,28,0.08)'
};
const HEARTH_DARK = {
  bg: '#1c1815',
  surface: '#262220',
  card: '#2c2725',
  raised: '#332d2a',
  ink: '#f5ecdf',
  muted: '#a89c89',
  faint: '#5e564d',
  rule: 'rgba(245,236,223,0.10)',
  accent: '#f08a5a',
  accent2: '#9ab48d',
  accent3: '#e0ba7c',
  blush: '#3a2a22',
  sage: '#2a3328',
  shadow: '0 2px 0 rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.3)',
  shadowRaised: '0 4px 0 rgba(0,0,0,0.35), 0 14px 36px rgba(0,0,0,0.4)'
};

const B_FONT_DISPLAY = '"Bricolage Grotesque", "Inter Tight", system-ui, sans-serif';
const B_FONT_BODY = '"DM Sans", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';
const B_FONT_MONO = '"DM Mono", "JetBrains Mono", monospace';

// PRIMITIVES ─────────────────────────────────────────────────────────
function BFrame({ dark, children, width = 1280, height = 800 }) {
  const t = dark ? HEARTH_DARK : HEARTH_LIGHT;
  return (
    <div style={{
      width, height, background: t.bg, color: t.ink,
      fontFamily: B_FONT_BODY, fontSize: 14, lineHeight: 1.5,
      overflow: 'hidden', position: 'relative'
    }}>
      {children}
    </div>);

}

function BLogo({ t, size = 22 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: size + 6, height: size + 6, borderRadius: 8,
        background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.12)'
      }}>
        <div style={{ width: 8, height: 8, background: '#fff', borderRadius: '50%' }} />
      </div>
      <span style={{ fontFamily: B_FONT_DISPLAY, fontSize: size, fontWeight: 700, letterSpacing: '-0.025em', color: t.ink }}>hearth</span>
    </div>);

}

function BNav({ t, active = 'Home' }) {
  const items = [
  { key: 'Home', icon: 'home' },
  { key: 'Library', icon: 'grid' },
  { key: 'Friends', icon: 'users' },
  { key: 'Profile', icon: 'user' }];

  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 36px', background: t.bg, position: 'relative', zIndex: 2
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <BLogo t={t} />
        <nav style={{ display: 'flex', gap: 4, background: t.surface, padding: 4, borderRadius: 12, boxShadow: t.shadow }}>
          {items.map((item) =>
          <button key={item.key} style={{
            padding: '7px 14px', borderRadius: 8,
            background: active === item.key ? t.ink : 'transparent',
            color: active === item.key ? t.bg : t.muted,
            border: 'none', cursor: 'pointer', fontWeight: 500,
            fontSize: 13, fontFamily: B_FONT_BODY,
            display: 'flex', alignItems: 'center', gap: 6
          }}>
              <Icon name={item.icon} size={13} color={active === item.key ? t.bg : t.muted} />
              {item.key}
            </button>
          )}
        </nav>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px',
          background: t.surface, borderRadius: 999, width: 220, boxShadow: t.shadow
        }}>
          <Icon name="search" size={14} color={t.muted} />
          <input placeholder="Find a game…" style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 13, color: t.ink, flex: 1, fontFamily: B_FONT_BODY }} />
        </div>
        <button style={bBtnPrimary(t)}>
          <Icon name="plus" size={14} color="#fff" strokeWidth={2.5} />
          Add game
        </button>
        <Avatar name={ME.display} size={36} radius={10} />
      </div>
    </header>);

}

function bBtnPrimary(t) {
  return {
    background: t.ink, color: t.bg, border: 'none',
    padding: '9px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600,
    fontFamily: B_FONT_BODY, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 6,
    boxShadow: '0 2px 0 rgba(35,32,28,0.20)'
  };
}
function bBtnAccent(t) {
  return {
    background: t.accent, color: '#fff', border: 'none',
    padding: '9px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600,
    fontFamily: B_FONT_BODY, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 6,
    boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.15), 0 2px 0 rgba(35,32,28,0.18)'
  };
}
function bBtnGhost(t) {
  return {
    background: t.surface, color: t.ink, border: 'none',
    padding: '9px 14px', borderRadius: 10, fontSize: 13, fontWeight: 500,
    fontFamily: B_FONT_BODY, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 6,
    boxShadow: t.shadow
  };
}

function BChip({ children, t, color }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '4px 10px', borderRadius: 999,
      fontSize: 11, fontWeight: 500,
      background: color || t.blush, color: t.ink
    }}>{children}</span>);

}

function BLive({ t, label = 'live' }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 9px 3px 7px', borderRadius: 999,
      background: t.accent2 + (label === 'live' ? '' : ''),
      color: '#fff', fontSize: 10, fontWeight: 700,
      letterSpacing: '0.06em', textTransform: 'uppercase'
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', animation: 'b-pulse 1.6s ease-in-out infinite' }} />
      {label}
    </span>);

}

// LinkTree — MySpace-style external links section for the profile
function LinkTree({ t, links, radius = 14, layout = 'list', compact = false }) {
  const visible = links.filter(l => l.enabled && l.url);
  if (visible.length === 0) return null;
  if (layout === 'grid') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
        {visible.map(l => <LinkPill key={l.id} l={l} t={t} radius={radius} compact />)}
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {visible.map(l => <LinkPill key={l.id} l={l} t={t} radius={radius} compact={compact} />)}
    </div>
  );
}

function LinkPill({ l, t, radius = 14, compact = false }) {
  const p = LINK_PLATFORMS[l.platform] || LINK_PLATFORMS.custom;
  const displayUrl = (l.url || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
  return (
    <a href={l.url} target="_blank" rel="noreferrer" style={{
      display: 'flex', alignItems: 'center', gap: compact ? 10 : 14,
      padding: compact ? 10 : 14, background: t.surface, borderRadius: radius,
      textDecoration: 'none', color: t.ink, boxShadow: t.shadow, cursor: 'pointer',
    }}>
      <div style={{
        width: compact ? 36 : 44, height: compact ? 36 : 44,
        borderRadius: Math.max(8, radius - 4),
        background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: p.textColor, flexShrink: 0,
        boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.18)',
      }}>
        <PlatformIcon name={l.platform} size={compact ? 18 : 22} color={p.textColor} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: B_FONT_DISPLAY, fontWeight: 700,
          fontSize: compact ? 13 : 15, color: t.ink, letterSpacing: '-0.01em',
          lineHeight: 1.1,
        }}>{l.label || p.label}</div>
        <div style={{
          fontFamily: B_FONT_MONO, fontSize: compact ? 10 : 11,
          color: t.muted, marginTop: 2,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{displayUrl}</div>
      </div>
      <Icon name="arrow-right" size={14} color={t.muted} />
    </a>
  );
}

// Read tweaks from a shared context exposed on window
function useBTweaks() {
  const Ctx = window.TweaksCtx;
  return Ctx ? React.useContext(Ctx) : null;
}

// ═════════════════════════════════════════════════════════════════════
// SCREEN: DASHBOARD (Direction B)
// ═════════════════════════════════════════════════════════════════════
function BDashboard({ dark }) {
  const t = dark ? HEARTH_DARK : HEARTH_LIGHT;
  return (
    <BFrame dark={dark} height={1180}>
      <BNav t={t} active="Home" />

      {/* Hero strip */}
      <section style={{ padding: '24px 36px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
          <h1 style={{
            fontFamily: B_FONT_DISPLAY, fontSize: 48, fontWeight: 700, letterSpacing: '-0.03em',
            color: t.ink, lineHeight: 1
          }}>
            Hey Aaron <span style={{ display: 'inline-block', transform: 'rotate(8deg)' }}>👋</span>
          </h1>
          <span style={{ fontFamily: B_FONT_MONO, fontSize: 12, color: t.muted }}>Tue · May 13 · 8:42 PM</span>
        </div>
        <p style={{ color: t.muted, fontSize: 15, marginBottom: 28 }}>
          You logged <strong style={{ color: t.ink }}>4 hours</strong> this week. <strong style={{ color: t.ink }}>3 friends</strong> are playing right now.
        </p>

        {/* Quick stat row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
          {[
          { k: 'Playing', v: ME.stats.playing, color: t.accent, icon: 'play' },
          { k: 'Backlog', v: ME.stats.backlog, color: t.accent3, icon: 'bookmark' },
          { k: 'Completed', v: ME.stats.completed, color: t.accent2, icon: 'check' },
          { k: 'Total hours', v: ME.stats.hours.toLocaleString(), color: t.ink, icon: 'clock' }].
          map((s) =>
          <div key={s.k} style={{
            background: t.surface, borderRadius: 14, padding: 18,
            display: 'flex', alignItems: 'center', gap: 14, boxShadow: t.shadow
          }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: s.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={s.icon} size={18} color={s.color} />
              </div>
              <div>
                <div style={{ fontFamily: B_FONT_DISPLAY, fontSize: 26, fontWeight: 700, color: t.ink, lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 11, color: t.muted, marginTop: 3 }}>{s.k}</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Two-column main grid */}
      <section style={{ padding: '0 36px', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24 }}>

        {/* LEFT — Currently playing big cards */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <h2 style={{ fontFamily: B_FONT_DISPLAY, fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>Currently playing</h2>
            <span style={{ fontSize: 12, color: t.muted }}>{NOW_PLAYING.length} games</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {NOW_PLAYING.map((g, i) =>
            <div key={g.title} style={{
              background: t.surface, borderRadius: 16, padding: 16,
              display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: 18,
              alignItems: 'center', boxShadow: t.shadow
            }}>
                <Cover title={g.title} width={100} height={130} radius={10} titleSize={11} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    {i === 0 && <BLive t={t} />}
                    <span style={{ fontFamily: B_FONT_MONO, fontSize: 10, color: t.muted }}>{g.lastPlayed}</span>
                  </div>
                  <h3 style={{ fontFamily: B_FONT_DISPLAY, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: t.ink, lineHeight: 1.1 }}>{g.title}</h3>
                  <div style={{ marginTop: 6, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <BChip t={t} color={t.blush}>{g.genre}</BChip>
                    <BChip t={t} color={t.sage}>{g.platform}</BChip>
                    <BChip t={t}>{g.hours}h</BChip>
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: t.muted, marginBottom: 5 }}>
                      <span>{g.progress}% through</span>
                      <span>started {g.started}</span>
                    </div>
                    <div style={{ height: 6, background: t.card, borderRadius: 999, overflow: 'hidden' }}>
                      <div style={{ width: `${g.progress}%`, height: '100%', background: t.accent, borderRadius: 999 }} />
                    </div>
                  </div>
                </div>
                <button style={{ ...bBtnAccent(t), padding: '10px 16px' }}>
                  <Icon name="play" size={11} color="#fff" />
                  Continue
                </button>
              </div>
            )}
          </div>

          {/* Top 10 preview */}
          <div style={{ marginTop: 32 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
              <h2 style={{ fontFamily: B_FONT_DISPLAY, fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>Your Top 10 🏆</h2>
              <a style={{ fontSize: 12, color: t.accent, cursor: 'pointer', fontWeight: 600 }}>Edit ranking →</a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
              {TOP_10.map((g) =>
              <div key={g.rank} style={{ position: 'relative' }}>
                  <Cover title={g.title} width="100%" height={140} radius={10} titleSize={10} />
                  <div style={{
                  position: 'absolute', top: 6, left: 6,
                  width: 24, height: 24, borderRadius: 8,
                  background: g.rank <= 3 ? t.accent : t.ink,
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: B_FONT_DISPLAY, fontSize: 13, fontWeight: 800,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.25)'
                }}>{g.rank}</div>
                  <div style={{ marginTop: 6, fontSize: 11, fontWeight: 500, color: t.ink, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT — Friend activity (live) */}
        <aside>
          <div style={{
            background: t.surface, borderRadius: 16, padding: 18, boxShadow: t.shadow
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 style={{ fontFamily: B_FONT_DISPLAY, fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>Friends playing now</h3>
              <BLive t={t} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {FRIENDS.filter((f) => f.active).map((f) =>
              <div key={f.username} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: 10, borderRadius: 12, background: t.card
              }}>
                  <div style={{ position: 'relative' }}>
                    <Avatar name={f.display} size={36} radius={10} />
                    <span style={{ position: 'absolute', bottom: -2, right: -2, width: 12, height: 12, borderRadius: '50%', background: t.accent2, border: `2.5px solid ${t.card}` }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: t.ink }}>{f.display}</div>
                    <div style={{ fontSize: 11, color: t.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <Icon name="play" size={9} color={t.accent} /> {f.nowPlaying}
                    </div>
                  </div>
                  <span style={{ fontFamily: B_FONT_MONO, fontSize: 10, color: t.muted }}>{f.since}</span>
                </div>
              )}
            </div>
            <button style={{ ...bBtnGhost(t), width: '100%', justifyContent: 'center', marginTop: 12, background: 'transparent', boxShadow: 'none', color: t.accent }}>
              See all activity →
            </button>
          </div>

          {/* Backlog peek */}
          <div style={{ marginTop: 20, background: t.surface, borderRadius: 16, padding: 18, boxShadow: t.shadow }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h3 style={{ fontFamily: B_FONT_DISPLAY, fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>Up next 📚</h3>
              <span style={{ fontSize: 11, color: t.muted }}>{BACKLOG.length} in backlog</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {BACKLOG.slice(0, 6).map((g) =>
              <div key={g.title}>
                  <Cover title={g.title} width="100%" height={100} radius={8} titleSize={9} />
                  <div style={{ fontSize: 10, fontWeight: 500, color: t.ink, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 5 }}>{g.title}</div>
                </div>
              )}
            </div>
            <button style={{ ...bBtnGhost(t), width: '100%', justifyContent: 'center', marginTop: 12, background: 'transparent', boxShadow: 'none', color: t.accent }}>
              View backlog →
            </button>
          </div>
        </aside>
      </section>
    </BFrame>);

}

// ═════════════════════════════════════════════════════════════════════
// SCREEN: PUBLIC PROFILE (Direction B)
// ═════════════════════════════════════════════════════════════════════
function BProfile({ dark }) {
  const tw = useBTweaks();
  let t = dark ? HEARTH_DARK : HEARTH_LIGHT;
  if (tw?.accent) t = { ...t, accent: tw.accent };
  const displayName = tw?.displayName || ME.display;
  const username    = tw?.username    || ME.username;
  const bio         = tw?.bio         || ME.bio;
  const links       = tw?.links       || [];
  const showLinks   = tw?.showLinks ?? true;
  const cardRadius  = tw?.cardRadius  || 16;
  return (
    <BFrame dark={dark} height={1500 + (showLinks && links.some(l => l.enabled && l.url) ? 220 : 0)}>
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 36px' }}>
        <BLogo t={t} />
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={bBtnGhost(t)}>Share</button>
          <button style={bBtnAccent(t)}>+ Follow</button>
        </div>
      </header>

      {/* Banner card */}
      <section style={{ padding: '12px 36px' }}>
        <div style={{
          background: `linear-gradient(135deg, ${t.blush} 0%, ${t.sage} 100%)`,
          borderRadius: cardRadius + 4, padding: 32, position: 'relative', overflow: 'hidden',
          boxShadow: t.shadowRaised
        }}>
          {/* Decorative dots */}
          <div style={{ position: 'absolute', top: 20, right: 30, fontFamily: B_FONT_DISPLAY, fontSize: 240, fontWeight: 700, color: 'rgba(255,255,255,0.15)', lineHeight: 0.8, pointerEvents: 'none' }}>✦</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 28, alignItems: 'center', position: 'relative' }}>
            <Avatar name={displayName} size={140} radius={cardRadius + 12} style={{ fontSize: 52, boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }} />
            <div>
              <div style={{ fontSize: 13, color: t.ink, opacity: 0.7, fontWeight: 500 }}>@{username} · joined {ME.joined}</div>
              <h1 style={{ fontFamily: B_FONT_DISPLAY, fontSize: 64, lineHeight: 1, letterSpacing: '-0.035em', fontWeight: 700, color: t.ink, marginTop: 6 }}>
                {displayName}
              </h1>
              <p style={{ marginTop: 12, fontSize: 16, color: t.ink, opacity: 0.85, maxWidth: 480, lineHeight: 1.45 }}>
                {bio}
              </p>
              <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                <BChip t={t} color="rgba(255,255,255,0.5)">🎮 RPG-pilled</BChip>
                <BChip t={t} color="rgba(255,255,255,0.5)">📚 Backlog: 28</BChip>
                <BChip t={t} color="rgba(255,255,255,0.5)">🎯 47 completed</BChip>
              </div>
            </div>
            <div style={{
              background: t.surface, borderRadius: cardRadius, padding: 16, minWidth: 240,
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
            }}>
              <BLive t={t} />
              <div style={{ fontSize: 11, color: t.muted, marginTop: 8, fontWeight: 500 }}>Right now playing</div>
              <div style={{ fontFamily: B_FONT_DISPLAY, fontSize: 20, fontWeight: 700, color: t.ink, marginTop: 2 }}>Baldur's Gate 3</div>
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Cover title="Baldur's Gate 3" width={44} height={58} radius={6} titleSize={7} />
                <div style={{ fontSize: 11, color: t.muted, lineHeight: 1.4, fontFamily: B_FONT_MONO }}>
                  47h · Act II<br />Shadow-Cursed Lands
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Link Tree — only if enabled and any links are filled */}
      {showLinks && links.some(l => l.enabled && l.url) && (
        <section style={{ padding: '20px 36px 0' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <h2 style={{ fontFamily: B_FONT_DISPLAY, fontSize: 28, fontWeight: 800, letterSpacing: '-0.025em' }}>Find me online ✦</h2>
              <p style={{ color: t.muted, fontSize: 13, marginTop: 4 }}>The rest of the internet, sorted.</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {links.filter(l => l.enabled && l.url).map(l => (
              <LinkPill key={l.id} l={l} t={t} radius={cardRadius - 2} compact />
            ))}
          </div>
        </section>
      )}

      {/* TOP 10 ranked grid — the centerpiece */}
      <section style={{ padding: '32px 36px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
          <div>
            <h2 style={{ fontFamily: B_FONT_DISPLAY, fontSize: 40, fontWeight: 700, letterSpacing: '-0.03em' }}>Top 10 🏆</h2>
            <p style={{ color: t.muted, fontSize: 14, marginTop: 4 }}>Aaron's all-time favorites. Drag to rerank.</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={bBtnGhost(t)}><Icon name="drag" size={13} color={t.ink} />Rerank</button>
            <button style={bBtnGhost(t)}>Share top 10</button>
          </div>
        </div>

        {/* 5x2 grid of ranked cards. #1 spans bigger. */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridAutoRows: '300px', gap: 14 }}>
          {TOP_10.map((g, i) => {
            const isTop = g.rank === 1;
            return (
              <div key={g.rank} style={{
                gridColumn: isTop ? 'span 2' : 'span 1',
                gridRow: isTop ? 'span 2' : 'span 1',
                background: t.surface, borderRadius: 16, overflow: 'hidden',
                boxShadow: t.shadow, position: 'relative', display: 'flex', flexDirection: 'column'
              }}>
                <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
                  <Cover title={g.title} width="100%" height="100%" radius={0} titleSize={isTop ? 28 : 11} />
                  <div style={{
                    position: 'absolute', top: 10, left: 10,
                    width: isTop ? 56 : 32, height: isTop ? 56 : 32, borderRadius: isTop ? 16 : 10,
                    background: g.rank === 1 ? t.accent : g.rank <= 3 ? t.accent3 : '#fff',
                    color: g.rank <= 3 ? '#fff' : t.ink,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: B_FONT_DISPLAY, fontSize: isTop ? 28 : 16, fontWeight: 800,
                    boxShadow: '0 3px 10px rgba(0,0,0,0.3)',
                    lineHeight: 1
                  }}>
                    {g.rank}
                  </div>
                  {isTop &&
                  <div style={{ position: 'absolute', top: 14, right: 14, padding: '4px 10px', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', borderRadius: 999, color: '#fff', fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                      Most loved
                    </div>
                  }
                </div>
                <div style={{ padding: isTop ? '14px 16px' : '10px 12px', borderTop: `1px solid ${t.rule}` }}>
                  <div style={{ fontFamily: B_FONT_DISPLAY, fontSize: isTop ? 18 : 13, fontWeight: 700, color: t.ink, letterSpacing: '-0.01em', lineHeight: 1.1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</div>
                  <div style={{ fontSize: isTop ? 12 : 10, color: t.muted, marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {g.genre} · {g.year}
                  </div>
                </div>
              </div>);

          })}
        </div>
      </section>

      {/* Stats + recent completions */}
      <section style={{ padding: '32px 36px 36px', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 24 }}>
        <div style={{ background: t.surface, borderRadius: 20, padding: 24, boxShadow: t.shadow }}>
          <h3 style={{ fontFamily: B_FONT_DISPLAY, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 18 }}>By the numbers</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
            ['Completed', ME.stats.completed, t.accent2],
            ['Now playing', ME.stats.playing, t.accent],
            ['Backlog', ME.stats.backlog, t.accent3],
            ['Dropped', ME.stats.dropped, t.muted]].
            map(([k, v, color]) =>
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                <div style={{ flex: 1, fontSize: 14, color: t.ink }}>{k}</div>
                <div style={{ fontFamily: B_FONT_DISPLAY, fontSize: 22, fontWeight: 700, color: t.ink }}>{v}</div>
              </div>
            )}
          </div>
          <div style={{ marginTop: 22, padding: 16, borderRadius: 14, background: t.blush, textAlign: 'center' }}>
            <div style={{ fontFamily: B_FONT_DISPLAY, fontSize: 44, fontWeight: 800, color: t.ink, lineHeight: 1 }}>{ME.stats.hours.toLocaleString()}h</div>
            <div style={{ fontSize: 12, color: t.muted, marginTop: 4 }}>logged across {ME.stats.completed + ME.stats.playing} games</div>
          </div>
        </div>

        <div>
          <h3 style={{ fontFamily: B_FONT_DISPLAY, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 14 }}>Recently completed ✓</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {COMPLETED_RECENT.map((g) =>
            <div key={g.title} style={{ background: t.surface, borderRadius: 14, overflow: 'hidden', boxShadow: t.shadow }}>
                <Cover title={g.title} width="100%" height={170} radius={0} titleSize={13} />
                <div style={{ padding: 12 }}>
                  <div style={{ fontFamily: B_FONT_DISPLAY, fontSize: 14, fontWeight: 700, color: t.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
                    <div style={{ fontFamily: B_FONT_MONO, fontSize: 10, color: t.muted }}>{g.finished}</div>
                    <div style={{ display: 'flex', gap: 1 }}>
                      {[1, 2, 3, 4, 5].map((i) =>
                    <Icon key={i} name="star" size={11} color={i <= g.rating ? t.accent : t.faint} strokeWidth={2} />
                    )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </BFrame>);

}

// ═════════════════════════════════════════════════════════════════════
// SCREEN: LIBRARY (Direction B)
// ═════════════════════════════════════════════════════════════════════
function BLibrary({ dark }) {
  const t = dark ? HEARTH_DARK : HEARTH_LIGHT;
  const [activeStatus, setActiveStatus] = React.useState('All');
  const games = activeStatus === 'All' ? LIBRARY : LIBRARY.filter((g) => g.status === activeStatus);
  const statusCounts = {
    All: LIBRARY.length,
    Playing: LIBRARY.filter((g) => g.status === 'Playing').length,
    Completed: LIBRARY.filter((g) => g.status === 'Completed').length,
    Backlog: LIBRARY.filter((g) => g.status === 'Backlog').length,
    'On-Hold': LIBRARY.filter((g) => g.status === 'On-Hold').length,
    Dropped: LIBRARY.filter((g) => g.status === 'Dropped').length
  };
  const statusColors = {
    All: t.ink,
    Playing: t.accent,
    Completed: t.accent2,
    Backlog: t.accent3,
    'On-Hold': '#a08bb5',
    Dropped: t.muted
  };

  return (
    <BFrame dark={dark} height={1180}>
      <BNav t={t} active="Library" />

      <section style={{ padding: '20px 36px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
          <h1 style={{ fontFamily: B_FONT_DISPLAY, fontSize: 40, fontWeight: 700, letterSpacing: '-0.03em' }}>
            Library <span style={{ color: t.muted, fontWeight: 500 }}>·</span> <span style={{ color: t.muted, fontWeight: 600, fontSize: 24 }}>{LIBRARY.length}</span>
          </h1>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={bBtnGhost(t)}><Icon name="grid" size={13} color={t.ink} />Grid</button>
            <button style={bBtnGhost(t)}><Icon name="list" size={13} color={t.muted} /></button>
          </div>
        </div>

        {/* Status pills as colorful chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
          {['All', ...STATUSES].map((s) =>
          <button key={s} onClick={() => setActiveStatus(s)} style={{
            padding: '8px 14px', borderRadius: 999,
            background: activeStatus === s ? statusColors[s] : t.surface,
            color: activeStatus === s ? '#fff' : t.ink,
            border: 'none', cursor: 'pointer', fontWeight: 600,
            fontSize: 13, fontFamily: B_FONT_BODY,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            boxShadow: activeStatus === s ? 'inset 0 -2px 0 rgba(0,0,0,0.15)' : t.shadow
          }}>
              {s}
              <span style={{
              padding: '1px 7px', borderRadius: 999,
              background: activeStatus === s ? 'rgba(255,255,255,0.25)' : t.card,
              fontSize: 10, fontWeight: 700,
              color: activeStatus === s ? '#fff' : t.muted
            }}>{statusCounts[s]}</span>
            </button>
          )}
        </div>

        {/* Sort + filter row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <span style={{ fontSize: 13, color: t.muted }}>
            <strong style={{ color: t.ink, fontWeight: 600 }}>{games.length}</strong> {activeStatus === 'All' ? 'games' : `${activeStatus.toLowerCase()}`}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Recently added', 'All platforms', 'All genres'].map((s) =>
            <button key={s} style={{ ...bBtnGhost(t), fontSize: 12, padding: '7px 12px' }}>
                {s}<Icon name="arrow-down" size={11} color={t.muted} />
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14 }}>
          {games.slice(0, 18).map((g) =>
          <BLibraryCard key={g.title + g.status} g={g} t={t} statusColors={statusColors} />
          )}
        </div>
      </section>
    </BFrame>);

}

function BLibraryCard({ g, t, statusColors }) {
  return (
    <div style={{
      background: t.surface, borderRadius: 14, overflow: 'hidden',
      boxShadow: t.shadow, position: 'relative'
    }}>
      <Cover title={g.title} width="100%" height={170} radius={0} titleSize={12} />
      <div style={{
        position: 'absolute', top: 8, left: 8,
        padding: '3px 8px', borderRadius: 999,
        background: statusColors[g.status] || t.muted, color: '#fff',
        fontSize: 9, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase'
      }}>{g.status}</div>
      <div style={{ padding: '10px 12px' }}>
        <div style={{ fontFamily: B_FONT_DISPLAY, fontSize: 13, fontWeight: 700, color: t.ink, lineHeight: 1.15, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</div>
        <div style={{ fontSize: 10, color: t.muted, marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.platform} · {g.year}</div>
      </div>
    </div>);

}

// ═════════════════════════════════════════════════════════════════════
// SCREEN: GAME DETAIL (Direction B)
// ═════════════════════════════════════════════════════════════════════
function BGameDetail({ dark }) {
  const t = dark ? HEARTH_DARK : HEARTH_LIGHT;
  const g = TOP_10[0];
  return (
    <BFrame dark={dark} height={1100}>
      <BNav t={t} active="Library" />

      <section style={{ padding: '12px 36px' }}>
        <a style={{ fontSize: 12, color: t.muted, cursor: 'pointer', marginBottom: 16, display: 'inline-block' }}>← Back to library</a>

        {/* Hero card */}
        <div style={{
          background: t.surface, borderRadius: 20, padding: 28,
          display: 'grid', gridTemplateColumns: '260px 1fr auto', gap: 32,
          boxShadow: t.shadow
        }}>
          <Cover title={g.title} width={260} height={340} radius={14} titleSize={22} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <BChip t={t} color={t.accent2 + '33'}>
                <Icon name="check" size={11} color={t.accent2} strokeWidth={2.5} />
                <span style={{ color: t.accent2, fontWeight: 700 }}>Completed</span>
              </BChip>
              <BChip t={t} color={t.accent + '22'}>
                <span style={{ color: t.accent, fontWeight: 700 }}>#1 in your top 10</span>
              </BChip>
            </div>
            <h1 style={{ fontFamily: B_FONT_DISPLAY, fontSize: 56, fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1, color: t.ink }}>{g.title}</h1>
            <div style={{ marginTop: 8, color: t.muted, fontSize: 15 }}>
              <strong style={{ color: t.ink }}>{g.developer}</strong> · {g.year} · {g.platform}
            </div>
            <div style={{ marginTop: 18, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <BChip t={t}>{g.genre}</BChip>
              <BChip t={t}>{g.hours}h logged</BChip>
              <BChip t={t}>Metacritic {g.metacritic}</BChip>
              <BChip t={t}>★ ★ ★ ★ ★</BChip>
            </div>

            <div style={{ marginTop: 22 }}>
              <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Status</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {STATUSES.map((s) =>
                <button key={s} style={{
                  padding: '8px 14px', borderRadius: 10,
                  background: s === 'Completed' ? t.accent2 : t.card,
                  color: s === 'Completed' ? '#fff' : t.muted,
                  border: 'none', fontWeight: 600, fontFamily: B_FONT_BODY,
                  fontSize: 12, cursor: 'pointer',
                  boxShadow: s === 'Completed' ? 'inset 0 -2px 0 rgba(0,0,0,0.15)' : 'none'
                }}>{s}</button>
                )}
              </div>
            </div>

            <div style={{ marginTop: 22, display: 'flex', gap: 10 }}>
              <button style={bBtnAccent(t)}><Icon name="arrow-up" size={12} color="#fff" strokeWidth={2.5} />Bump up in Top 10</button>
              <button style={bBtnGhost(t)}>Edit details</button>
            </div>
          </div>

          <div style={{ background: t.card, borderRadius: 14, padding: 18, minWidth: 200 }}>
            <div style={{ fontFamily: B_FONT_MONO, fontSize: 10, color: t.muted, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Key dates</div>
            {[
            ['Started', 'Mar 04, 2024'],
            ['Completed', 'May 02, 2024'],
            ['Last logged', 'May 11, 2026']].
            map(([k, v]) =>
            <div key={k} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: t.muted }}>{k}</div>
                <div style={{ fontFamily: B_FONT_DISPLAY, fontSize: 15, fontWeight: 700, color: t.ink }}>{v}</div>
              </div>
            )}
          </div>
        </div>

        {/* Notes + friends row */}
        <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
          <div style={{ background: t.surface, borderRadius: 18, padding: 22, boxShadow: t.shadow }}>
            <h3 style={{ fontFamily: B_FONT_DISPLAY, fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>Your notes 📝</h3>
            <p style={{ fontSize: 14, color: t.ink, lineHeight: 1.6, padding: 14, background: t.card, borderRadius: 12 }}>
              Maybe the best metroidvania ever made. The way it teaches you traversal without ever telling you anything is just lethal. Soundtrack lives in my head rent-free.
            </p>
            <div style={{ marginTop: 16 }}>
              <h4 style={{ fontFamily: B_FONT_DISPLAY, fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Activity</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                ['🎮', 'Started playing', 'Mar 04, 2024'],
                ['🏁', 'Marked Completed', 'May 02, 2024'],
                ['⭐', 'Added to Top 10 at #3', 'May 12, 2024'],
                ['⬆️', 'Moved up to #1', 'Aug 02, 2024'],
                ['📝', 'Edited notes', 'May 11, 2026']].
                map(([emoji, what, when], i) =>
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '8px 12px', background: t.card, borderRadius: 10
                }}>
                    <span style={{ fontSize: 16 }}>{emoji}</span>
                    <span style={{ fontSize: 13, color: t.ink, flex: 1 }}>{what}</span>
                    <span style={{ fontFamily: B_FONT_MONO, fontSize: 11, color: t.muted }}>{when}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ background: t.surface, borderRadius: 18, padding: 22, boxShadow: t.shadow }}>
            <h3 style={{ fontFamily: B_FONT_DISPLAY, fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>Friends who played 👥</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {FRIENDS.slice(0, 5).map((f, i) =>
              <div key={f.username} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: 10, background: t.card, borderRadius: 12
              }}>
                  <Avatar name={f.display} size={32} radius={8} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: t.ink }}>{f.display}</div>
                    <div style={{ fontSize: 11, color: t.muted }}>Ranked #{[1, 3, 2, 7, 5][i]}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 1 }}>
                    {[1, 2, 3, 4, 5].map((j) => <Icon key={j} name="star" size={10} color={j <= [5, 4, 5, 3, 5][i] ? t.accent : t.faint} strokeWidth={2} />)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </BFrame>);

}

// ═════════════════════════════════════════════════════════════════════
// SCREEN: ADD GAME (Direction B)
// ═════════════════════════════════════════════════════════════════════
function BAddGame({ dark }) {
  const t = dark ? HEARTH_DARK : HEARTH_LIGHT;
  return (
    <BFrame dark={dark} height={900}>
      <BNav t={t} active="Home" />
      <div style={{ position: 'absolute', inset: '70px 0 0 0', background: 'rgba(35,32,28,0.25)', backdropFilter: 'blur(6px)' }} />

      <div style={{
        position: 'absolute', top: 100, left: '50%', transform: 'translateX(-50%)',
        width: 660, background: t.bg, borderRadius: 24, padding: 32,
        boxShadow: '0 20px 80px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>📦 New entry</div>
            <h2 style={{ fontFamily: B_FONT_DISPLAY, fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 4 }}>Add a game</h2>
          </div>
          <button style={{
            width: 32, height: 32, borderRadius: 10, background: t.surface, border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: t.shadow
          }}>
            <Icon name="x" size={16} color={t.muted} />
          </button>
        </div>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px',
          background: t.surface, borderRadius: 14, border: `2px solid ${t.accent}`,
          boxShadow: '0 0 0 4px ' + t.accent + '20'
        }}>
          <Icon name="search" size={16} color={t.accent} />
          <input defaultValue="baldur" placeholder="Search by title…" style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: 15, color: t.ink, flex: 1, fontFamily: B_FONT_BODY, fontWeight: 500 }} />
          <span style={{ fontSize: 10, color: t.muted, background: t.card, padding: '3px 8px', borderRadius: 6, fontFamily: B_FONT_MONO, fontWeight: 600 }}>RAWG</span>
        </div>

        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
          { title: "Baldur's Gate 3", year: 2023, dev: 'Larian Studios', selected: true },
          { title: "Baldur's Gate II: Enhanced Edition", year: 2013, dev: 'Beamdog' },
          { title: "Baldur's Gate: Dark Alliance", year: 2001, dev: 'Snowblind Studios' }].
          map((r, i) =>
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: 12,
            background: r.selected ? t.blush : t.surface,
            borderRadius: 12, cursor: 'pointer',
            border: r.selected ? `2px solid ${t.accent}` : '2px solid transparent',
            boxShadow: r.selected ? 'none' : t.shadow
          }}>
              <Cover title={r.title} width={48} height={64} radius={8} titleSize={7} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: B_FONT_DISPLAY, fontSize: 16, fontWeight: 700, color: t.ink }}>{r.title}</div>
                <div style={{ fontSize: 12, color: t.muted, marginTop: 3 }}>{r.dev} · {r.year}</div>
              </div>
              {r.selected &&
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name="check" size={14} color="#fff" strokeWidth={3} />
                </div>
            }
            </div>
          )}
        </div>

        <div style={{ marginTop: 22 }}>
          <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Set status</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {STATUSES.map((s) =>
            <button key={s} style={{
              padding: '8px 14px', borderRadius: 10,
              background: s === 'Playing' ? t.accent : t.surface,
              color: s === 'Playing' ? '#fff' : t.ink,
              border: 'none', cursor: 'pointer', fontWeight: 600,
              fontSize: 12, fontFamily: B_FONT_BODY,
              boxShadow: s === 'Playing' ? 'inset 0 -2px 0 rgba(0,0,0,0.18)' : t.shadow
            }}>{s}</button>
            )}
          </div>
        </div>

        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Started</div>
            <div style={{ padding: '10px 14px', background: t.surface, borderRadius: 10, fontSize: 13, color: t.ink, fontWeight: 500, boxShadow: t.shadow }}>📅 May 13, 2026</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Target finish</div>
            <div style={{ padding: '10px 14px', background: t.surface, borderRadius: 10, fontSize: 13, color: t.muted, fontWeight: 500, boxShadow: t.shadow }}>📅 Optional</div>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Notes</div>
          <textarea defaultValue="Finally caving and starting BG3. Going Bard." style={{
            width: '100%', padding: 12, background: t.surface, borderRadius: 12,
            border: 'none', color: t.ink, fontSize: 13, fontFamily: B_FONT_BODY,
            outline: 'none', resize: 'none', height: 70, boxShadow: t.shadow
          }} />
        </div>

        <div style={{ marginTop: 22, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button style={bBtnGhost(t)}>Cancel</button>
          <button style={bBtnAccent(t)}><Icon name="plus" size={13} color="#fff" strokeWidth={2.5} />Add to library</button>
        </div>
      </div>
    </BFrame>);

}

// ═════════════════════════════════════════════════════════════════════
// SCREEN: FRIENDS FEED (Direction B)
// ═════════════════════════════════════════════════════════════════════
function BFriends({ dark }) {
  const t = dark ? HEARTH_DARK : HEARTH_LIGHT;
  return (
    <BFrame dark={dark} height={1100}>
      <BNav t={t} active="Friends" />

      {/* Live strip */}
      <section style={{ padding: '12px 36px' }}>
        <div style={{
          background: `linear-gradient(120deg, ${t.sage} 0%, ${t.blush} 100%)`,
          borderRadius: 20, padding: 24, boxShadow: t.shadow, position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <div>
              <BLive t={t} label="4 friends live" />
              <h1 style={{ fontFamily: B_FONT_DISPLAY, fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 10, color: t.ink }}>In session right now</h1>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {FRIENDS.filter((f) => f.active).map((f) =>
            <div key={f.username} style={{
              background: t.surface, borderRadius: 14, padding: 14,
              display: 'flex', flexDirection: 'column', gap: 12
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ position: 'relative' }}>
                    <Avatar name={f.display} size={32} radius={8} />
                    <span style={{ position: 'absolute', bottom: -2, right: -2, width: 10, height: 10, borderRadius: '50%', background: t.accent2, border: `2.5px solid ${t.surface}` }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: t.ink, fontSize: 13 }}>{f.display}</div>
                    <div style={{ fontFamily: B_FONT_MONO, fontSize: 10, color: t.muted }}>@{f.username}</div>
                  </div>
                  <span style={{ fontFamily: B_FONT_MONO, fontSize: 10, color: t.muted }}>{f.since}</span>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <Cover title={f.nowPlaying} width={40} height={54} radius={6} titleSize={6} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10, color: t.muted, fontWeight: 600 }}>PLAYING</div>
                    <div style={{ fontFamily: B_FONT_DISPLAY, fontSize: 14, fontWeight: 700, color: t.ink, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.nowPlaying}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Feed + sidebar */}
      <section style={{ padding: '32px 36px 36px', display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 24 }}>
        <div>
          <h2 style={{ fontFamily: B_FONT_DISPLAY, fontSize: 26, fontWeight: 800, letterSpacing: '-0.025em', marginBottom: 14 }}>This week's activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ACTIVITY.map((a, i) => <BActivityRow key={i} a={a} t={t} />)}
          </div>
        </div>

        <aside style={{ background: t.surface, borderRadius: 18, padding: 22, boxShadow: t.shadow, alignSelf: 'flex-start' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <h3 style={{ fontFamily: B_FONT_DISPLAY, fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>Your circle</h3>
            <span style={{ fontSize: 11, color: t.muted }}>{FRIENDS.length} friends</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {FRIENDS.map((f) =>
            <div key={f.username} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: 10,
              borderRadius: 12, background: t.card
            }}>
                <div style={{ position: 'relative' }}>
                  <Avatar name={f.display} size={32} radius={8} />
                  {f.active && <span style={{ position: 'absolute', bottom: -2, right: -2, width: 10, height: 10, borderRadius: '50%', background: t.accent2, border: `2.5px solid ${t.card}` }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: t.ink }}>{f.display}</div>
                  <div style={{ fontSize: 10, color: t.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {f.active ? `▶ ${f.nowPlaying}` : `seen ${f.since}`}
                  </div>
                </div>
              </div>
            )}
          </div>
          <button style={{ ...bBtnAccent(t), width: '100%', justifyContent: 'center', marginTop: 14 }}>
            <Icon name="plus" size={13} color="#fff" strokeWidth={2.5} />
            Find friends
          </button>
        </aside>
      </section>
    </BFrame>);

}

function BActivityRow({ a, t }) {
  const kindStyle = {
    complete: { bg: t.accent2 + '22', emoji: '🏁', color: t.accent2 },
    drop: { bg: t.muted + '22', emoji: '😴', color: t.muted },
    start: { bg: t.accent + '22', emoji: '🎮', color: t.accent },
    milestone: { bg: t.accent3 + '22', emoji: '⏱', color: t.accent3 },
    add: { bg: t.blush, emoji: '📚', color: t.ink },
    rate: { bg: t.accent + '22', emoji: '⭐', color: t.accent },
    topten: { bg: t.accent + '22', emoji: '🏆', color: t.accent }
  }[a.kind];
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: 14, background: t.surface, borderRadius: 14, boxShadow: t.shadow
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: kindStyle.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20
      }}>{kindStyle.emoji}</div>
      <Avatar name={a.user} size={32} radius={8} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, color: t.ink, lineHeight: 1.4 }}>
          <strong style={{ fontWeight: 700, fontFamily: B_FONT_DISPLAY }}>{a.user}</strong>
          <span style={{ color: t.muted }}> {a.verb} </span>
          <strong style={{ fontWeight: 600 }}>{a.target}</strong>
        </div>
        <div style={{ fontSize: 11, color: t.muted, marginTop: 2 }}>{a.when}</div>
      </div>
      {(a.kind === 'complete' || a.kind === 'rate') &&
      <div style={{ display: 'flex', gap: 1 }}>
          {[1, 2, 3, 4, 5].map((i) => <Icon key={i} name="star" size={11} color={i <= (a.rating || 5) ? t.accent : t.faint} strokeWidth={2} />)}
        </div>
      }
    </div>);

}

// ═════════════════════════════════════════════════════════════════════
// SCREEN: LANDING (Direction B)
// ═════════════════════════════════════════════════════════════════════
function BLanding({ dark }) {
  const t = dark ? HEARTH_DARK : HEARTH_LIGHT;
  return (
    <BFrame dark={dark} height={1100}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 36px' }}>
        <BLogo t={t} size={24} />
        <nav style={{ display: 'flex', gap: 24, fontSize: 13, color: t.muted, fontWeight: 500 }}>
          <a style={{ cursor: 'pointer', color: "rgb(237, 118, 62)" }}>Features</a>
          <a style={{ cursor: 'pointer', color: "rgb(237, 118, 62)" }}>Profiles</a>
          <a style={{ cursor: 'pointer', color: "rgb(237, 118, 62)" }}>Pricing</a>
        </nav>
        <div style={{ display: 'flex', gap: 10 }}>
          <button style={bBtnGhost(t)}>Sign in</button>
          <button style={bBtnAccent(t)}>Get started — free</button>
        </div>
      </header>

      {/* Hero */}
      <section style={{ padding: '40px 36px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999, background: t.blush, fontSize: 12, fontWeight: 600, color: t.ink, marginBottom: 24 }}>
            🎮 a tracker for people who actually finish games
          </div>
          <h1 style={{
            fontFamily: B_FONT_DISPLAY, fontSize: 88, lineHeight: 0.92,
            letterSpacing: '-0.04em', fontWeight: 800, color: t.ink
          }}>
            The cozy<br />
            home for your<br />
            <span style={{ background: `linear-gradient(120deg, ${t.accent} 0%, ${t.accent3} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>game life</span>.
          </h1>
          <p style={{ marginTop: 24, fontSize: 17, color: t.muted, maxWidth: 460, lineHeight: 1.55 }}>
            Track what you're playing, build a Top 10 you'd actually defend, and share a profile that feels like your room — not a spreadsheet.
          </p>
          <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
            <button style={{ ...bBtnAccent(t), padding: '14px 24px', fontSize: 15 }}>
              Make my profile
              <Icon name="arrow-right" size={15} color="#fff" strokeWidth={2.5} />
            </button>
            <button style={{ ...bBtnGhost(t), padding: '14px 22px', fontSize: 14 }}>See an example</button>
          </div>
          <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex' }}>
              {['Mari', 'Kev', 'Nora', 'Rafa'].map((n, i) =>
              <Avatar key={n} name={n} size={32} radius={'50%'} style={{ marginLeft: i ? -8 : 0, border: `2px solid ${t.bg}` }} />
              )}
            </div>
            <div style={{ fontSize: 13, color: t.muted }}>
              <strong style={{ color: t.ink }}>2,847 players</strong> built their profile this month
            </div>
          </div>
        </div>

        {/* Right: stylized profile preview */}
        <div style={{ position: 'relative', height: 540 }}>
          {/* Background blob */}
          <div style={{
            position: 'absolute', inset: '20px 0px 0px 40px', borderRadius: 32,
            background: `linear-gradient(135deg, ${t.sage} 0%, ${t.blush} 100%)`,
            transform: 'rotate(3deg)', zIndex: 0
          }} />
          {/* Profile card */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 30, bottom: 30,
            background: t.surface, borderRadius: 24, padding: 22, zIndex: 1,
            boxShadow: t.shadowRaised
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
              <Avatar name="Mari" size={56} radius={14} style={{ fontSize: 22 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: B_FONT_DISPLAY, fontSize: 20, fontWeight: 800 }}>marisol</div>
                <div style={{ fontSize: 12, color: t.muted }}>38 completed · 12 in backlog</div>
              </div>
              <BLive t={t} />
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <BChip t={t} color={t.blush}>JRPG-pilled</BChip>
              <BChip t={t} color={t.sage}>Switch + PC</BChip>
            </div>
            <div style={{ fontFamily: B_FONT_DISPLAY, fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Top 6 🏆</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {['Persona 5 Royal', 'Outer Wilds', 'Disco Elysium', 'Slay the Princess', 'Citizen Sleeper', 'Pentiment'].map((g, i) =>
              <div key={g} style={{ position: 'relative' }}>
                  <Cover title={g} width="100%" height={120} radius={10} titleSize={10} tint={i < 3 ? 'warm' : undefined} />
                  <div style={{
                  position: 'absolute', top: 6, left: 6,
                  width: 22, height: 22, borderRadius: 7,
                  background: i < 3 ? t.accent : t.ink, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: B_FONT_DISPLAY, fontSize: 11, fontWeight: 800
                }}>{i + 1}</div>
                </div>
              )}
            </div>
            <div style={{ marginTop: 16, padding: 12, background: t.card, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Cover title="Persona 5 Royal" width={36} height={48} radius={6} titleSize={6} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: t.muted, fontWeight: 600 }}>PLAYING</div>
                <div style={{ fontFamily: B_FONT_DISPLAY, fontWeight: 700, fontSize: 14 }}>Persona 5 Royal</div>
              </div>
              <span style={{ fontFamily: B_FONT_MONO, fontSize: 10, color: t.muted }}>14h · 5m</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature triplet */}
      <section style={{ padding: '80px 36px 60px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {[
        { emoji: '📚', title: 'Track everything', body: 'Playing, completed, backlog, on-hold, dropped. Statuses, hours, dates — the works.', color: t.blush },
        { emoji: '🏆', title: 'Rank your Top 10', body: 'Drag-to-reorder your all-time favorites. Defend your #1 in your own words.', color: t.sage },
        { emoji: '👋', title: 'Share with friends', body: 'A profile page worth sending. Live "now playing" keeps your circle close.', color: '#f0d8c0' }].
        map((f) =>
        <div key={f.title} style={{
          background: f.color, borderRadius: 20, padding: 28,
          boxShadow: t.shadow
        }}>
            <div style={{ fontSize: 36 }}>{f.emoji}</div>
            <h3 style={{ fontFamily: B_FONT_DISPLAY, fontSize: 26, fontWeight: 800, letterSpacing: '-0.025em', marginTop: 14, color: t.ink }}>{f.title}</h3>
            <p style={{ marginTop: 8, fontSize: 14, color: t.ink, opacity: 0.7, lineHeight: 1.55 }}>{f.body}</p>
          </div>
        )}
      </section>
    </BFrame>);

}

// EXPORT ─────────────────────────────────────────────────────────────
Object.assign(window, { BDashboard, BProfile, BLibrary, BGameDetail, BAddGame, BFriends, BLanding });