// Hero — misty forest with a wandering hiker. Parallax layers driven by scroll + mouse.

function Hero({ heroChar = "hiker", onStart }) {
  const ref = React.useRef(null);
  const [scroll, setScroll] = React.useState(0);
  const [mx, setMx] = React.useState(0); // -1..1
  const [my, setMy] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const t = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
      setScroll(t);
    };
    const onMove = (e) => {
      const w = window.innerWidth, h = window.innerHeight;
      setMx((e.clientX / w - 0.5) * 2);
      setMy((e.clientY / h - 0.5) * 2);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", onMove); };
  }, []);

  const p = (depth) => `translate3d(${mx * depth * 12}px, ${my * depth * 6 - scroll * depth * 120}px, 0)`;

  return (
    <section ref={ref} className="relative min-h-[100svh] w-full overflow-hidden scene" data-screen-label="01 Hero">

      {/* Sky gradient — warm dawn */}
      <div className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 20%, color-mix(in oklab, var(--accent) 18%, transparent), transparent 70%)," +
            "linear-gradient(180deg, color-mix(in oklab, var(--p1) 70%, var(--accent) 10%) 0%, var(--p1) 35%, var(--p0) 100%)"
        }}
      />

      {/* Sun rays */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[70vh]">
        {[0.2, 0.35, 0.55, 0.72].map((x, i) => (
          <div key={i} className="ray"
            style={{
              left: `${x * 100}%`,
              top: 0,
              width: `${60 + i * 14}px`,
              height: "70vh",
              transform: `rotate(${(x - 0.5) * 8}deg)`,
            }}
          />
        ))}
      </div>

      {/* Far mountains */}
      <svg viewBox="0 0 1600 900" preserveAspectRatio="none"
           className="absolute inset-x-0 bottom-0 h-[100%] w-full layer"
           style={{ transform: p(0.15), opacity: 0.55 }}>
        <defs>
          <linearGradient id="m-far" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--p2)" stopOpacity="0.5"/>
            <stop offset="1" stopColor="var(--p1)" stopOpacity="0.9"/>
          </linearGradient>
        </defs>
        <path d="M0 650 L120 520 L240 580 L380 460 L520 540 L640 470 L780 530 L920 420 L1060 500 L1200 460 L1340 530 L1480 470 L1600 520 L1600 900 L0 900 Z"
              fill="url(#m-far)"/>
      </svg>

      {/* Middle ridge */}
      <svg viewBox="0 0 1600 900" preserveAspectRatio="none"
           className="absolute inset-x-0 bottom-0 h-[100%] w-full layer"
           style={{ transform: p(0.35), opacity: 0.75 }}>
        <defs>
          <linearGradient id="m-mid" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--p2)"/>
            <stop offset="1" stopColor="var(--p1)"/>
          </linearGradient>
        </defs>
        <path d="M0 720 L180 600 L320 660 L460 540 L620 640 L760 560 L900 660 L1080 540 L1240 640 L1400 560 L1600 660 L1600 900 L0 900 Z"
              fill="url(#m-mid)"/>
      </svg>

      {/* Mist band */}
      <div className="absolute left-0 right-0 bottom-[28%] h-[35vh] mist layer"
           style={{ transform: p(0.2) }} />

      {/* Mid trees */}
      <svg viewBox="0 0 1600 900" preserveAspectRatio="none"
           className="absolute inset-x-0 bottom-0 h-full w-full layer"
           style={{ transform: p(0.5) }}>
        <g fill="var(--p1)" opacity="0.92">
          <Tree x={140}  y={760} h={220} className="sway-1"/>
          <Tree x={260}  y={770} h={180} className="sway-2"/>
          <Tree x={380}  y={760} h={240} className="sway-3"/>
          <Tree x={1240} y={770} h={200} className="sway-1"/>
          <Tree x={1360} y={760} h={250} className="sway-2"/>
          <Tree x={1480} y={770} h={210} className="sway-3"/>
        </g>
      </svg>

      {/* Foreground trees */}
      <svg viewBox="0 0 1600 900" preserveAspectRatio="none"
           className="absolute inset-x-0 bottom-0 h-full w-full layer"
           style={{ transform: p(0.85) }}>
        <g fill="var(--p0)">
          <Tree x={60}  y={900} h={320} className="sway-1"/>
          <Tree x={1540} y={900} h={340} className="sway-2"/>
        </g>
      </svg>

      {/* Trail (curved path with marching dashes) */}
      <svg viewBox="0 0 1600 900" preserveAspectRatio="none"
           className="absolute inset-x-0 bottom-0 h-full w-full layer pointer-events-none"
           style={{ transform: p(0.4) }}>
        <path d="M820 900 Q 800 760 760 700 Q 720 640 760 580 Q 800 520 800 460"
              stroke="var(--accent)" strokeWidth="2" fill="none" opacity="0.45"
              strokeLinecap="round" className="trail-path"/>
      </svg>

      {/* Hiker / character */}
      <div className="absolute left-1/2 bottom-[22%] -translate-x-1/2 layer"
           style={{ transform: `translate(-50%, 0) ${p(0.55)}` }}>
        <div className="hiker">
          {heroChar === "hiker"   && <HikerSVG />}
          {heroChar === "fox"     && <FoxSVG />}
          {heroChar === "campfire"&& <CampfireSVG />}
          {heroChar === "orb"     && <OrbSVG />}
        </div>
      </div>

      {/* Floating fireflies */}
      <Fireflies count={14} />

      {/* Headline */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-28 md:pt-36">
        <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.22em] text-[var(--ink-soft)]">
          <span className="inline-block h-px w-8 bg-[var(--accent)]"/>
          <span>Chapter I — The Path Begins</span>
        </div>
        <h1 className="font-display mt-5 text-[clamp(48px,9vw,140px)] leading-[0.92] tracking-[-0.03em] text-[var(--ink)] glow">
          Giriraj <em className="not-italic text-[var(--accent)]">Bhanse</em>
        </h1>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse"/>
          Cybersecurity Analyst · VAPT · Incident Response
        </div>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-[var(--ink)]/80">
          I hunt vulnerabilities by night and ship clean web things by day with
          Cursor + Claude. Trained in pentesting, OWASP Top 10, threat analysis,
          and prompt-fluent web dev with Next.js, Tailwind, and shadcn/ui.
        </p>

        {/* Tool logo strip — vibe + cyber */}
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] font-mono text-[var(--ink-soft)]">
          <span className="uppercase tracking-[0.18em] text-[var(--ink)]/50">stack:</span>
          {["Cursor","Claude","Next.js","Tailwind","React","Vercel","·","Kali","Burp","Metasploit","Splunk"].map((t, i) => (
            <span key={i} className={t === "·" ? "text-[var(--accent)]" : "hover:text-[var(--accent)] transition-colors"}>{t}</span>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <AbButton variant="solid" size="lg" onClick={onStart}>
            <IcCompass size={16}/> Begin the recon
          </AbButton>
          <AbButton variant="outline" size="lg" animate={false}>
            <IcMail size={16}/> girirajbhanse4@gmail.com
          </AbButton>
        </div>

        {/* footer indicators */}
        <div className="mt-16 flex items-center gap-5 text-[12px] text-[var(--ink-soft)]">
          <span className="font-mono">N 19.0760° · E 72.8777°</span>
          <span className="inline-block h-px w-8 bg-[var(--p2)]"/>
          <span>Mumbai, Maharashtra · +91 93070 59746</span>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-[var(--ink-soft)] z-10 flex flex-col items-center gap-2">
        <span>scroll</span>
        <span className="block h-10 w-px bg-gradient-to-b from-[var(--accent)] to-transparent animate-pulse" />
      </div>
    </section>
  );
}

// Tree built from layered triangles in a <g transform>
function Tree({ x, y, h, className = "" }) {
  const w = h * 0.55;
  return (
    <g className={className} transform={`translate(${x} ${y})`}>
      <rect x={-w*0.04} y={-h*0.18} width={w*0.08} height={h*0.18} fill="currentColor" opacity="0.4"/>
      <path d={`M0 ${-h} L${-w/2} ${-h*0.4} L${-w*0.25} ${-h*0.4} L${-w*0.35} ${-h*0.05} L${w*0.35} ${-h*0.05} L${w*0.25} ${-h*0.4} L${w/2} ${-h*0.4} Z`} />
    </g>
  );
}

function HikerSVG() {
  return (
    <svg width="120" height="180" viewBox="0 0 120 180">
      {/* shadow */}
      <ellipse cx="60" cy="170" rx="34" ry="5" fill="rgba(0,0,0,.45)" />
      {/* legs */}
      <path d="M52 130 L48 168 M68 130 L72 168" stroke="var(--p0)" strokeWidth="8" strokeLinecap="round" />
      {/* torso */}
      <path d="M44 90 Q44 70 60 68 Q76 70 76 90 L74 134 Q60 138 46 134 Z" fill="var(--p1)" stroke="var(--p0)" strokeWidth="2"/>
      {/* backpack */}
      <rect x="40" y="78" width="20" height="36" rx="5" fill="var(--p2)" stroke="var(--p0)" strokeWidth="1.5"/>
      <rect x="42" y="88" width="16" height="3" fill="var(--accent)"/>
      {/* head */}
      <circle cx="60" cy="56" r="11" fill="var(--p4)" stroke="var(--p0)" strokeWidth="1.5"/>
      {/* hat */}
      <path d="M44 56 Q60 36 76 56 Z" fill="var(--p2)" stroke="var(--p0)" strokeWidth="1.5"/>
      <ellipse cx="60" cy="56" rx="18" ry="3" fill="var(--p2)" stroke="var(--p0)" strokeWidth="1.5"/>
      {/* walking stick */}
      <line x1="84" y1="86" x2="96" y2="170" stroke="var(--p4)" strokeWidth="3" strokeLinecap="round"/>
      {/* arm */}
      <path d="M74 96 Q86 100 88 110" stroke="var(--p1)" strokeWidth="7" strokeLinecap="round" fill="none"/>
      {/* lantern */}
      <g transform="translate(28 96)">
        <line x1="0" y1="0" x2="0" y2="10" stroke="var(--p4)" strokeWidth="1.5"/>
        <rect x="-7" y="10" width="14" height="14" rx="2" fill="var(--p1)" stroke="var(--p4)" strokeWidth="1"/>
        <circle cx="0" cy="17" r="4" fill="var(--accent)">
          <animate attributeName="r" values="3.5;5;3.5" dur="2s" repeatCount="indefinite"/>
        </circle>
      </g>
    </svg>
  );
}

function FoxSVG() {
  return (
    <svg width="170" height="120" viewBox="0 0 170 120">
      <ellipse cx="85" cy="112" rx="50" ry="6" fill="rgba(0,0,0,.4)"/>
      <path d="M30 90 Q50 70 80 72 Q120 74 130 60 L138 80 Q140 100 120 104 L50 106 Q28 104 30 90 Z" fill="var(--accent)" stroke="var(--p0)" strokeWidth="2"/>
      <path d="M130 60 L150 40 L148 70 Z" fill="var(--accent)" stroke="var(--p0)" strokeWidth="2"/>
      <circle cx="143" cy="58" r="2.5" fill="var(--p0)"/>
      <path d="M148 68 L156 70" stroke="var(--p0)" strokeWidth="1.5"/>
      <path d="M30 90 Q12 95 8 110 Q22 108 32 100 Z" fill="var(--accent)" stroke="var(--p0)" strokeWidth="2"/>
      <path d="M75 106 L72 116 M95 106 L92 116 M115 104 L112 114" stroke="var(--p1)" strokeWidth="6" strokeLinecap="round"/>
    </svg>
  );
}

function CampfireSVG() {
  return (
    <svg width="180" height="180" viewBox="0 0 180 180">
      <ellipse cx="90" cy="160" rx="60" ry="8" fill="rgba(0,0,0,.4)"/>
      <path d="M50 155 L130 155 L120 145 L60 145 Z" fill="var(--p2)"/>
      <path d="M40 158 L140 152" stroke="var(--p3)" strokeWidth="6" strokeLinecap="round"/>
      <path d="M50 156 L130 150" stroke="var(--p2)" strokeWidth="5" strokeLinecap="round"/>
      <g>
        <path d="M90 60 Q70 90 80 120 Q90 140 100 120 Q120 90 90 60 Z" fill="var(--accent)">
          <animate attributeName="d" dur="1.4s" repeatCount="indefinite"
            values="M90 60 Q70 90 80 120 Q90 140 100 120 Q120 90 90 60 Z;
                    M90 56 Q72 92 78 122 Q90 142 102 122 Q118 92 90 56 Z;
                    M90 60 Q70 90 80 120 Q90 140 100 120 Q120 90 90 60 Z"/>
        </path>
        <path d="M90 80 Q80 100 86 122 Q90 130 94 122 Q100 100 90 80 Z" fill="#fff3c4" opacity="0.85">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="0.8s" repeatCount="indefinite"/>
        </path>
      </g>
      <circle cx="60" cy="60" r="1.5" fill="var(--accent)" opacity="0.7">
        <animate attributeName="cy" from="60" to="0" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0;0.7;0" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="120" cy="70" r="1.5" fill="var(--accent)" opacity="0.7">
        <animate attributeName="cy" from="70" to="0" dur="4s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0;0.7;0" dur="4s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
}

function OrbSVG() {
  return (
    <div className="relative w-[220px] h-[220px] grid place-items-center">
      <div className="absolute inset-0 rounded-full orb"></div>
      <div className="absolute inset-[-30px] rounded-full border border-[var(--accent)]/30"
           style={{ transform: "rotateX(72deg)" }}>
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-[var(--accent)]"/>
      </div>
      <div className="absolute inset-[-50px] rounded-full border border-[var(--accent)]/20"
           style={{ transform: "rotateX(72deg) rotateZ(45deg)" }}/>
    </div>
  );
}

function Fireflies({ count = 10 }) {
  const seeds = React.useMemo(() => Array.from({ length: count }, () => ({
    x: Math.random() * 100, y: 30 + Math.random() * 50,
    d: 4 + Math.random() * 8, s: 0.6 + Math.random() * 0.8
  })), [count]);
  return (
    <div className="pointer-events-none absolute inset-0 layer">
      {seeds.map((s, i) => (
        <span key={i}
              className="absolute rounded-full"
              style={{
                left: s.x + "%", top: s.y + "%",
                width: s.s * 6, height: s.s * 6,
                background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
                opacity: 0.85,
                filter: "blur(0.3px)",
                animation: `firefly ${s.d}s ease-in-out ${i * 0.4}s infinite alternate`
              }}/>
      ))}
      <style>{`
        @keyframes firefly {
          0%   { transform: translate(0,0); opacity: .3; }
          50%  { opacity: 1; }
          100% { transform: translate(20px,-30px); opacity: .4; }
        }
      `}</style>
    </div>
  );
}

window.Hero = Hero;
