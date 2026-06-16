// Sections: About / Skills / Education / Contact

// ─── Reveal-on-scroll hook ────────────────────────────────────────────────
// Floating cybersec-themed decorative glyphs that drift in section backgrounds
function FloatingGlyphs({ glyphs = ["01", "$", "</>", "#", "AES", "sudo"], count = 8 }) {
  const seeds = React.useMemo(() => Array.from({ length: count }, (_, i) => ({
    x: 4 + Math.random() * 92,
    y: 6 + Math.random() * 88,
    d: 14 + Math.random() * 18,
    g: glyphs[i % glyphs.length],
    size: 10 + Math.random() * 18,
    delay: Math.random() * 6,
    rot: (Math.random() - 0.5) * 30,
  })), [count, glyphs.join("|")]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {seeds.map((s, i) => (
        <span key={i}
              className="absolute font-mono text-[var(--accent)]/25 select-none"
              style={{
                left: s.x + "%", top: s.y + "%",
                fontSize: s.size + "px",
                transform: `rotate(${s.rot}deg)`,
                animation: `glyph-drift ${s.d}s ease-in-out ${s.delay}s infinite alternate`,
                textShadow: "0 0 12px color-mix(in oklab, var(--accent) 40%, transparent)"
              }}>{s.g}</span>
      ))}
      <style>{`
        @keyframes glyph-drift {
          0%   { transform: translate(0,0) rotate(0deg); opacity: 0.15; }
          50%  { opacity: 0.35; }
          100% { transform: translate(28px, -36px) rotate(8deg); opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}

// Brand-glyph chips: tiny stylised logos for vibe-coding tools, rendered as a floating row.
function VibeStack({ items, className = "" }) {
  return (
    <div className={"flex flex-wrap items-center gap-2 " + className}>
      {items.map((it, i) => (
        <span key={i}
              className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--p2)]/60 bg-[var(--p1)]/60 backdrop-blur-sm px-2.5 py-1 font-mono text-[11px] text-[var(--ink)]/85 hover:border-[var(--accent)]/60 hover:text-[var(--accent)] transition-colors"
              style={{ animation: `chip-bob ${4 + i * 0.3}s ease-in-out ${i * 0.15}s infinite alternate` }}>
          <span className="grid h-4 w-4 place-items-center text-[var(--accent)]">{it.glyph}</span>
          {it.name}
        </span>
      ))}
      <style>{`
        @keyframes chip-bob {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
}

const VIBE_TOOLS = [
  { name: "Cursor",       glyph: <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M3 2l10 6-4 1-1 4-5-11z"/></svg> },
  { name: "Claude",       glyph: <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M8 1l1.8 5L15 8l-5.2 2L8 15l-1.8-5L1 8l5.2-2L8 1z"/></svg> },
  { name: "Next.js",      glyph: <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="8" cy="8" r="7"/><path d="M5 4v8M11 12V8"/></svg> },
  { name: "React",        glyph: <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.4"><ellipse cx="8" cy="8" rx="7" ry="3"/><ellipse cx="8" cy="8" rx="7" ry="3" transform="rotate(60 8 8)"/><ellipse cx="8" cy="8" rx="7" ry="3" transform="rotate(120 8 8)"/><circle cx="8" cy="8" r="1.2" fill="currentColor"/></svg> },
  { name: "Tailwind",     glyph: <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M2 7c1-2 3-2 4-1s2 1 3 0M7 10c1-2 3-2 4-1s2 1 3 0"/></svg> },
  { name: "shadcn/ui",    glyph: <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 13L13 3M7 13l6-6"/></svg> },
  { name: "Framer Motion",glyph: <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M3 2h10v4H7l6 4v4H3v-4h6L3 6z"/></svg> },
  { name: "Vercel",       glyph: <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M8 2l7 12H1z"/></svg> },
  { name: "Supabase",     glyph: <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M8 1L14 8H10v7L2 8h4z"/></svg> },
  { name: "TypeScript",   glyph: <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><rect width="16" height="16" rx="2"/><text x="8" y="12" textAnchor="middle" fontFamily="monospace" fontWeight="700" fontSize="9" fill="#1a130c">TS</text></svg> },
  { name: "v0",           glyph: <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><text x="8" y="12" textAnchor="middle" fontFamily="monospace" fontWeight="700" fontSize="10">v0</text></svg> },
  { name: "Bolt",         glyph: <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor"><path d="M9 1L3 9h4l-1 6 6-8H8z"/></svg> },
];

// ─── Reveal-on-scroll hook ──────────────────────────────────────
function useReveal() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) e.target.classList.add("in"); },
      { threshold: 0.18 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return ref;
}

function SectionHeader({ chapter, title, kicker }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal mx-auto max-w-6xl px-6">
      <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-[var(--ink-soft)]">
        <span className="inline-block h-px w-8 bg-[var(--accent)]"/>
        <span>{chapter}</span>
      </div>
      <h2 className="font-display mt-4 text-[clamp(40px,6.5vw,84px)] leading-[0.95] tracking-[-0.02em] text-[var(--ink)]">
        {title}
      </h2>
      {kicker && <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[var(--ink)]/75">{kicker}</p>}
    </div>
  );
}

// ─── About ───────────────────────────────────────────────────────────────
function About() {
  const ref = useReveal();
  const ref2 = useReveal();
  return (
    <section className="dense-pad relative" data-screen-label="02 About">
      <FloatingGlyphs glyphs={["sudo", "npm i", "useState", "AES", "const", "::1", "<Suspense/>", "</>"]} count={12}/>
      <SectionHeader
        chapter="Chapter II — Two Modes, One Person"
        title={<>Vibe coder by day,<br/><em className="italic text-[var(--accent)]">pentester</em> by night.</>}
        kicker="Same brain, two playgrounds: one where I ship things, and one where I try to break them. Both keep me honest."
      />

      {/* Part 01 — Vibe Coder */}
      <div ref={ref} className="reveal mx-auto mt-14 grid max-w-6xl gap-12 px-6 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
            <IcRocket size={12}/> Part 01 · The Vibe Coder
          </div>
          <h3 className="mt-5 font-display text-[clamp(28px,4vw,42px)] leading-[1.05] tracking-tight text-[var(--ink)]">
            I prompt fluently. I read the diff <em className="italic text-[var(--accent)]">before</em> I commit.
          </h3>
          <div className="mt-6 space-y-4 text-[16px] leading-[1.7] text-[var(--ink)]/85">
            <p>
              By day I build small, opinionated web things. My happy stack is Next.js + Tailwind + shadcn/ui,
              animated with Framer Motion, deployed to Vercel before the coffee finishes brewing.
            </p>
            <p>
              I'm a heavy AI-pair coder — Cursor and Claude live next to my editor, and I treat prompts
              like specs: tight, testable, and worth revising. I scaffold with v0 or Bolt, then dig in by
              hand where the craft actually lives.
            </p>
            <p className="text-[var(--ink-soft)] italic font-display text-[17px]">
              &ldquo;Ship the rough cut. Refactor the seams. Keep the soul.&rdquo;
            </p>
          </div>
          <VibeStack className="mt-6" items={VIBE_TOOLS.slice(0, 8)}/>
        </div>

        {/* Polaroid stack — vibe coder side */}
        <div className="relative h-[480px] scene">
          <Polaroid r="-6deg" t="10px"  l="10px"  scene="cursor"   caption="cursor · friday 2am"/>
          <Polaroid r="5deg"  t="110px" l="150px" scene="vercel"   caption="vercel · deployed ✨"/>
          <Polaroid r="-3deg" t="240px" l="40px"  scene="react"    caption="react · sunday lab"/>
          <Polaroid r="7deg"  t="300px" l="190px" scene="components" caption="shadcn · component lab"/>
        </div>
      </div>

      {/* Part 02 — Cybersecurity */}
      <div ref={ref2} className="reveal mx-auto mt-24 grid max-w-6xl gap-12 px-6 md:grid-cols-[0.9fr_1.1fr]">
        {/* Polaroid stack — cyber side */}
        <div className="relative h-[480px] scene order-2 md:order-1">
          <Polaroid r="-7deg" t="10px"  l="10px"  scene="terminal" caption="3:14am · root@kali"/>
          <Polaroid r="5deg"  t="110px" l="150px" scene="lock"     caption="OWASP A07 caught"/>
          <Polaroid r="-3deg" t="240px" l="30px"  scene="packet"   caption="Wireshark, midnight"/>
          <Polaroid r="8deg"  t="300px" l="190px" scene="bug"      caption="CVE-2025-¿¿¿¿"/>
        </div>

        <div className="order-1 md:order-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
            <IcShield size={12}/> Part 02 · The Pentester
          </div>
          <h3 className="mt-5 font-display text-[clamp(28px,4vw,42px)] leading-[1.05] tracking-tight text-[var(--ink)]">
            I trust nothing. I <em className="italic text-[var(--accent)]">log</em> everything.
          </h3>
          <div className="mt-6 space-y-4 text-[16px] leading-[1.7] text-[var(--ink)]/85">
            <p>
              By night I switch tabs to Kali. Penetration testing at Drop Organization, vulnerability
              assessments at Tata STRIVE, OWASP labs and CTF challenges in between — BCA from Naran Lala
              College gave me the foundation, the late nights gave me the reflexes.
            </p>
            <p>
              I've found 15+ system and application vulnerabilities, dropped phishing susceptibility
              by 20%, and improved incident detection by 30% through patient log analysis. A good Wireshark
              capture is more thrilling than a true-crime podcast. Don't @ me.
            </p>
            <p className="text-[var(--ink-soft)] italic font-display text-[17px]">
              &ldquo;Trust no input. Log everything. Read the docs twice.&rdquo;
            </p>
          </div>
          <VibeStack className="mt-6" items={[
            { name: "Kali Linux",  glyph: <IcTerminal size={11}/> },
            { name: "Burp Suite",  glyph: <IcShield size={11}/> },
            { name: "Metasploit",  glyph: <IcSpark size={11}/> },
            { name: "Wireshark",   glyph: <IcSpark size={11}/> },
            { name: "Nmap",        glyph: <IcCompass size={11}/> },
            { name: "Splunk",      glyph: <IcSpark size={11}/> },
            { name: "OWASP Top 10",glyph: <IcLock size={11}/> },
            { name: "Nessus",      glyph: <IcShield size={11}/> },
          ]}/>
        </div>
      </div>

      {/* Stat marquee */}
      <div className="relative mt-20 overflow-hidden border-y border-[var(--p2)]/40 bg-[var(--p1)]/40 py-8">
        <div className="marquee-track flex w-max items-center gap-12 whitespace-nowrap">
          {[...Array(2)].flatMap((_, n) =>
            ["Mumbai-based", "15+ vulnerabilities patched", "Cursor + Claude duo",
             "Kali · Burp · Metasploit · Splunk", "Next.js · Tailwind · shadcn",
             "CTF nights, chai mornings", "OWASP Top 10 by heart", "sudo make me a sandwich",
             "Drop Org → Tata STRIVE alum", "Ships fast, breaks faster",
             "Speaks: English · Hindi · Marathi", "Will trade exploits for tea"]
            .map((s, i) => (
              <span key={n + "-" + i} className="flex items-center gap-12 font-display italic text-[28px] text-[var(--ink)]/70">
                {s}
                <span className="inline-block h-1 w-1 rounded-full bg-[var(--accent)]"/>
              </span>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

function Polaroid({ r, t, l, scene, caption }) {
  return (
    <div
      className="absolute w-[220px] rounded-[6px] bg-[#f1e7d0] p-2.5 pb-9 shadow-2xl shadow-black/40 float"
      style={{
        top: t, left: l, transform: `rotate(${r})`,
        boxShadow: "0 24px 48px rgba(0,0,0,.55), 0 0 0 1px rgba(0,0,0,.05)",
        animationDelay: `${Math.random() * 3}s`
      }}
      onMouseMove={(e) => {
        const rct = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rct.left) / rct.width - 0.5) * 12;
        const y = ((e.clientY - rct.top)  / rct.height - 0.5) * 12;
        e.currentTarget.style.transform = `rotate(${r}) rotateY(${x}deg) rotateX(${-y}deg) translateZ(20px)`;
      }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = `rotate(${r})`; }}
    >
      <div className="aspect-[4/5] w-full rounded-sm relative overflow-hidden bg-[#1a130c]">
        {scene === "terminal" && <SceneTerminal/>}
        {scene === "lock"     && <SceneLock/>}
        {scene === "packet"   && <ScenePacket/>}
        {scene === "bug"      && <SceneBug/>}
        {scene === "cursor"   && <SceneCursor/>}
        {scene === "vercel"   && <SceneVercel/>}
        {scene === "react"    && <SceneReact/>}
        {scene === "components" && <SceneComponents/>}
      </div>
      <div className="absolute bottom-2 left-0 right-0 text-center font-mono text-[10px] text-[#2d2418]/70">
        {caption}
      </div>
    </div>
  );
}

// ─── Playful cybersec polaroid scenes ───────────────────────────
function SceneTerminal() {
  return (
    <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #0f1a14 0%, #1a130c 100%)" }}>
      <div className="absolute inset-2 rounded-[3px] bg-black/70 border border-[#3a5a3a]/40 overflow-hidden" style={{ boxShadow: "inset 0 0 20px rgba(80,200,120,0.15)" }}>
        <div className="flex items-center gap-1 px-1.5 py-1 border-b border-[#3a5a3a]/40">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b6b]"/>
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffd166]"/>
          <span className="h-1.5 w-1.5 rounded-full bg-[#06d6a0]"/>
          <span className="ml-auto font-mono text-[6px] text-[#83e7a8]/60">~/exploits</span>
        </div>
        <div className="p-1.5 font-mono text-[7px] leading-[1.4] text-[#83e7a8]">
          <div>$ nmap -sS 10.0.0.0/24</div>
          <div className="text-[#83e7a8]/60">scanning 256 hosts...</div>
          <div>$ msfconsole</div>
          <div className="text-[#ffd166]">[*] Starting Metasploit</div>
          <div>msf6 &gt; use exploit/multi/<br/>&nbsp;&nbsp;handler</div>
          <div className="text-[#06d6a0]">[+] Session 1 opened</div>
          <div className="text-[#06d6a0]">[+] root@target#<span className="animate-pulse">█</span></div>
        </div>
      </div>
      {/* scanlines */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
           style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(131,231,168,0.3) 2px, rgba(131,231,168,0.3) 3px)" }}/>
    </div>
  );
}

function SceneLock() {
  return (
    <div className="absolute inset-0 grid place-items-center" style={{ background: "radial-gradient(circle at 50% 40%, #6b3a25 0%, #2a1b15 70%)" }}>
      <svg viewBox="0 0 120 150" className="w-[70%] drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]">
        <defs>
          <linearGradient id="lk-body" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0"   stopColor="#f4e2c4"/>
            <stop offset="0.5" stopColor="#c66a3a"/>
            <stop offset="1"   stopColor="#5a2818"/>
          </linearGradient>
          <linearGradient id="lk-shak" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#e8c89a"/>
            <stop offset="1" stopColor="#8d5a26"/>
          </linearGradient>
        </defs>
        {/* shackle */}
        <path d="M40 70 V46 a20 20 0 0 1 40 0 V70" fill="none" stroke="url(#lk-shak)" strokeWidth="10" strokeLinecap="round"/>
        {/* body */}
        <rect x="22" y="68" width="76" height="66" rx="10" fill="url(#lk-body)" stroke="#2a1b15" strokeWidth="2"/>
        <ellipse cx="60" cy="80" rx="24" ry="4" fill="rgba(255,255,255,0.25)"/>
        {/* keyhole */}
        <circle cx="60" cy="96" r="7" fill="#1a0e0a"/>
        <rect x="57" y="100" width="6" height="14" fill="#1a0e0a"/>
        <text x="60" y="126" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#1a0e0a" opacity="0.7">A07</text>
      </svg>
      <span className="absolute top-2 right-2 rounded-full bg-[#c66a3a] px-1.5 py-0.5 font-mono text-[7px] text-[#1a0e0a]">CRACKED ✓</span>
      {/* sparkles */}
      <span className="absolute top-4 left-3 text-[14px] text-[#f4e2c4]">✨</span>
      <span className="absolute bottom-6 right-5 text-[10px] text-[#f4e2c4]">✨</span>
    </div>
  );
}

function ScenePacket() {
  return (
    <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #0f1a2a 0%, #1a130c 100%)" }}>
      <svg viewBox="0 0 100 125" className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" stroke="#83e7a8" strokeWidth="0.2" opacity="0.2" fill="none"/>
          </pattern>
        </defs>
        <rect width="100" height="125" fill="url(#grid)"/>
        {/* nodes */}
        <circle cx="20" cy="30" r="3" fill="#c66a3a">
          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="80" cy="50" r="3" fill="#c66a3a">
          <animate attributeName="r" values="3;5;3" dur="2.5s" begin="0.3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="50" cy="90" r="3" fill="#83e7a8"/>
        <circle cx="30" cy="75" r="2" fill="#e8c89a"/>
        <circle cx="70" cy="100" r="2" fill="#e8c89a"/>
        {/* paths with moving packets */}
        <path id="p1" d="M20 30 Q50 50 80 50" fill="none" stroke="#c66a3a" strokeWidth="0.5" strokeDasharray="2 2"/>
        <path id="p2" d="M80 50 Q50 70 50 90" fill="none" stroke="#c66a3a" strokeWidth="0.5" strokeDasharray="2 2"/>
        <path id="p3" d="M50 90 Q40 80 30 75" fill="none" stroke="#83e7a8" strokeWidth="0.5" strokeDasharray="2 2"/>
        <circle r="1.5" fill="#e89055">
          <animateMotion dur="3s" repeatCount="indefinite"><mpath href="#p1"/></animateMotion>
        </circle>
        <circle r="1.5" fill="#e89055">
          <animateMotion dur="2.4s" begin="1s" repeatCount="indefinite"><mpath href="#p2"/></animateMotion>
        </circle>
        <circle r="1" fill="#83e7a8">
          <animateMotion dur="2s" repeatCount="indefinite"><mpath href="#p3"/></animateMotion>
        </circle>
        <text x="50" y="115" textAnchor="middle" fontFamily="monospace" fontSize="5" fill="#83e7a8" opacity="0.7">TCP 443 → OK</text>
      </svg>
    </div>
  );
}

function SceneBug() {
  return (
    <div className="absolute inset-0 grid place-items-center" style={{ background: "radial-gradient(circle at 50% 50%, #e89055 0%, #6b3a25 60%, #1a0e0a 100%)" }}>
      <svg viewBox="0 0 120 120" className="w-[70%]">
        {/* body */}
        <ellipse cx="60" cy="66" rx="22" ry="30" fill="#2a1b15" stroke="#1a0e0a" strokeWidth="1.5"/>
        <line x1="60" y1="40" x2="60" y2="96" stroke="#1a0e0a" strokeWidth="1"/>
        {/* highlight */}
        <ellipse cx="54" cy="54" rx="6" ry="10" fill="#6b3a25" opacity="0.6"/>
        {/* head */}
        <circle cx="60" cy="36" r="10" fill="#2a1b15" stroke="#1a0e0a" strokeWidth="1.5"/>
        {/* eyes */}
        <circle cx="56" cy="34" r="2.5" fill="#e89055">
          <animate attributeName="r" values="2.5;0.8;2.5" dur="3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="64" cy="34" r="2.5" fill="#e89055">
          <animate attributeName="r" values="2.5;0.8;2.5" dur="3s" repeatCount="indefinite"/>
        </circle>
        {/* antennae */}
        <path d="M54 28 Q48 18 44 14" fill="none" stroke="#1a0e0a" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M66 28 Q72 18 76 14" fill="none" stroke="#1a0e0a" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="44" cy="14" r="2" fill="#e89055"/>
        <circle cx="76" cy="14" r="2" fill="#e89055"/>
        {/* legs */}
        {[[36,56,18,52],[36,68,16,72],[36,82,18,92],[84,56,102,52],[84,68,104,72],[84,82,102,92]].map((c,i)=>(
          <line key={i} x1={c[0]} y1={c[1]} x2={c[2]} y2={c[3]} stroke="#1a0e0a" strokeWidth="1.5" strokeLinecap="round"/>
        ))}
      </svg>
      <span className="absolute top-2 left-2 rounded-sm bg-[#1a0e0a]/80 px-1.5 py-0.5 font-mono text-[7px] text-[#e89055]">SEV: HIGH</span>
      <span className="absolute bottom-2 right-2 font-mono text-[8px] text-[#f4e2c4]">caught one ✨</span>
    </div>
  );
}

// ─── Vibe-coder polaroid scenes ─────────────────────────────────────────
function SceneCursor() {
  return (
    <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #18171a 0%, #0d0c0e 100%)" }}>
      {/* sidebar */}
      <div className="absolute left-0 top-0 bottom-0 w-[18%] bg-black/40 border-r border-white/10"/>
      <div className="absolute left-1 top-2 flex flex-col gap-1">
        <span className="h-1 w-3 rounded-sm bg-[#e89055]/80"/>
        <span className="h-1 w-2 rounded-sm bg-white/30"/>
        <span className="h-1 w-3 rounded-sm bg-white/30"/>
        <span className="h-1 w-2.5 rounded-sm bg-white/30"/>
      </div>
      {/* code */}
      <div className="absolute left-[20%] right-[36%] top-2 font-mono text-[7px] leading-[1.5]">
        <div className="text-[#7c87a3]">// app/page.tsx</div>
        <div><span className="text-[#c084fc]">export</span> <span className="text-[#c084fc]">default</span> <span className="text-[#fbbf24]">function</span> <span className="text-[#60a5fa]">Page</span>() {`{`}</div>
        <div className="pl-2"><span className="text-[#c084fc]">return</span> &lt;<span className="text-[#f87171]">main</span>&gt;</div>
        <div className="pl-3">&lt;<span className="text-[#f87171]">Hero</span> /&gt;</div>
        <div className="pl-3 bg-[#e89055]/15 rounded-sm">&lt;<span className="text-[#f87171]">About</span> /&gt;<span className="animate-pulse">▌</span></div>
        <div className="pl-3">&lt;<span className="text-[#f87171]">Footer</span> /&gt;</div>
        <div className="pl-2">&lt;/<span className="text-[#f87171]">main</span>&gt;</div>
        <div>{`}`}</div>
      </div>
      {/* AI chat panel */}
      <div className="absolute right-1 top-2 bottom-2 w-[32%] rounded-[2px] bg-[#1a1820] border border-white/10 p-1">
        <div className="font-mono text-[6px] text-[#e89055]/80 mb-1">⌘ chat · claude</div>
        <div className="font-mono text-[6px] leading-[1.4] text-white/70 space-y-0.5">
          <div className="rounded-sm bg-white/5 p-0.5">add the about section</div>
          <div className="text-[#83e7a8]">→ sure, here:</div>
          <div className="text-white/50">+12 / -3</div>
          <div className="mt-1 inline-block rounded-sm bg-[#e89055] px-1 py-[1px] text-[5px] font-semibold text-black">accept ⏎</div>
        </div>
      </div>
      <span className="absolute bottom-1 left-2 font-mono text-[6px] text-white/40">cursor · sat 02:14</span>
    </div>
  );
}

function SceneVercel() {
  return (
    <div className="absolute inset-0 grid place-items-center" style={{ background: "linear-gradient(160deg, #f4e2c4 0%, #c66a3a 60%, #2a1b15 100%)" }}>
      {/* big triangle logo */}
      <svg viewBox="0 0 120 120" className="w-[58%] drop-shadow-[0_8px_18px_rgba(0,0,0,0.5)]">
        <defs>
          <linearGradient id="vc-tri" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#1a130c"/>
            <stop offset="1" stopColor="#3a2818"/>
          </linearGradient>
        </defs>
        <path d="M60 16 L106 96 L14 96 Z" fill="url(#vc-tri)" stroke="#1a130c" strokeWidth="2"/>
        <path d="M60 30 L96 92 L24 92 Z" fill="none" stroke="#f4e2c4" strokeWidth="0.5" opacity="0.4"/>
      </svg>
      {/* deploy badge */}
      <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full border border-[#1a130c]/40 bg-[#1a130c]/80 px-2 py-0.5 font-mono text-[7px] text-[#83e7a8]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#83e7a8] animate-pulse"/> ready
      </div>
      <div className="absolute bottom-3 left-3 right-3 rounded-sm bg-[#1a130c]/70 p-1 font-mono text-[6.5px] leading-[1.4] text-[#f4e2c4]">
        <div>$ vercel --prod</div>
        <div className="text-[#83e7a8]">✓ Build completed</div>
        <div className="text-[#83e7a8]">✓ Deployed in 14s</div>
      </div>
      <span className="absolute top-3 right-3 font-mono text-[7px] text-[#f4e2c4]">98 perf ✨</span>
    </div>
  );
}

function SceneReact() {
  return (
    <div className="absolute inset-0 grid place-items-center" style={{ background: "radial-gradient(circle at 50% 50%, #1a2a3a 0%, #0a1218 80%)" }}>
      <svg viewBox="0 0 120 120" className="w-[78%]">
        <g stroke="#61dafb" strokeWidth="1.5" fill="none">
          <ellipse cx="60" cy="60" rx="48" ry="18">
            <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="6s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="60" cy="60" rx="48" ry="18" transform="rotate(60 60 60)">
            <animateTransform attributeName="transform" type="rotate" from="60 60 60" to="420 60 60" dur="6s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="60" cy="60" rx="48" ry="18" transform="rotate(120 60 60)">
            <animateTransform attributeName="transform" type="rotate" from="120 60 60" to="480 60 60" dur="6s" repeatCount="indefinite"/>
          </ellipse>
        </g>
        <circle cx="60" cy="60" r="6" fill="#61dafb">
          <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite"/>
        </circle>
      </svg>
      {/* corner labels */}
      <span className="absolute top-2 left-2 rounded-sm bg-black/40 px-1.5 py-0.5 font-mono text-[7px] text-[#61dafb]">{"<App/>"}</span>
      <span className="absolute bottom-2 right-2 rounded-sm bg-black/40 px-1.5 py-0.5 font-mono text-[7px] text-[#e89055]">useEffect ✨</span>
      <span className="absolute bottom-2 left-2 font-mono text-[6px] text-white/40">react · sunday lab</span>
    </div>
  );
}

function ScenePrompt() {
  return null;
}

function SceneComponents() {
  return (
    <div className="absolute inset-0 p-2" style={{ background: "linear-gradient(160deg, #e9e2c8 0%, #7a7560 60%, #1a1f2a 100%)" }}>
      {/* Storybook-style component cards */}
      <div className="absolute inset-2 grid grid-rows-3 gap-1.5">
        {/* Button row */}
        <div className="rounded-[3px] bg-[#1a1f2a]/70 border border-[#d8b078]/30 p-1.5 flex items-center justify-between">
          <span className="font-mono text-[6px] text-[#d8b078]/70">&lt;Button/&gt;</span>
          <span className="flex items-center gap-1">
            <span className="rounded-sm bg-[#d8b078] px-1.5 py-0.5 text-[6px] font-semibold text-[#1a1f2a]">Primary</span>
            <span className="rounded-sm border border-[#d8b078] px-1.5 py-0.5 text-[6px] font-semibold text-[#d8b078]">Ghost</span>
          </span>
        </div>
        {/* Card row */}
        <div className="rounded-[3px] bg-[#1a1f2a]/70 border border-[#d8b078]/30 p-1.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[6px] text-[#d8b078]/70">&lt;Card/&gt;</span>
            <span className="font-mono text-[5px] text-[#83e7a8]">v1.2</span>
          </div>
          <div className="mt-1 flex gap-1">
            <div className="h-6 w-8 rounded-sm bg-gradient-to-br from-[#d8b078] to-[#7a7560]"/>
            <div className="flex-1">
              <div className="h-1 w-full rounded-sm bg-[#cbc3a3]/30 mb-0.5"/>
              <div className="h-1 w-3/4 rounded-sm bg-[#cbc3a3]/30 mb-0.5"/>
              <div className="h-1 w-1/2 rounded-sm bg-[#cbc3a3]/20"/>
            </div>
          </div>
        </div>
        {/* Toggle row */}
        <div className="rounded-[3px] bg-[#1a1f2a]/70 border border-[#d8b078]/30 p-1.5 flex items-center justify-between">
          <span className="font-mono text-[6px] text-[#d8b078]/70">&lt;Toggle/&gt;</span>
          <span className="flex items-center gap-1.5">
            <span className="relative h-2.5 w-5 rounded-full bg-[#d8b078]">
              <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-[#1a1f2a]"/>
            </span>
            <span className="font-mono text-[5px] text-[#83e7a8]">on</span>
          </span>
        </div>
      </div>
      {/* corner tags */}
      <span className="absolute -top-px right-2 rounded-b-sm bg-[#1a1f2a] px-1.5 py-0.5 font-mono text-[6px] text-[#d8b078]">shadcn/ui</span>
      <span className="absolute bottom-1 left-2 font-mono text-[6px] text-[#1a1f2a]/70">composing… ✨</span>
    </div>
  );
}

// ─── Skills ──────────────────────────────────────────────────────────────
function Skills() {
  const ref = useReveal();
  const groups = [
    { icon: <IcRocket size={20}/>,  title: "Vibe Coding", items: ["Cursor · Claude · Copilot duets", "AI-pair prompting & spec-writing", "v0 / Bolt / Lovable scaffolds", "shadcn/ui · Tailwind · Radix", "Next.js · React · TypeScript", "Vite · pnpm · Bun · Turbo", "Framer Motion · GSAP vibes", "Supabase · Vercel · Cloudflare", "Git surgery & quick PR reviews", "Refactoring with taste, not panic"] },
    { icon: <IcSpark size={20}/>,   title: "Offensive",  items: ["Kali Linux · Metasploit", "Burp Suite · Nmap · Nikto", "John the Ripper · WPScan", "OWASP Top 10 hunting", "VAPT · brute-force labs", "API security probing"] },
    { icon: <IcCompass size={20}/>, title: "Defensive",  items: ["Splunk · Nessus · Wireshark", "Threat & log analysis", "Incident response workflows", "Phishing simulation", "Digital forensics basics", "TCP/IP · DNS · Firewalls"] },
    { icon: <IcCode size={20}/>,    title: "Builder",    items: ["Python · C / C++ · Java", "JavaScript · PHP", "SQL · MongoDB", "Secure coding habits", "Report writing in plain English", "Bash scripts that I will not delete"] },
  ];
  return (
    <section className="dense-pad relative" data-screen-label="03 Skills">
      <FloatingGlyphs glyphs={["nmap", "npm i", "Cursor", "Claude", "Kali", "OWASP", "443", "</>"]} count={10}/>
      <SectionHeader
        chapter="Chapter III — The Toolkit"
        title={<>What I <em className="italic text-[var(--accent)]">carry</em> in the pack.</>}
        kicker="A small, sharp set of tools I refill as the terrain changes. Nothing exotic — just things I use almost every day."
      />
      <div ref={ref} className="reveal mx-auto mt-14 grid max-w-6xl gap-5 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g) => (
          <div key={g.title}
               className="tilt group relative rounded-2xl border border-[var(--p2)]/50 bg-[var(--p1)]/60 p-6 backdrop-blur-sm"
               onMouseMove={(e) => {
                 const r = e.currentTarget.getBoundingClientRect();
                 const x = (e.clientX - r.left) / r.width - 0.5;
                 const y = (e.clientY - r.top) / r.height - 0.5;
                 e.currentTarget.style.transform = `rotateX(${(-y * 6) * 1}deg) rotateY(${(x * 8) * 1}deg)`;
               }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = ""; }}
          >
            <div className="tilt-inner">
              <div className="flex items-center gap-3 text-[var(--accent)]">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10">
                  {g.icon}
                </span>
                <h3 className="font-display text-[22px] tracking-tight text-[var(--ink)]">{g.title}</h3>
              </div>
              <ul className="mt-5 space-y-2.5 text-[14px] text-[var(--ink)]/80">
                {g.items.map((it, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-2 inline-block h-1 w-3 bg-[var(--accent)]"/>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Education ───────────────────────────────────────────────────────────
function Education() {
  const ref = useReveal();
  const items = [
    { year: "2024 — ongoing", title: "Self-study — Vibe Coding & AI-pair dev", place: "Cursor · Claude · v0 · Bolt", desc: "Learning to prompt like a spec writer: Next.js + Tailwind + shadcn scaffolds, Framer Motion micro-interactions, Supabase + Vercel deploys, and the discipline to read every diff before I accept it." },
    { year: "Aug 2025 — Feb 2026", title: "Ethical Hacking Intern", place: "Drop Organization (Virtual)", desc: "Penetration testing with Nmap, Burp Suite, and Metasploit. Identified 15+ system and application vulnerabilities. Designed incident response workflows and recommended remediation strategies that reduced attack surface." },
    { year: "Dec 2024 — Mar 2025", title: "Cybersecurity Analyst Intern", place: "Tata STRIVE, Navsari", desc: "Executed vulnerability assessments with Wireshark, Kali Linux, and Splunk in lab environments. Improved incident detection by 30% via log analysis, and dropped phishing susceptibility by 20% with user-focused awareness work." },
    { year: "2021 — 2024", title: "BCA — Bachelor of Computer Applications", place: "Naran Lala College, Navsari", desc: "First taste of penetration testing, OWASP labs, and secure coding. Spent more time in CTFs than was strictly responsible." },
    { year: "2024 — 2025", title: "Certifications & Workshops", place: "Tata STRIVE · Drop Org · IBM", desc: "Cybersecurity Analyst Training (Tata STRIVE), Ethical Hacking workshop (Drop Org), IBM workshop on AI & Cloud Computing." },
  ];
  return (
    <section className="dense-pad relative" data-screen-label="04 Education">
      <FloatingGlyphs glyphs={["BCA", "2025", "Cursor", "Claude", "✓"]} count={7}/>
      <SectionHeader
        chapter="Chapter IV — Trail Markers"
        title={<>Where the <em className="italic text-[var(--accent)]">path</em> was trained.</>}
      />
      <div ref={ref} className="reveal mx-auto mt-14 max-w-4xl px-6">
        <ol className="relative border-s border-dashed border-[var(--p2)] ps-8">
          {items.map((it, i) => (
            <li key={i} className="relative mb-12 last:mb-0">
              <span className="absolute -start-[37px] top-1 grid h-6 w-6 place-items-center rounded-full bg-[var(--accent)] text-[10px] font-mono font-semibold text-[var(--p0)]">
                {String(items.length - i).padStart(2, "0")}
              </span>
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="font-mono text-[12px] tracking-widest text-[var(--accent)]">{it.year}</span>
                <h3 className="font-display text-[26px] leading-tight text-[var(--ink)]">{it.title}</h3>
              </div>
              <div className="mt-1 text-[14px] text-[var(--ink-soft)]">{it.place}</div>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--ink)]/75">{it.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}


// ─── Contact ─────────────────────────────────────────────────────────────
function Contact() {
  const ref = useReveal();
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", email: "", note: "" });
  const submit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <section className="dense-pad relative pb-40" data-screen-label="06 Contact">
      <FloatingGlyphs glyphs={["@", "//", "hi", "Cursor", "✓"]} count={7}/>
      <SectionHeader
        chapter="Chapter VI — Walk With Me"
        title={<>Send a <em className="italic text-[var(--accent)]">postcard</em>.</>}
        kicker="I read everything. I reply to most things within a day or two."
      />
      <div ref={ref} className="reveal mx-auto mt-14 grid max-w-6xl gap-10 px-6 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5">
          <ContactLine icon={<IcMail size={18}/>}     label="Email"    value="girirajbhanse4@gmail.com"/>
          <ContactLine icon={<IcLinkedin size={18}/>} label="LinkedIn" value="linkedin.com/in/giriraj-bhanse-160182250"/>
          <ContactLine icon={<IcPhone size={18}/>}    label="Phone"    value="+91 93070 59746"/>
        </div>

        <form onSubmit={submit}
              className="relative rounded-3xl border border-[var(--p2)]/60 bg-[var(--p1)]/50 p-6 md:p-8 shadow-2xl shadow-black/30">
          {sent ? (
            <div className="grid place-items-center py-16 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-[var(--accent)]/20 text-[var(--accent)]">
                <IcCheck size={28}/>
              </div>
              <h3 className="mt-5 font-display text-[28px] text-[var(--ink)]">On its way.</h3>
              <p className="mt-2 max-w-sm text-[14.5px] text-[var(--ink)]/75">
                Thanks for the postcard, {form.name || "friend"}. I'll write back soon.
              </p>
              <AbButton variant="ghost" size="sm" className="mt-5" onClick={() => { setSent(false); setForm({name:"",email:"",note:""}); }}>
                Send another
              </AbButton>
            </div>
          ) : (
            <div className="space-y-5">
              <Field label="Your name" required>
                <input required value={form.name} onChange={(e)=>setForm(f=>({...f, name:e.target.value}))}
                       className="field" placeholder="Ada Lovelace"/>
              </Field>
              <Field label="Email" required>
                <input required type="email" value={form.email} onChange={(e)=>setForm(f=>({...f, email:e.target.value}))}
                       className="field" placeholder="ada@analytical.engine"/>
              </Field>
              <Field label="Postcard">
                <textarea rows={5} value={form.note} onChange={(e)=>setForm(f=>({...f, note:e.target.value}))}
                          className="field min-h-[140px] resize-none"
                          placeholder="What's the weather like where you are?"/>
              </Field>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-[var(--ink-soft)]">Encrypted in transit.</span>
                <AbButton variant="solid" size="md" onClick={submit}>
                  Send postcard <IcArrow size={14}/>
                </AbButton>
              </div>
            </div>
          )}

          <style>{`
            .field {
              width: 100%;
              background: transparent;
              border: 0;
              border-bottom: 1px solid color-mix(in oklab, var(--p2) 60%, transparent);
              color: var(--ink);
              padding: 10px 2px;
              font-size: 15px;
              outline: none;
              transition: border-color .25s ease;
            }
            .field:focus { border-color: var(--accent); }
            .field::placeholder { color: color-mix(in oklab, var(--ink-soft) 80%, transparent); }
          `}</style>
        </form>
      </div>

      {/* Footer */}
      <div className="mx-auto mt-28 max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-[var(--p2)]/40 pt-10">
          <div>
            <div className="font-display text-[clamp(36px,5vw,72px)] leading-none tracking-tight text-[var(--ink)]/30">
              The Path
            </div>
            <div className="mt-2 text-[12px] font-mono text-[var(--ink-soft)]">© 2026 Giriraj Bhanse · Hand-built in Bombay</div>
          </div>
          <div className="text-right text-[12px] font-mono text-[var(--ink-soft)]">
            Designed in the open · No tracking · No cookies · Just walking
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactLine({ icon, label, value }) {
  return (
    <a href="#" onClick={(e)=>e.preventDefault()}
       className="group flex items-center gap-4 rounded-2xl border border-transparent px-4 py-4 transition hover:border-[var(--p2)]/50 hover:bg-[var(--p1)]/40">
      <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--p2)]/60 text-[var(--ink)]/80 group-hover:text-[var(--accent)] group-hover:border-[var(--accent)]/60 transition">
        {icon}
      </span>
      <span className="flex-1">
        <span className="block text-[11px] uppercase tracking-widest text-[var(--ink-soft)]">{label}</span>
        <span className="block text-[16px] text-[var(--ink)]">{value}</span>
      </span>
      <IcArrow size={16} className="text-[var(--ink-soft)] transition group-hover:text-[var(--accent)] group-hover:translate-x-1"/>
    </a>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] uppercase tracking-widest text-[var(--ink-soft)]">
        {label}{required && <span className="text-[var(--accent)]"> *</span>}
      </span>
      {children}
    </label>
  );
}

Object.assign(window, { About, Skills, Education, Contact });
