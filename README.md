**TechMatch — Website Overview**

This repository contains the TechMatch web application — a React single-page app used to present services, projects, admissions information, and partner integrations (including an intro video and an animated hexagon grid background).

**Quick Links**
- **Repo root:** `README.md` (this file)
- **Main app entry:** `src/App.js`
- **Pages:** `src/pages/*` (`Home`, `About`, `Services`, `ServiceDetails`, `Admissions`, `Projects`, `Testimonials`, `Contact`, `SignIn`, `SignUp`, `Dashboard`)
- **Shared components:** `src/components/*` (e.g., `HexagonCanvas`, `IntroVideo`, `Navbar`, `Footer`, `WhatsAppButton`, `FirebirdModal`)
- **Styles:** `src/styles/*`

**Table of contents**
- **Project summary**
- **Features**
- **Architecture & key files**
- **Local setup & scripts**
- **Routing & pages**
- **Important implementation notes**
- **Developer guidelines**
- **Testing & linting**
- **Maintenance / doc housekeeping**

**Project summary**

TechMatch is a marketing/education website built with React. It includes:
- Intro video overlay that transitions to the main UI
- Interactive canvas background (hexagon grid) in `HexagonCanvas`
- Services and Projects listings with details pages
- Admissions page with college listings and filters
- Testimonials and About/Team pages
- Contact form and WhatsApp quick-link
- FIREBIRD partner site-entry modal (in-memory, accessible)

**Features (user-facing)**
- Intro animation/video shown on first page load (session-scoped)
- Responsive site layout and mobile navigation
- Projects listing page and Services/ServiceDetails pages
- FIREBIRD partner modal that opens on page load (keyboard accessible, Escape-to-close, not persisted across sessions)
- Admissions page with filters and images (uses local assets or Unsplash fallbacks)

**Architecture & key files**
- `src/App.js`: Router, IntroVideo handling, global composition (Navbar, Footer, HexagonCanvas)
- `src/pages/*`: Pages for each route (see list above)
- `src/components/HexagonCanvas.js`: Canvas WebGL/2D animation for hexagon background
- `src/components/IntroVideo.js`: Intro video overlay and transition helper (`hasTransitioned` guard)
- `src/components/FirebirdModal.jsx`: FIREBIRD partner modal (in-memory dialog with focus trap)
- `src/components/Navbar.js` and `src/components/Footer.js`: global navigation and site footer
- `src/styles/*`: CSS files for pages and components
- `public/` and `backgrounds/`: static assets; note some video paths may be absolute — see Implementation Notes below

**Local setup & scripts**
Prerequisites:
- Node.js (recommended LTS) and npm

Install dependencies:
```powershell
npm install
```

Development server:
```powershell
npm run dev
# or depending on scripts in package.json
npm start
```

Linting and testing:
```powershell
npm run lint
npm test
```

Build for production:
```powershell
npm run build
```

If you run into issues with OneDrive or file locks on Windows, run the commands from a non-synced folder or temporarily disable OneDrive sync for this project directory.

**Routing & pages**
- `GET /` -> `Home` (contains Hero, maybe projects, intro video)
- `GET /services` -> `Services` list
- `GET /services/:serviceId` -> `ServiceDetails`
- `GET /projects` -> `Projects` page (site replacement for prior 'Freelance' service)
- `GET /admissions` -> `Admissions` (college list + filters)
- `GET /testimonials` -> `Testimonials`
- `GET /about` -> `About`
- `GET /contact` -> `Contact` page

**Important implementation notes**
- Intro video file paths: some files may reference absolute Windows paths (e.g., `C:\Users\...\TechMatch Logo Animation.mp4`). Convert these to relative paths under `public/` for cross-machine reliability and deployment.
- Hexagon grid animation: uses devicePixelRatio scaling and delta-time-based animation. See `backgrounds/index.html` and `src/components/HexagonCanvas.js` for parameters such as `state.hexRadius` and `state.wave` tuning values.
- FIREBIRD modal: implemented as `src/components/FirebirdModal.jsx`. It is in-memory only (no session/local storage). It uses `role="dialog"`, an Escape handler, basic focus-trap logic, and restores focus to the previously focused element on close.
- Projects: The site replaced an earlier `Freelance` service with `Projects`. Ensure routing (`/projects`) and navigation entries were updated in `src/App.js` and `src/components/Navbar.js`.
- Contact information: The canonical contact email `techmatch2k25@gmail.com` is used in many places. When updating email/phone/address globally, double-check structured data and meta tags.

**Developer guidelines**
- Keep CSS files inside `src/styles/` and prefer small, local changes (avoid global reformatting)
- Use `addEventListener('pointermove')` / `pointerdown` / `pointerup` for pointer handlers for best cross-device consistency
- Guard multi-run UI changes with flags (e.g., `hasTransitioned`) to avoid duplicate transitions
- Use React component state for ephemeral UI flags; avoid persisting modal-close state unless explicitly desired

**Testing & linting**
- Run `npm run lint` and fix issues before committing. The repo uses standard linters — run locally to pick up environment-specific warnings.
- Unit/UI tests: run `npm test`. If a test depends on an absolute local path or external video asset, stub or adjust the asset to a relative path during test runs.

**Maintenance & doc housekeeping**
I found many legacy/adjacent README and ADMISSIONS docs in the repo root. Candidate files that may be moved to an archive folder (or deleted) include:
- `README_ADMISSIONS_PAGE.md`
- `ADMISSIONS_DOCUMENTATION_FILES.md`
- `ADMISSIONS_DOCUMENTATION_INDEX.md`
- `ADMISSIONS_FINAL_CHECKLIST.md`
- `ADMISSIONS_IMPLEMENTATION.md`
- `ADMISSIONS_LAYOUT_GUIDE.md`
- `ADMISSIONS_QUICK_START.md`
- `ADMISSIONS_SUMMARY.md`
- `ADMISSIONS_VISUAL_OVERVIEW.md`
- `README_ADMISSIONS_PAGE.md`
- `PRODUCTION_AUTH_FEATURES_QUICK_REF.md`
- `PRODUCTION_AUTH_SETUP.md`
- `UPDATE_WITH_REAL_DATA.md`
- `COMPLETE_DELIVERABLES_LIST.md`

Recommendation: do NOT delete these files immediately. Instead:
1. Move them to `docs/archive/` (so they remain searchable and restorable).
2. Confirm which ones you consider irrelevant, then delete if desired.

If you want me to archive or remove them, tell me which of the above to move/delete and I will perform the operation and open a PR.

**Branching & PR guidance (if you'll commit changes)**
- Create a feature branch: `feature/update-services-partner-footer` (example requested in recent tasks)
- Commit message template: `feat(site): replace Freelance -> Projects, add FIREBIRD popup & footer updates, update testimonials and about team`
- Include a PR description that explains: what changed, why, QA steps (run dev server, verify modal opens, verify `/projects`, verify updated footer contact info), and files changed.

**Troubleshooting**
- If the modal does not show: ensure `src/App.js` mounts `FirebirdModal` and that `showIntro` is not blocking it prematurely.
- If images are missing: check `public/` and `backgrounds/` for currently referenced video/image files and replace absolute paths with relative ones.

**Contact / Contributors**
- Maintainers: see `src/pages/About.js` for current team entries.

---
If you'd like I can:
- Archive the candidate old README/doc files to `docs/archive/` and open a PR.
- Remove the ones you explicitly allow me to delete.
- Update this README further with any additional project-specific notes you want included.

**End of consolidated README**

Generated: December 10, 2025
# TechMatch - IT Consultancy Website

A modern, fully-responsive React website for TechMatch, an IT consultancy firm. Features an engaging intro video animation and an interactive hexagon grid background.

## Features

✨ **Intro Video Animation** - Full-screen intro with skip button  
🎨 **Interactive Hexagon Grid** - Dynamic WebGL canvas background with pointer wave effects  
📱 **Fully Responsive** - Mobile-first design for all devices  
🚀 **Modern Stack** - Built with React 18, React Router v6  
⚡ **Performance Optimized** - Fast loading and smooth animations  

## Pages

- **Home** - Hero section with feature highlights
- **About** - Company vision, mission, and values
- **Services** - 6 core service offerings with descriptions
- **Clients** - Client categories and featured case studies
- **Contact** - Contact form and company details

## Project Structure

```
TechMatch/
├── public/
│   ├── index.html
│   └── assets/
│       └── intro-video.mp4
├── src/
│   ├── components/
│   │   ├── IntroVideo.js
│   │   ├── HexagonCanvas.js
│   │   └── Navbar.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── About.js
│   │   ├── Services.js
│   │   ├── Clients.js
│   │   └── Contact.js
│   ├── styles/
│   │   ├── index.css
│   │   ├── App.css
│   │   ├── IntroVideo.css
│   │   ├── HexagonCanvas.css
│   │   ├── Navbar.css
│   │   └── Pages.css
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Installation

1. **Clone or navigate to the project**
```bash
cd TechMatch
```

2. **Install dependencies**
```bash
npm install
```

3. **Add intro video**
- Place your intro video at `public/assets/intro-video.mp4`
- Supported formats: MP4, WebM

## Development

Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

Produces optimized production build in `build/` directory.

## Key Components

### IntroVideo Component
- Plays on initial page load
- Fullscreen video display
- Skip button to bypass video
- Fallback transition after 5 seconds if video fails
- Uses `sessionStorage` to track if intro was seen

### HexagonCanvas Component
- Renders interactive hexagon grid background
- Real-time pointer tracking for wave effects
- Frame-independent animation using delta time
- Responsive to window resize
- High-DPI display support

### Navbar Component
- Sticky navigation with dropdown menus
- React Router integration for page navigation
- Orange/white color scheme
- Responsive mobile menu
- Slide-in animation on load

## Styling

- **CSS Variables** for consistent theming
- **CSS Grid & Flexbox** for responsive layouts
- **CSS Animations** for smooth transitions
- **Mobile-First** responsive design
- **Dark theme** with orange accents (#FF7041, #FFA91B)

## Color Scheme

- Primary Dark: `#2a2828`
- Primary Orange: `#FF7041`
- Secondary Orange: `#FFA91B`
- Light Background: `#F9F8FD`
- Text Light: `#868686`

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Canvas animation uses `requestAnimationFrame`
- Image optimization with lazy loading ready
- Code splitting via React Router
- Minified CSS and JavaScript in production
- High-DPI canvas scaling

## Configuration

### Customizing Animation Parameters

Edit `src/components/HexagonCanvas.js`:
```javascript
const state = {
  hexRadius: 100,  // Hexagon size
  wave: {
    frequency: 0.01,   // Wave frequency
    speed: 0.003,      // Animation speed
    strength: 16,      // Wave displacement
  },
};
```

### Video Source

Update the video source in `src/components/IntroVideo.js`:
```javascript
<source src="/assets/intro-video.mp4" type="video/mp4" />
```

## Development Notes

- The intro video is only played once per session (using `sessionStorage`)
- Canvas animation continues in background during all pages
- Z-index hierarchy: Canvas (1) → Pages (2) → Loading (9) → Intro (10)
- All components use React hooks (functional components)

## License

© 2025 TechMatch. All rights reserved.

## Contact

For inquiries: techmatch2k25@gmail.com  
Phone: +1 (800) TECH-MATCH

---

**Happy coding!** 🚀
