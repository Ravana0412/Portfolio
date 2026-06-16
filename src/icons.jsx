// Lightweight inline icon set (lucide-style strokes)
const Icon = ({ children, size = 18, className = "", strokeWidth = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth={strokeWidth}
       strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
);

const IcChevron   = (p) => <Icon {...p}><path d="m9 6 6 6-6 6"/></Icon>;
const IcCheck     = (p) => <Icon {...p}><path d="M20 6 9 17l-5-5"/></Icon>;
const IcCircle    = (p) => <Icon {...p}><circle cx="12" cy="12" r="3.5" fill="currentColor"/></Icon>;
const IcSun       = (p) => <Icon {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></Icon>;
const IcMoon      = (p) => <Icon {...p}><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z"/></Icon>;
const IcCompass   = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="m14.5 9.5-1.5 5-5 1.5 1.5-5 5-1.5z"/></Icon>;
const IcMountain  = (p) => <Icon {...p}><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></Icon>;
const IcLeaf      = (p) => <Icon {...p}><path d="M11 20A7 7 0 0 1 4 13c0-4.5 4.5-9 13-9 0 7-3.5 12-6 14"/><path d="M2 21c1-2 5.5-7 10-9"/></Icon>;
const IcCode      = (p) => <Icon {...p}><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></Icon>;
const IcSpark     = (p) => <Icon {...p}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="2.5" fill="currentColor"/></Icon>;
const IcPlay      = (p) => <Icon {...p}><path d="M6 4l14 8-14 8z" fill="currentColor" stroke="none"/></Icon>;
const IcPause     = (p) => <Icon {...p}><rect x="6" y="4" width="4" height="16" fill="currentColor" stroke="none"/><rect x="14" y="4" width="4" height="16" fill="currentColor" stroke="none"/></Icon>;
const IcSkip      = (p) => <Icon {...p}><path d="m5 4 10 8-10 8z" fill="currentColor" stroke="none"/><path d="M19 4v16"/></Icon>;
const IcMail      = (p) => <Icon {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></Icon>;
const IcGithub    = (p) => <Icon {...p}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5a4.8 4.8 0 0 0-1 3.5v4M9 18c-4.5 2-5-2-7-2"/></Icon>;
const IcLinkedin  = (p) => <Icon {...p}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></Icon>;
const IcArrow     = (p) => <Icon {...p}><path d="M5 12h14M13 5l7 7-7 7"/></Icon>;
const IcMenu      = (p) => <Icon {...p}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></Icon>;
const IcX         = (p) => <Icon {...p}><path d="M18 6 6 18M6 6l12 12"/></Icon>;
const IcExt       = (p) => <Icon {...p}><path d="M7 17 17 7M7 7h10v10"/></Icon>;
const IcLock      = (p) => <Icon {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/><circle cx="12" cy="16" r="1" fill="currentColor"/></Icon>;
const IcPhone     = (p) => <Icon {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></Icon>;
const IcShield    = (p) => <Icon {...p}><path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z"/></Icon>;
const IcTerminal  = (p) => <Icon {...p}><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></Icon>;
const IcBugIcon   = (p) => <Icon {...p}><rect x="8" y="6" width="8" height="14" rx="4"/><path d="M8 12H4M16 12h4M8 8 5 5M16 8l3-3M8 16l-3 3M16 16l3 3M12 6V3"/></Icon>;
const IcBook      = (p) => <Icon {...p}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></Icon>;
const IcCampfire  = (p) => <Icon {...p}><path d="M12 3c-1 2 2 3 2 6a3 3 0 0 1-6 0c0-2 2-2 2-5"/><path d="M5 18h14M7 21h10"/></Icon>;
const IcRocket    = (p) => <Icon {...p}><path d="M5 13l-2 5 5-2 9-9a3 3 0 0 0-4-4l-9 9z"/><circle cx="14" cy="10" r="1.5"/></Icon>;
const IcGlobe     = (p) => <Icon {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></Icon>;

Object.assign(window, {
  Icon, IcChevron, IcCheck, IcCircle, IcSun, IcMoon, IcCompass, IcMountain, IcLeaf, IcCode,
  IcSpark, IcPlay, IcPause, IcSkip, IcMail, IcGithub, IcLinkedin, IcArrow, IcMenu, IcX,
  IcExt, IcBook, IcCampfire, IcRocket, IcGlobe,
  IcLock, IcPhone, IcShield, IcTerminal, IcBugIcon
});
