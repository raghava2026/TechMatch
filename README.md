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

For inquiries: info@techmatch.com  
Phone: +1 (800) TECH-MATCH

---

**Happy coding!** 🚀
