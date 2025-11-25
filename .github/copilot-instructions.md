# TechMatch Project - AI Coding Agent Guidelines

## Project Overview
**TechMatch** is a web-based project featuring an intro animation system with a dynamic hexagon grid background. The architecture centers on:
- **Intro Video**: Full-screen video animation that plays on initial page load
- **Hexagon Grid Background**: Real-time WebGL/Canvas animation with interactive pointer waves
- **Navigation System**: Dropdown menu with styling for responsive browsing

## Key Architecture & Data Flows

### 1. **Intro-to-Main Content Transition**
- The `intro-video-container` (z-index: 10) overlays everything initially
- Upon video end/error, `transitionToMainContent()` executes: hides intro → fades in canvas → shows main content
- **Loading overlay** (z-index: 9) hides when video plays
- **Critical**: Uses `hasTransitioned` flag to prevent multiple transitions; always check this guard before modifying transition logic
- See `backgrounds/index.html` lines 162-189 for the state machine

### 2. **Hexagon Grid Animation System**
The canvas animation is NOT a static background—it's **state-driven and interactive**:
- **Grid building** (`buildGrid()`): Creates hexagon nodes in rows with alternating horizontal offsets (odd/even row logic)
- **Node properties**: Each node has `baseX/Y` (static position), `x/y` (animated position), `driftRadius`, `driftAngle` (orbital drift)
- **Wave effect**: Pointer proximity triggers sine-wave distortion on nodes calculated using distance, frequency, and decay
- **Connections**: Edges connect adjacent hexagons in 6-connected grid pattern (east, southEast, southWest)
- **Color palette**: 6 random colors applied per node (`rgba()` colors with alpha for layering effect)
- State object at line 291 is the canonical reference for all animation parameters

### 3. **Navigation Component** (`backgrounds/navbar.html` + `navstyle.css`)
- **Dropdown menu**: Built with nested `<ul>` elements; child menus hidden by default (visibility/opacity)
- **Styling pattern**: Uses SCSS-like nesting; hover state triggers background color + text color inversion
- **Animation**: Slide-in keyframe animation on page load (line 70-79 in CSS)
- **Color scheme**: Orange (#FFA91B, #FF7B00) on white background (#F9F8FD)

## Code Patterns & Conventions

### Event Handling
- Use `addEventListener()` for DOM events; prefer `pointermove`, `pointerdown`, `pointerup` for cross-device input
- Guard conditions prevent duplicate execution (see `hasTransitioned` flag)
- Timeouts used for orchestrating animation sequencing (300ms, 500ms delays for staggered transitions)

### Canvas Animation
- **Resolution handling**: `window.devicePixelRatio` applied to canvas context to prevent blurriness on high-DPI displays
- **Frame-independent animation**: Delta time (`time - lastTime`) passed between frames; speeds scale by `delta / 10000`
- **Trigonometry**: Orbital drift uses `Math.cos()` + `Math.sin()` with angle increments
- **Math optimization**: Distance calculations use `Math.max(..., 0.001)` to avoid division by zero

### Styling Philosophy
- **CSS Grid**: Hexagon spacing uses `Math.sqrt(2) * hexRadius` for horizontal, `1.0 * hexRadius` for vertical
- **Dark mode**: Base colors dark (#2a2828), accents orange (#FF7041)
- **Responsive units**: `clamp(2rem, 5vw, 4rem)` used for fluid font scaling

## Integration Points & External Resources

### Video Source
- **Current path**: `"C:\Users\kanth\OneDrive\Desktop\TechMatch\backgrounds\TechMatch Logo Animation.mp4"`
- **Issue**: Absolute local path—convert to relative path or CDN URL for deployment
- **Fallback**: Error handler triggers transition after 3-second timeout if video fails

### CSS Import (navbar.html)
- Line 6: `<link rel="stylesheet" href="style.css">` — **File not found in repo** (likely incomplete/orphaned file)
- `navstyle.css` is the actual stylesheet in use for navigation

## Critical Dev Workflow Commands

### Running Locally
- Open `backgrounds/index.html` directly in browser (file:// protocol)
- Canvas + video will load; note video path may fail locally if using absolute paths

### Testing Canvas Animation
- Modify `state.wave` object (line 291-296) to tune wave effect:
  - `frequency`: 0.01 (controls wave frequency)
  - `speed`: 0.003 (animation speed)
  - `strength`: 16 (wave displacement magnitude)
- Adjust `state.hexRadius`: 100 (controls hexagon grid cell size)

### Debugging Transitions
- Monitor console for warnings: `Video failed to load...` or `Video taking too long...`
- Check `hasTransitioned` state in DevTools to verify one-time execution
- Add breakpoints in `transitionToMainContent()` to trace state changes

## Common Pitfalls & Patterns to Avoid

1. **Video Path Hardcoding**: Absolute Windows paths break on other machines/deployment environments
2. **Z-index Confusion**: Four overlapping layers exist (canvas: 1, main-content: 2, loading: 9, intro: 10) — maintain hierarchy
3. **Grid Offset Logic**: Hexagon grid uses row parity (`rowIndex % 2`) to determine column offsets—don't flatten this
4. **Pointer State**: `state.pointer.isActive` must be explicitly set to `false` on leave to stop wave effect
5. **Canvas Scaling**: DevicePixelRatio applied to context ONLY, not style dimensions—get both right or animation appears blurry/distorted

## File Reference Map
- **Primary entry**: `backgrounds/index.html` (contains full HTML + CSS + JS)
- **Navigation component**: `backgrounds/navbar.html` (orphaned, not integrated)
- **Navigation styles**: `backgrounds/navstyle.css` (complete but not imported in main file)
- **Missing**: Main website content files (navbar.html not yet integrated into index.html)

---
**Last Updated**: November 22, 2025
