# Giriraj Bhanse — Portfolio

A single-page personal portfolio ("The Path") built with React, rendered in the
browser via the Babel Standalone + Tailwind Play CDN setup (no build step required).

## How to run

The page loads its React code from `src/*.jsx` using
`<script type="text/babel" src="...">`. Babel **fetches** those files at runtime,
and browsers block `fetch` over the `file://` protocol. So you **must serve the
folder over HTTP** — double-clicking `Portfolio.html` will render a blank page.

From this folder, start the bundled server:

```powershell
.\serve.ps1
```

It serves at **http://localhost:8081** and opens a browser tab automatically.
Press `Ctrl+C` in the terminal to stop it.

> If port 8081 is busy, edit `$port` at the top of `serve.ps1`.

## Structure

```
portfolio/
├─ Portfolio.html            Main page: loads fonts, Tailwind, React + Babel, and src/*.jsx
├─ serve.ps1                 Local static web server (port 8081) — use this to view the site
├─ _shot.ps1                 Helper script (screenshot utility)
├─ portfolio.code-workspace  VS Code workspace file
├─ .vscode/                  Editor settings
├─ src/                      React components (loaded as text/babel, no build step)
│  ├─ app.jsx                Root app / composition
│  ├─ hero.jsx               Hero section
│  ├─ sections.jsx           Main content sections
│  ├─ menubar.jsx            Navigation / menu bar
│  ├─ button-border.jsx      Animated-border button component
│  ├─ icons.jsx              Icon components
│  └─ tweaks-panel.jsx       Live theme / tweaks panel
├─ uploads/                  Static assets
│  ├─ Giriraj_Bhanse_Cybersecurity_Resume.pdf
│  └─ pasted-*.png           Images used in the page
└─ archive/                  Unrelated older files kept for reference (see below)
```

## Tech notes

- **No build / no npm.** Everything runs in the browser from CDNs:
  - React 18.3.1 + ReactDOM (UMD dev builds, unpkg)
  - Babel Standalone 7.29.0 — transpiles the `.jsx` files in-browser
  - Tailwind CSS via the Play CDN (`cdn.tailwindcss.com`) with the `forms` and
    `typography` plugins
  - Google Fonts: Fraunces (display), Geist (sans), Geist Mono
- Theme/palette defaults live in `window.__TWEAK_DEFAULTS` inside `Portfolio.html`
  (between the `EDITMODE-BEGIN` / `EDITMODE-END` markers) and can be adjusted from
  the live tweaks panel.
- Custom CSS (animations, palette variables, grain overlay, etc.) is inline in the
  `<style>` block of `Portfolio.html`.

## archive/

Older/unrelated files that were in this folder before the portfolio was moved here.
They are **not used** by the portfolio and are kept only for reference:

- `STYLE.CSS`, `pg.png`, `web-d.png`, `web_devloper.jpg`, `png/` — leftovers from a
  previous version of the page.
- `projects/Hotel/` — a separate PHP hotel-booking app (unrelated to this portfolio).
