// App — assembles the page, owns Tweaks state, theme + palette switching.

const PALETTES = {
  sand:    ["#1a130c","#2d2418","#5a4a31","#a87a4b","#d9c7a3","#f1e7d0","#d8a35a"], // default — warm sand
  forest:  ["#0f1612","#1f2a22","#3e5847","#7a9072","#c2cdb3","#e7ead8","#9bb487"], // moss/forest
  clay:    ["#1a0e0a","#2a1b15","#6b3a25","#c66a3a","#e8c89a","#f4e2c4","#e89055"], // red clay / desert
  twilight:["#0d121b","#1a1f2a","#3a4a5e","#7a7560","#cbc3a3","#e9e2c8","#d8b078"]  // twilight blue-ochre
};
const PALETTE_OPTIONS = [
  PALETTES.sand, PALETTES.forest, PALETTES.clay, PALETTES.twilight
];

const HERO_OPTIONS = [
  { v: "hiker",   label: "Lantern hiker" },
  { v: "fox",     label: "Forest fox" },
  { v: "campfire",label: "Campfire" },
  { v: "orb",     label: "Earth orb" },
];

function applyPalette(arr, dark) {
  const root = document.documentElement;
  // arr = [p0, p1, p2, p3, p4, p5, accent]
  root.style.setProperty("--p0", arr[0]);
  root.style.setProperty("--p1", arr[1]);
  root.style.setProperty("--p2", arr[2]);
  root.style.setProperty("--p3", arr[3]);
  root.style.setProperty("--p4", arr[4]);
  root.style.setProperty("--p5", arr[5]);
  root.style.setProperty("--accent", arr[6]);
  root.style.setProperty("--ink",     dark ? arr[5] : arr[1]);
  root.style.setProperty("--ink-soft",dark ? arr[4] : arr[2]);
  root.classList.toggle("theme-light", !dark);
  if (!dark) {
    // In light mode swap "deep" backgrounds to lighter tones — invert role of p0/p5
    root.style.setProperty("--p0", arr[5]);
    root.style.setProperty("--p1", arr[4]);
    root.style.setProperty("--p2", arr[2]);
    root.style.setProperty("--p3", arr[3]);
    root.style.setProperty("--p4", arr[1]);
    root.style.setProperty("--p5", arr[0]);
    root.style.setProperty("--ink", arr[0]);
    root.style.setProperty("--ink-soft", arr[1]);
  }
}

function App() {
  const [t, setTweak] = useTweaks(window.__TWEAK_DEFAULTS);

  // Re-apply CSS vars whenever palette / theme changes
  React.useEffect(() => {
    applyPalette(t.palette, t.dark);
  }, [t.palette, t.dark]);

  // Apply 3D + animation + density CSS variables
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--rho-3d", String(t.threeD));
    root.style.setProperty("--rho-anim", String(t.animSpeed));
    root.style.setProperty("--pad-dense", t.density === "compact" ? "0.6" : t.density === "comfy" ? "1.2" : "1");
  }, [t.threeD, t.animSpeed, t.density]);

  const begin = () => document.getElementById("section-about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="relative">
      {/* Top nav */}
      <header className="fixed top-4 left-0 right-0 z-[100] flex items-center justify-center px-4">
        <div className="flex items-center gap-3">
          {/* Brand */}
          <div className="flex items-center gap-2.5 rounded-full border border-[var(--p2)]/60 bg-[var(--p1)]/70 backdrop-blur-xl px-3 py-1.5 pe-4 text-[var(--ink)]">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--accent)] text-[var(--p0)]">
              <IcMountain size={14}/>
            </span>
            <div className="leading-tight">
              <div className="font-display text-[14px] tracking-tight">Giriraj Bhanse</div>
              <div className="text-[9px] font-mono uppercase tracking-widest text-[var(--ink-soft)]">The Path · v2026</div>
            </div>
          </div>

          {/* Menubar */}
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Journey</MenubarTrigger>
              <MenubarContent>
                <MenubarItem onClick={() => document.getElementById("section-about")?.scrollIntoView({behavior:"smooth"})}>
                  About — the traveler <span className="ml-auto font-mono text-[10px] text-[var(--ink-soft)]">1</span>
                </MenubarItem>
                <MenubarItem onClick={() => document.getElementById("section-skills")?.scrollIntoView({behavior:"smooth"})}>
                  Skills — the toolkit <span className="ml-auto font-mono text-[10px] text-[var(--ink-soft)]">2</span>
                </MenubarItem>
                <MenubarItem onClick={() => document.getElementById("section-edu")?.scrollIntoView({behavior:"smooth"})}>
                  Education — trail markers <span className="ml-auto font-mono text-[10px] text-[var(--ink-soft)]">3</span>
                </MenubarItem>

                <MenubarSeparator/>
                <MenubarItem onClick={() => document.getElementById("section-contact")?.scrollIntoView({behavior:"smooth"})}>
                  Contact <span className="ml-auto font-mono text-[10px] text-[var(--ink-soft)]">⌘K</span>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarCheckboxItem checked={t.dark} onChange={(v) => setTweak("dark", v)}>
                  Dark mode
                </MenubarCheckboxItem>
                <MenubarSeparator/>
                <div className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-[13px] text-[var(--ink)]/90">
                  <span>3D depth</span>
                  <span className="flex items-center gap-1">
                    <button onClick={(e) => { e.stopPropagation(); setTweak("threeD", Math.max(0, +(t.threeD - 0.25).toFixed(2))); }} className="grid h-6 w-6 place-items-center rounded-full bg-[var(--p2)]/40 text-[var(--ink)] hover:bg-[var(--accent)] hover:text-[var(--p0)] transition font-mono text-[13px]">−</button>
                    <span className="min-w-[36px] text-center font-mono text-[11px] text-[var(--accent)]">{t.threeD.toFixed(2)}×</span>
                    <button onClick={(e) => { e.stopPropagation(); setTweak("threeD", Math.min(2, +(t.threeD + 0.25).toFixed(2))); }} className="grid h-6 w-6 place-items-center rounded-full bg-[var(--p2)]/40 text-[var(--ink)] hover:bg-[var(--accent)] hover:text-[var(--p0)] transition font-mono text-[13px]">+</button>
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-[13px] text-[var(--ink)]/90">
                  <span>Anim speed</span>
                  <span className="flex items-center gap-1">
                    <button onClick={(e) => { e.stopPropagation(); setTweak("animSpeed", Math.min(2.4, +(t.animSpeed + 0.2).toFixed(2))); }} className="grid h-6 w-6 place-items-center rounded-full bg-[var(--p2)]/40 text-[var(--ink)] hover:bg-[var(--accent)] hover:text-[var(--p0)] transition font-mono text-[13px]">−</button>
                    <span className="min-w-[36px] text-center font-mono text-[11px] text-[var(--accent)]">{(1/t.animSpeed).toFixed(2)}×</span>
                    <button onClick={(e) => { e.stopPropagation(); setTweak("animSpeed", Math.max(0.4, +(t.animSpeed - 0.2).toFixed(2))); }} className="grid h-6 w-6 place-items-center rounded-full bg-[var(--p2)]/40 text-[var(--ink)] hover:bg-[var(--accent)] hover:text-[var(--p0)] transition font-mono text-[13px]">+</button>
                  </span>
                </div>
                <MenubarSeparator/>
                <MenubarItem inset onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                  Back to start
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Character</MenubarTrigger>
              <MenubarContent>
                <MenubarRadioGroup value={t.heroChar} onChange={(v) => setTweak("heroChar", v)}>
                  {HERO_OPTIONS.map((o) => (
                    <MenubarRadioItem key={o.v} value={o.v}>{o.label}</MenubarRadioItem>
                  ))}
                </MenubarRadioGroup>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger>Palette</MenubarTrigger>
              <MenubarContent>
                <MenubarRadioGroup value={JSON.stringify(t.palette)} onChange={(v) => setTweak("palette", JSON.parse(v))}>
                  <MenubarRadioItem value={JSON.stringify(PALETTES.sand)}>Warm sand</MenubarRadioItem>
                  <MenubarRadioItem value={JSON.stringify(PALETTES.forest)}>Mossy forest</MenubarRadioItem>
                  <MenubarRadioItem value={JSON.stringify(PALETTES.clay)}>Red clay</MenubarRadioItem>
                  <MenubarRadioItem value={JSON.stringify(PALETTES.twilight)}>Twilight blue</MenubarRadioItem>
                </MenubarRadioGroup>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          {/* Theme toggle (animated border button) */}
          <AbButton size="icon" variant="outline" onClick={() => setTweak("dark", !t.dark)}>
            {t.dark ? <IcSun size={16}/> : <IcMoon size={16}/>}
          </AbButton>
        </div>
      </header>

      <main>
        <Hero heroChar={t.heroChar} onStart={begin}/>
        <div id="section-about"><About/></div>
        <div id="section-skills"><Skills/></div>
        <div id="section-edu"><Education/></div>

        <div id="section-contact"><Contact/></div>
      </main>

      {/* Tweaks panel */}
      <TweaksPanel>
        <TweakSection label="Palette" />
        <TweakColor label="Earth tones" value={t.palette}
                    options={PALETTE_OPTIONS}
                    onChange={(v) => setTweak("palette", v)} />
        <TweakToggle label="Dark mode" value={t.dark}
                     onChange={(v) => setTweak("dark", v)} />

        <TweakSection label="Hero" />
        <TweakSelect label="Character" value={t.heroChar}
                     options={HERO_OPTIONS.map(o => o.v)}
                     onChange={(v) => setTweak("heroChar", v)} />

        <TweakSection label="Motion & depth" />
        <TweakSlider label="3D intensity" value={t.threeD} min={0} max={2} step={0.1}
                     onChange={(v) => setTweak("threeD", v)} />
        <TweakSlider label="Anim speed" value={t.animSpeed} min={0.4} max={2.4} step={0.1} unit="×"
                     onChange={(v) => setTweak("animSpeed", v)} />

        <TweakSection label="Layout" />
        <TweakRadio label="Density" value={t.density}
                    options={["compact", "regular", "comfy"]}
                    onChange={(v) => setTweak("density", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
