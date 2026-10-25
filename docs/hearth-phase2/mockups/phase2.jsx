/* Phase 2 mockups: MySpace-style Top 10 (All-time + Best of year), editing, mobile.
   Reuses shared.jsx (Cover, Icon, Avatar, data) + direction-b.jsx (HEARTH tokens, BNav, buttons). */

const YEAR_TOP = [
  "Baldur's Gate 3", 'Tears of the Kingdom', 'Cocoon', 'Slay the Princess', 'Chants of Sennaar',
  'Sea of Stars', 'Slay the Spire', 'Tunic', 'Dredge', 'Cyberpunk 2077',
].map((title, i) => ({ rank: i + 1, title, genre: (LIBRARY.find(g => g.title === title) || {}).genre || 'Adventure' }));

const p2 = {
  display: B_FONT_DISPLAY, body: B_FONT_BODY, mono: B_FONT_MONO,
};

function RankBadge({ rank, t, size = 30 }) {
  const bg = rank === 1 ? t.accent : rank <= 3 ? t.accent3 : t.surface;
  const fg = rank <= 3 ? '#fff' : t.ink;
  return (
    <div style={{
      position: 'absolute', top: size * 0.25, left: size * 0.25, width: size, height: size,
      borderRadius: size * 0.32, background: bg, color: fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: p2.display, fontWeight: 800, fontSize: size * 0.52, lineHeight: 1,
      boxShadow: '0 3px 10px rgba(0,0,0,0.28)',
    }}>{rank}</div>
  );
}

function SectionHead({ t, title, sub, right, size = 26 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginBottom: 14 }}>
      <div>
        <h2 style={{ margin: 0, fontFamily: p2.display, fontSize: size, fontWeight: 700, letterSpacing: '-0.02em', color: t.ink, lineHeight: 1.1 }}>{title}</h2>
        {sub && <div style={{ fontSize: 13, color: t.muted, marginTop: 4 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

function YearPill({ t, year = 2026 }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 999, background: t.surface, boxShadow: t.shadow, fontSize: 13, fontWeight: 600, color: t.ink }}>
      {year} <Icon name="arrow-down" size={12} color={t.muted} />
    </span>
  );
}

// ─── Desktop profile with two lists ─────────────────────────────────
function P2Profile({ dark }) {
  const t = dark ? HEARTH_DARK : HEARTH_LIGHT;
  return (
    <BFrame dark={dark} height={1440}>
      <BNav t={t} active="Profile" />
      <div style={{ padding: '8px 36px 48px', display: 'flex', flexDirection: 'column', gap: 36 }}>
        <div style={{ background: t.surface, borderRadius: 24, padding: 28, boxShadow: t.shadow, display: 'flex', gap: 24, alignItems: 'center' }}>
          <Avatar name={ME.display} size={104} radius={28} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <h1 style={{ margin: 0, fontFamily: p2.display, fontSize: 40, fontWeight: 700, letterSpacing: '-0.03em' }}>{ME.display}</h1>
              <span style={{ fontFamily: p2.mono, fontSize: 13, color: t.muted }}>@{ME.username}</span>
            </div>
            <p style={{ margin: '6px 0 12px', color: t.muted, fontSize: 15 }}>{ME.bio}</p>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <BLive t={t} label="Now playing" />
              <span style={{ fontWeight: 600, fontSize: 14 }}>Baldur's Gate 3</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button style={bBtnGhost(t)}><Icon name="settings" size={14} /> Edit profile</button>
            <button style={bBtnGhost(t)}><Icon name="grid" size={14} /> Arrange</button>
          </div>
        </div>

        <section>
          <SectionHead t={t} title={`${ME.display.split(' ')[0]}'s All-Time Top 10`} sub="The games that made me."
            right={<button style={bBtnGhost(t)}><Icon name="drag" size={14} /> Edit Top 10</button>} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0,1fr))', gap: 16 }}>
            {TOP_10.map(g => (
              <div key={g.rank}>
                <div style={{ position: 'relative', aspectRatio: '3 / 4', borderRadius: 16, overflow: 'hidden', boxShadow: t.shadowRaised }}>
                  <Cover title={g.title} radius={0} showTitle={false} tint={g.rank <= 3 ? 'warm' : undefined} />
                  <RankBadge rank={g.rank} t={t} size={g.rank === 1 ? 40 : 32} />
                </div>
                <div style={{ marginTop: 8, fontFamily: p2.display, fontWeight: 700, fontSize: 15, color: t.ink, lineHeight: 1.15 }}>{g.title}</div>
                <div style={{ fontSize: 12, color: t.muted }}>{g.genre} · {g.year}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHead t={t} title="Best of 2026" sub="Favorite games I played this year. Past years stay on the profile."
            right={<div style={{ display: 'flex', gap: 8 }}><YearPill t={t} /><button style={bBtnGhost(t)}><Icon name="drag" size={14} /> Edit</button></div>} />
          <div style={{ background: t.surface, borderRadius: 20, padding: 18, boxShadow: t.shadow, display: 'grid', gridTemplateColumns: 'repeat(10, minmax(0,1fr))', gap: 10 }}>
            {YEAR_TOP.map(g => (
              <div key={g.rank}>
                <div style={{ position: 'relative', aspectRatio: '3 / 4', borderRadius: 10, overflow: 'hidden' }}>
                  <Cover title={g.title} radius={0} showTitle={false} />
                  <RankBadge rank={g.rank} t={t} size={22} />
                </div>
                <div style={{ marginTop: 6, fontSize: 11, fontWeight: 600, color: t.ink, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </BFrame>
  );
}

// ─── Desktop edit mode ──────────────────────────────────────────────
function P2Edit({ dark }) {
  const t = dark ? HEARTH_DARK : HEARTH_LIGHT;
  const filled = TOP_10.slice(0, 7);
  const lib = [
    { title: 'Pyre', status: 'Completed', added: false },
    { title: 'Inside', status: 'Completed', added: false },
    { title: 'Hollow Knight', status: 'Completed', added: 1 },
    { title: "Baldur's Gate 3", status: 'Playing', added: false },
    { title: 'Cocoon', status: 'Completed', added: false },
    { title: 'Disco Elysium', status: 'Completed', added: 2 },
    { title: 'Tunic', status: 'Backlog', added: false },
  ];
  return (
    <BFrame dark={dark} height={960}>
      <BNav t={t} active="Profile" />
      <div style={{ margin: '4px 36px 0', padding: '14px 20px', borderRadius: 16, background: t.ink, color: t.bg, display: 'flex', alignItems: 'center', gap: 14 }}>
        <Icon name="drag" size={18} color={t.bg} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: p2.display, fontWeight: 700, fontSize: 17 }}>Editing All-Time Top 10</div>
          <div style={{ fontSize: 13, opacity: 0.75 }}>Drag to reorder. Click × to remove. Pick games on the right to fill empty slots.</div>
        </div>
        <button style={{ ...bBtnGhost(t), background: 'transparent', color: t.bg, boxShadow: 'none' }}>Cancel</button>
        <button style={bBtnAccent(t)}><Icon name="check" size={14} color="#fff" strokeWidth={2.5} /> Done</button>
      </div>
      <div style={{ padding: '24px 36px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 28 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0,1fr))', gap: 14, alignContent: 'start' }}>
          {Array.from({ length: 10 }).map((_, i) => {
            const g = filled[i];
            const lifted = i === 3;
            if (!g) return (
              <div key={i} style={{ aspectRatio: '3 / 4.6', borderRadius: 16, border: `2px dashed ${t.faint}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: t.muted }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: t.blush, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="plus" size={18} color={t.accent} strokeWidth={2.5} /></div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>Add #{i + 1}</div>
              </div>
            );
            return (
              <div key={i} style={{
                background: t.surface, borderRadius: 16, padding: 8, boxShadow: lifted ? '0 24px 48px rgba(0,0,0,0.22)' : t.shadow,
                transform: lifted ? 'rotate(-3deg) translateY(-8px)' : 'none', outline: lifted ? `3px solid ${t.accent}` : 'none', cursor: 'grab',
              }}>
                <div style={{ position: 'relative', aspectRatio: '3 / 4', borderRadius: 10, overflow: 'hidden' }}>
                  <Cover title={g.title} radius={0} showTitle={false} tint={i < 3 ? 'warm' : undefined} />
                  <RankBadge rank={i + 1} t={t} size={28} />
                  <div style={{ position: 'absolute', top: 7, right: 7, width: 26, height: 26, borderRadius: 8, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="x" size={13} color="#fff" strokeWidth={2.5} /></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                  <Icon name="drag" size={14} color={t.muted} />
                  <div style={{ fontWeight: 600, fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</div>
                </div>
              </div>
            );
          })}
        </div>
        <aside style={{ background: t.surface, borderRadius: 20, padding: 18, boxShadow: t.shadow, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontFamily: p2.display, fontWeight: 700, fontSize: 18 }}>Add from your library</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: t.bg, borderRadius: 12 }}>
            <Icon name="search" size={14} color={t.muted} /><span style={{ color: t.muted, fontSize: 13 }}>Search your games…</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {lib.map(g => (
              <div key={g.title} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 8, borderRadius: 12, background: g.added ? t.bg : 'transparent' }}>
                <Cover title={g.title} width={36} height={48} radius={6} showTitle={false} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{g.title}</div>
                  <div style={{ fontSize: 11, color: t.muted }}>{g.status}</div>
                </div>
                {g.added
                  ? <span style={{ fontSize: 12, fontWeight: 700, color: t.accent2 }}>#{g.added}</span>
                  : <button style={{ ...bBtnGhost(t), padding: '6px 12px', fontSize: 12, background: t.blush, boxShadow: 'none' }}>Add</button>}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </BFrame>
  );
}

// ─── Edit Game modal: "Top lists" section ───────────────────────────
function P2Modal({ dark }) {
  const t = dark ? HEARTH_DARK : HEARTH_LIGHT;
  const Row = ({ title, sub, right }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14, background: t.surface, borderRadius: 14, boxShadow: t.shadow }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: 14 }}>{title}</div>
        <div style={{ fontSize: 12, color: t.muted }}>{sub}</div>
      </div>
      {right}
    </div>
  );
  return (
    <BFrame dark={dark} width={720} height={560}>
      <div style={{ padding: 32 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
          <Cover title="Hades" width={64} height={86} radius={10} showTitle={false} />
          <div>
            <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Edit game</div>
            <div style={{ fontFamily: p2.display, fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em' }}>Hades</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>Top lists</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Row title="All-Time Top 10" sub="Ranked #5"
            right={<div style={{ display: 'flex', gap: 8 }}><span style={{ ...bBtnGhost(t), boxShadow: 'none', background: t.blush }}>#5 <Icon name="arrow-down" size={12} /></span><button style={bBtnGhost(t)}>Remove</button></div>} />
          <Row title="Best of 2026" sub="6 of 10 spots used"
            right={<button style={bBtnAccent(t)}><Icon name="plus" size={14} color="#fff" strokeWidth={2.5} /> Add as #7</button>} />
        </div>
        <p style={{ fontSize: 13, color: t.muted, marginTop: 14 }}>When a list is full, adding a game asks which one to swap out.</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 28 }}>
          <button style={bBtnGhost(t)}>Cancel</button>
          <button style={bBtnPrimary(t)}>Save</button>
        </div>
      </div>
    </BFrame>
  );
}

// ─── Mobile primitives ──────────────────────────────────────────────
function MFrame({ t, height = 844, tab, children, overlay }) {
  return (
    <div style={{ width: 390, height, background: t.bg, color: t.ink, fontFamily: p2.body, fontSize: 14, lineHeight: 1.45, position: 'relative', overflow: 'hidden' }}>
      <div style={{ height: 44, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 600, fontSize: 14 }}>
        <span>9:41</span><span style={{ display: 'flex', gap: 4 }}><span style={{ width: 16, height: 10, borderRadius: 2, background: t.ink }} /><span style={{ width: 22, height: 10, borderRadius: 3, border: `1.5px solid ${t.ink}` }} /></span>
      </div>
      <div style={{ paddingBottom: tab ? 96 : 24 }}>{children}</div>
      {tab && <MTabs t={t} active={tab} />}
      {overlay}
    </div>
  );
}

function MTabs({ t, active }) {
  const items = [['Home', 'home'], ['Library', 'grid'], ['add', 'plus'], ['Friends', 'users'], ['Profile', 'user']];
  return (
    <nav style={{ position: 'absolute', left: 12, right: 12, bottom: 16, height: 64, background: t.surface, borderRadius: 22, boxShadow: t.shadowRaised, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      {items.map(([k, ic]) => k === 'add' ? (
        <div key={k} style={{ width: 52, height: 52, borderRadius: 16, background: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.15)' }}><Icon name="plus" size={22} color="#fff" strokeWidth={2.5} /></div>
      ) : (
        <div key={k} style={{ width: 56, height: 52, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, color: active === k ? t.accent : t.muted, opacity: k === 'Friends' ? 0.45 : 1 }}>
          <Icon name={ic} size={20} color="currentColor" strokeWidth={active === k ? 2.2 : 1.75} />
          <span style={{ fontSize: 10, fontWeight: 600 }}>{k}</span>
        </div>
      ))}
    </nav>
  );
}

function MHeader({ t, title, right }) {
  return (
    <div style={{ padding: '6px 20px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <h1 style={{ margin: 0, fontFamily: p2.display, fontSize: 30, fontWeight: 700, letterSpacing: '-0.03em' }}>{title}</h1>
      {right}
    </div>
  );
}

// ─── Mobile Home ────────────────────────────────────────────────────
function M2Home({ dark }) {
  const t = dark ? HEARTH_DARK : HEARTH_LIGHT;
  const stats = [['Playing', 3, t.accent], ['Backlog', 28, t.accent3], ['Completed', 47, t.accent2], ['Hours', '1,340', t.ink]];
  return (
    <MFrame t={t} height={1180} tab="Home">
      <MHeader t={t} title="Good evening" right={<Avatar name={ME.display} size={40} radius={12} />} />
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 26 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {stats.map(([k, v, c]) => (
            <div key={k} style={{ background: t.surface, borderRadius: 16, padding: 14, boxShadow: t.shadow }}>
              <div style={{ fontFamily: p2.display, fontSize: 26, fontWeight: 700, color: c === t.ink ? t.ink : c, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 12, color: t.muted, marginTop: 4 }}>{k}</div>
            </div>
          ))}
        </div>
        <div>
          <SectionHead t={t} title="Currently playing" size={21} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {NOW_PLAYING.map(g => (
              <div key={g.title} style={{ display: 'flex', gap: 14, alignItems: 'center', background: t.surface, borderRadius: 16, padding: 10, boxShadow: t.shadow }}>
                <Cover title={g.title} width={56} height={74} radius={10} showTitle={false} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: p2.display, fontWeight: 700, fontSize: 16 }}>{g.title}</div>
                  <div style={{ fontSize: 12, color: t.muted }}>{g.platform} · {g.lastPlayed}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionHead t={t} title="Your Top 10" size={21} right={<span style={{ fontSize: 13, fontWeight: 600, color: t.accent }}>Profile →</span>} />
          <div style={{ display: 'flex', gap: 10, marginRight: -20, overflow: 'hidden' }}>
            {TOP_10.slice(0, 5).map(g => (
              <div key={g.rank} style={{ flex: '0 0 104px' }}>
                <div style={{ position: 'relative', height: 138, borderRadius: 12, overflow: 'hidden' }}>
                  <Cover title={g.title} radius={0} showTitle={false} tint={g.rank <= 3 ? 'warm' : undefined} />
                  <RankBadge rank={g.rank} t={t} size={24} />
                </div>
                <div style={{ marginTop: 6, fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <SectionHead t={t} title="Up next" size={21} right={<span style={{ fontSize: 13, fontWeight: 600, color: t.accent }}>Backlog →</span>} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10 }}>
            {BACKLOG.slice(0, 3).map(g => <div key={g.title} style={{ height: 140 }}><Cover title={g.title} radius={12} titleSize={13} /></div>)}
          </div>
        </div>
      </div>
    </MFrame>
  );
}

// ─── Mobile Library ─────────────────────────────────────────────────
function M2Library({ dark }) {
  const t = dark ? HEARTH_DARK : HEARTH_LIGHT;
  const sc = { Playing: t.accent, Completed: t.accent2, Backlog: t.accent3, 'On-Hold': '#a08bb5', Dropped: t.muted };
  const games = LIBRARY.slice(8, 16);
  return (
    <MFrame t={t} height={1080} tab="Library">
      <MHeader t={t} title="Library" right={<span style={{ fontSize: 13, color: t.muted }}>{LIBRARY.length} games</span>} />
      <div style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 48, padding: '0 16px', background: t.surface, borderRadius: 14, boxShadow: t.shadow }}>
          <Icon name="search" size={16} color={t.muted} /><span style={{ color: t.muted }}>Find a game…</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '14px 20px', overflow: 'hidden' }}>
        {['All', ...STATUSES].map((s, i) => (
          <span key={s} style={{ flex: 'none', height: 38, padding: '0 16px', display: 'flex', alignItems: 'center', borderRadius: 999, fontSize: 13, fontWeight: 600, background: i === 0 ? t.ink : t.surface, color: i === 0 ? t.bg : t.ink, boxShadow: i === 0 ? 'none' : t.shadow }}>{s}</span>
        ))}
      </div>
      <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {games.map(g => (
          <div key={g.title} style={{ background: t.surface, borderRadius: 16, padding: 8, boxShadow: t.shadow }}>
            <div style={{ position: 'relative', height: 200 }}>
              <Cover title={g.title} radius={10} showTitle={false} />
              <span style={{ position: 'absolute', left: 8, bottom: 8, padding: '3px 9px', borderRadius: 999, background: sc[g.status], color: '#fff', fontSize: 11, fontWeight: 700 }}>{g.status}</span>
            </div>
            <div style={{ padding: '8px 4px 2px', fontFamily: p2.display, fontWeight: 700, fontSize: 14, lineHeight: 1.15 }}>{g.title}</div>
            <div style={{ padding: '0 4px', fontSize: 12, color: t.muted }}>{g.platform}</div>
          </div>
        ))}
      </div>
    </MFrame>
  );
}

// ─── Mobile Profile ─────────────────────────────────────────────────
function M2Profile({ dark }) {
  const t = dark ? HEARTH_DARK : HEARTH_LIGHT;
  const one = TOP_10[0];
  return (
    <MFrame t={t} height={1640} tab="Profile">
      <div style={{ padding: '4px 20px 0', display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div style={{ background: t.surface, borderRadius: 24, padding: 20, boxShadow: t.shadow }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <Avatar name={ME.display} size={72} radius={22} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: p2.display, fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{ME.display}</div>
              <div style={{ fontFamily: p2.mono, fontSize: 12, color: t.muted }}>@{ME.username}</div>
            </div>
          </div>
          <p style={{ margin: '12px 0', color: t.muted, fontSize: 14 }}>{ME.bio}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}><BLive t={t} label="Now playing" /><span style={{ fontWeight: 600, fontSize: 13 }}>Baldur's Gate 3</span></div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['twitch', 'discord', 'tiktok', 'steam'].map(p => (
              <div key={p} style={{ width: 44, height: 44, borderRadius: 12, background: LINK_PLATFORMS[p].color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PlatformIcon name={p} size={20} color="#fff" /></div>
            ))}
            <button style={{ ...bBtnGhost(t), marginLeft: 'auto', height: 44, background: t.bg, boxShadow: 'none' }}>Edit</button>
          </div>
        </div>

        <section>
          <SectionHead t={t} size={22} title="All-Time Top 10" right={<button style={{ ...bBtnGhost(t), height: 40 }}>Edit</button>} />
          <div style={{ position: 'relative', height: 220, borderRadius: 18, overflow: 'hidden', boxShadow: t.shadowRaised }}>
            <Cover title={one.title} radius={0} showTitle={false} tint="warm" />
            <RankBadge rank={1} t={t} size={44} />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '40px 16px 14px', background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', color: '#fff' }}>
              <div style={{ fontFamily: p2.display, fontWeight: 700, fontSize: 22 }}>{one.title}</div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>{one.genre} · {one.year}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10, marginTop: 10 }}>
            {TOP_10.slice(1).map(g => (
              <div key={g.rank}>
                <div style={{ position: 'relative', aspectRatio: '3 / 4', borderRadius: 12, overflow: 'hidden' }}>
                  <Cover title={g.title} radius={0} showTitle={false} tint={g.rank <= 3 ? 'warm' : undefined} />
                  <RankBadge rank={g.rank} t={t} size={26} />
                </div>
                <div style={{ marginTop: 5, fontSize: 12, fontWeight: 600, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHead t={t} size={22} title="Best of 2026" right={<YearPill t={t} />} />
          <div style={{ display: 'flex', gap: 10, marginRight: -20, overflow: 'hidden' }}>
            {YEAR_TOP.slice(0, 5).map(g => (
              <div key={g.rank} style={{ flex: '0 0 96px' }}>
                <div style={{ position: 'relative', height: 128, borderRadius: 12, overflow: 'hidden' }}>
                  <Cover title={g.title} radius={0} showTitle={false} />
                  <RankBadge rank={g.rank} t={t} size={22} />
                </div>
                <div style={{ marginTop: 5, fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MFrame>
  );
}

// ─── Mobile Top 10 edit list ────────────────────────────────────────
function M2Edit({ dark, sheet }) {
  const t = dark ? HEARTH_DARK : HEARTH_LIGHT;
  const rows = TOP_10.slice(0, 7);
  const overlay = sheet && (
    <>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(28,24,21,0.45)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 560, background: t.bg, borderRadius: '28px 28px 0 0', padding: '10px 20px 24px', boxShadow: '0 -12px 40px rgba(0,0,0,0.2)' }}>
        <div style={{ width: 40, height: 5, borderRadius: 3, background: t.faint, margin: '0 auto 16px' }} />
        <div style={{ fontFamily: p2.display, fontWeight: 700, fontSize: 22, marginBottom: 12 }}>Add to slot #8</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, height: 48, padding: '0 16px', background: t.surface, borderRadius: 14, boxShadow: t.shadow, marginBottom: 12 }}>
          <Icon name="search" size={16} color={t.muted} /><span style={{ color: t.ink }}>Pyr</span><span style={{ width: 1.5, height: 20, background: t.accent }} />
        </div>
        {['Pyre', 'Pyre: Soundtrack Edition', 'Inside', 'Cocoon', 'Tunic'].slice(0, 4).map((title, i) => (
          <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 64, padding: '8px 0', borderBottom: `1px solid ${t.rule}` }}>
            <Cover title={title} width={40} height={54} radius={8} showTitle={false} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{title}</div>
              <div style={{ fontSize: 12, color: t.muted }}>{i === 1 ? 'Not in your library · adds it as Completed' : 'Completed'}</div>
            </div>
            <button style={{ ...bBtnAccent(t), height: 40, padding: '0 16px' }}>Add</button>
          </div>
        ))}
      </div>
    </>
  );
  return (
    <MFrame t={t} overlay={overlay}>
      <div style={{ padding: '4px 12px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button style={{ height: 44, padding: '0 12px', border: 'none', background: 'transparent', color: t.muted, fontSize: 15, fontFamily: p2.body }}>Cancel</button>
        <div style={{ fontFamily: p2.display, fontWeight: 700, fontSize: 17 }}>All-Time Top 10</div>
        <button style={{ ...bBtnAccent(t), height: 40 }}>Done</button>
      </div>
      <div style={{ padding: '0 16px 10px', fontSize: 13, color: t.muted, textAlign: 'center' }}>Hold and drag ≡ to reorder</div>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rows.map((g, i) => {
          const lifted = !sheet && i === 2;
          return (
            <div key={g.rank} style={{ display: 'flex', alignItems: 'center', gap: 12, height: 62, padding: '0 6px 0 12px', background: t.surface, borderRadius: 16, boxShadow: lifted ? '0 16px 32px rgba(0,0,0,0.2)' : t.shadow, transform: lifted ? 'scale(1.03)' : 'none', outline: lifted ? `2px solid ${t.accent}` : 'none' }}>
              <span style={{ width: 22, fontFamily: p2.display, fontWeight: 800, fontSize: 18, color: i < 3 ? t.accent : t.muted }}>{i + 1}</span>
              <Cover title={g.title} width={40} height={52} radius={8} showTitle={false} tint={i < 3 ? 'warm' : undefined} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.title}</div>
                <div style={{ fontSize: 12, color: t.muted }}>{g.genre}</div>
              </div>
              <div style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="x" size={16} color={t.muted} /></div>
              <div style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="drag" size={20} color={t.ink} /></div>
            </div>
          );
        })}
        {[8, 9, 10].map(n => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12, height: 52, padding: '0 12px', borderRadius: 16, border: `2px dashed ${t.faint}`, color: t.muted }}>
            <span style={{ width: 22, fontFamily: p2.display, fontWeight: 800, fontSize: 18 }}>{n}</span>
            <Icon name="plus" size={16} color={t.accent} strokeWidth={2.5} />
            <span style={{ fontWeight: 600, color: t.accent }}>Add a game</span>
          </div>
        ))}
      </div>
    </MFrame>
  );
}

// ─── Arrange profile (widgets) ──────────────────────────────────────
function WidgetPreview({ kind, t, small }) {
  const h = small ? 44 : 64;
  if (kind === 'top10' || kind === 'year') {
    const list = kind === 'top10' ? TOP_10 : YEAR_TOP;
    return <div style={{ display: 'flex', gap: 5 }}>{list.slice(0, small ? 5 : 10).map(g => <div key={g.rank} style={{ flex: 1, height: h }}><Cover title={g.title} radius={5} showTitle={false} tint={kind === 'top10' && g.rank <= 3 ? 'warm' : undefined} /></div>)}</div>;
  }
  if (kind === 'now') return <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}><Cover title="Baldur's Gate 3" width={h * 0.75} height={h} radius={6} showTitle={false} /><div><BLive t={t} label="Now playing" /><div style={{ fontWeight: 600, fontSize: 13, marginTop: 4 }}>Baldur's Gate 3</div></div></div>;
  if (kind === 'links') return <div style={{ display: 'flex', gap: 6 }}>{['twitch', 'discord', 'tiktok', 'steam'].map(p => <div key={p} style={{ width: 30, height: 30, borderRadius: 8, background: LINK_PLATFORMS[p].color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PlatformIcon name={p} size={15} color="#fff" /></div>)}</div>;
  if (kind === 'wall') return <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>{['marisol', 'kev_42'].map(u => <div key={u} style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Avatar name={u} size={22} /><div style={{ height: 8, borderRadius: 4, background: t.rule, flex: 1 }} /></div>)}</div>;
  return null;
}

const WIDGETS = [
  { kind: 'top10', name: 'All-Time Top 10', size: 'Full' },
  { kind: 'now', name: 'Now Playing', size: 'Half' },
  { kind: 'links', name: 'Links', size: 'Half' },
  { kind: 'year', name: 'Best of 2026', size: 'Full' },
  { kind: 'wall', name: 'Comment wall', size: 'Full', soon: true },
];
const HIDDEN_WIDGETS = [
  { name: 'Recently completed', desc: 'Your last 4 finished games' },
  { name: 'Stats', desc: 'Completed, hours, backlog size' },
  { name: 'Currently playing', desc: 'Everything marked Playing' },
];

function WidgetCard({ w, t, lifted }) {
  return (
    <div style={{
      gridColumn: w.size === 'Full' ? 'span 2' : 'span 1', background: t.surface, borderRadius: 18, padding: 16,
      boxShadow: lifted ? '0 24px 48px rgba(0,0,0,0.22)' : t.shadow, outline: lifted ? `3px solid ${t.accent}` : 'none',
      transform: lifted ? 'rotate(-1deg) translateY(-6px)' : 'none', display: 'flex', flexDirection: 'column', gap: 12, cursor: 'grab',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Icon name="drag" size={18} color={t.ink} />
        <div style={{ flex: 1, fontFamily: p2.display, fontWeight: 700, fontSize: 16 }}>{w.name}{w.soon && <span style={{ marginLeft: 8, fontFamily: p2.body, fontSize: 11, fontWeight: 600, color: t.muted }}>coming with friends</span>}</div>
        <div style={{ display: 'flex', padding: 3, borderRadius: 9, background: t.bg }}>
          {['Half', 'Full'].map(s => <span key={s} style={{ padding: '4px 10px', borderRadius: 7, fontSize: 11, fontWeight: 600, background: w.size === s ? t.surface : 'transparent', color: w.size === s ? t.ink : t.muted, boxShadow: w.size === s ? t.shadow : 'none' }}>{s}</span>)}
        </div>
        <div title="Hide" style={{ width: 30, height: 30, borderRadius: 9, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="x" size={13} color={t.muted} /></div>
      </div>
      <WidgetPreview kind={w.kind} t={t} />
    </div>
  );
}

function P2Arrange({ dark }) {
  const t = dark ? HEARTH_DARK : HEARTH_LIGHT;
  return (
    <BFrame dark={dark} height={900}>
      <BNav t={t} active="Profile" />
      <div style={{ margin: '4px 36px 0', padding: '14px 20px', borderRadius: 16, background: t.ink, color: t.bg, display: 'flex', alignItems: 'center', gap: 14 }}>
        <Icon name="grid" size={18} color={t.bg} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: p2.display, fontWeight: 700, fontSize: 17 }}>Arranging your profile</div>
          <div style={{ fontSize: 13, opacity: 0.75 }}>Drag sections to reorder. Set each to half or full width. Hide what you don't want.</div>
        </div>
        <button style={{ ...bBtnGhost(t), background: 'transparent', color: t.bg, boxShadow: 'none' }}>Cancel</button>
        <button style={bBtnAccent(t)}><Icon name="check" size={14} color="#fff" strokeWidth={2.5} /> Done</button>
      </div>
      <div style={{ padding: '24px 36px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 300px', gap: 28 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 18, background: t.surface, opacity: 0.7 }}>
            <Avatar name={ME.display} size={40} radius={12} />
            <div style={{ flex: 1, fontWeight: 600 }}>Profile header</div>
            <span style={{ fontSize: 12, color: t.muted }}>Always on top</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 14 }}>
            <WidgetCard w={WIDGETS[3]} t={t} lifted />
            <WidgetCard w={WIDGETS[0]} t={t} />
            <WidgetCard w={WIDGETS[1]} t={t} />
            <WidgetCard w={WIDGETS[2]} t={t} />
            <WidgetCard w={WIDGETS[4]} t={t} />
          </div>
        </div>
        <aside style={{ background: t.surface, borderRadius: 20, padding: 18, boxShadow: t.shadow, alignSelf: 'start', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontFamily: p2.display, fontWeight: 700, fontSize: 18 }}>Hidden sections</div>
          <div style={{ fontSize: 13, color: t.muted, marginTop: -4 }}>Add them back any time.</div>
          {HIDDEN_WIDGETS.map(w => (
            <div key={w.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, borderRadius: 14, background: t.bg }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{w.name}</div>
                <div style={{ fontSize: 11, color: t.muted }}>{w.desc}</div>
              </div>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: t.blush, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="plus" size={15} color={t.accent} strokeWidth={2.5} /></div>
            </div>
          ))}
        </aside>
      </div>
    </BFrame>
  );
}

function M2Arrange({ dark }) {
  const t = dark ? HEARTH_DARK : HEARTH_LIGHT;
  const order = [WIDGETS[3], WIDGETS[0], WIDGETS[1], WIDGETS[2], WIDGETS[4]];
  const Toggle = ({ on }) => <div style={{ width: 44, height: 26, borderRadius: 13, background: on ? t.accent2 : t.faint, position: 'relative', flex: 'none' }}><div style={{ position: 'absolute', top: 3, left: on ? 21 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff' }} /></div>;
  return (
    <MFrame t={t}>
      <div style={{ padding: '4px 12px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button style={{ height: 44, padding: '0 12px', border: 'none', background: 'transparent', color: t.muted, fontSize: 15, fontFamily: p2.body }}>Cancel</button>
        <div style={{ fontFamily: p2.display, fontWeight: 700, fontSize: 17 }}>Arrange profile</div>
        <button style={{ ...bBtnAccent(t), height: 40 }}>Done</button>
      </div>
      <div style={{ padding: '0 16px 12px', fontSize: 13, color: t.muted, textAlign: 'center' }}>Hold and drag ≡ to move a section</div>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {order.map((w, i) => (
          <div key={w.name} style={{ background: t.surface, borderRadius: 18, padding: '12px 8px 12px 14px', boxShadow: i === 0 ? '0 16px 32px rgba(0,0,0,0.2)' : t.shadow, outline: i === 0 ? `2px solid ${t.accent}` : 'none', transform: i === 0 ? 'scale(1.03)' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 44 }}>
              <div style={{ flex: 1, fontWeight: 600 }}>{w.name}{w.soon && <div style={{ fontSize: 11, color: t.muted, fontWeight: 500 }}>Coming with friends</div>}</div>
              <Toggle on={!w.soon} />
              <div style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="drag" size={20} color={t.ink} /></div>
            </div>
            {(w.kind === 'top10' || w.kind === 'year') && <div style={{ paddingRight: 8, marginTop: 4 }}><WidgetPreview kind={w.kind} t={t} small /></div>}
          </div>
        ))}
        <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 8 }}>Hidden</div>
        {HIDDEN_WIDGETS.slice(0, 2).map(w => (
          <div key={w.name} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 56, padding: '0 14px', borderRadius: 16, border: `2px dashed ${t.faint}` }}>
            <div style={{ flex: 1, fontWeight: 600, color: t.muted }}>{w.name}</div>
            <Toggle on={false} />
          </div>
        ))}
      </div>
    </MFrame>
  );
}

function P2App() {
  const [dark, setDark] = React.useState(false);
  const tg = (on) => ({ padding: '7px 12px', borderRadius: 999, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 500, background: on ? '#2a241d' : 'transparent', color: on ? '#fbf8f1' : '#7a6f5e' });
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000, display: 'flex', gap: 4, padding: 4, borderRadius: 999, background: '#fbf8f1', boxShadow: '0 4px 16px rgba(42,36,29,0.18)' }}>
        <button style={tg(!dark)} onClick={() => setDark(false)}>Light</button>
        <button style={tg(dark)} onClick={() => setDark(true)}>Dark</button>
      </div>
      <DesignCanvas>
        <DCSection id="top10" title="Top 10 · MySpace-style" subtitle="Two lists on every profile: All-Time Top 10 and Best of [year]. Edit in place, or from any game.">
          <DCArtboard id="t-profile" label="T1 · Profile with both lists" width={1280} height={1440}><P2Profile dark={dark} /></DCArtboard>
          <DCArtboard id="t-edit" label="T2 · Edit mode" width={1280} height={960}><P2Edit dark={dark} /></DCArtboard>
          <DCArtboard id="t-modal" label="T3 · Add from Edit Game" width={720} height={560}><P2Modal dark={dark} /></DCArtboard>
          <DCArtboard id="t-arrange" label="T4 · Arrange profile (widgets)" width={1280} height={900}><P2Arrange dark={dark} /></DCArtboard>
        </DCSection>
        <DCSection id="mobile" title="Mobile" subtitle="Bottom tab bar, one column, 44px+ touch targets. Friends tab is dimmed until that phase ships.">
          <DCArtboard id="m-home" label="M1 · Home" width={390} height={1180}><M2Home dark={dark} /></DCArtboard>
          <DCArtboard id="m-library" label="M2 · Library" width={390} height={1080}><M2Library dark={dark} /></DCArtboard>
          <DCArtboard id="m-profile" label="M3 · Profile" width={390} height={1640}><M2Profile dark={dark} /></DCArtboard>
          <DCArtboard id="m-edit" label="M4 · Edit Top 10" width={390} height={844}><M2Edit dark={dark} /></DCArtboard>
          <DCArtboard id="m-add" label="M5 · Add to slot" width={390} height={844}><M2Edit dark={dark} sheet /></DCArtboard>
          <DCArtboard id="m-arrange" label="M6 · Arrange profile" width={390} height={844}><M2Arrange dark={dark} /></DCArtboard>
        </DCSection>
      </DesignCanvas>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<P2App />);
