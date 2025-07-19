# Jorge Elvir - Portfolio Website

A modern, interactive portfolio website showcasing web development projects with smooth animations and dynamic content generation.

## Features

- **Dynamic Portfolio System** - Portfolio projects are dynamically generated from JavaScript objects, making it easy to add, remove, or reorder projects
- **Horizontal Scrolling Portfolio** - Smooth horizontal scrolling through portfolio pieces with GSAP animations
- **Interactive Animations** - GSAP-powered animations including:
  - Hero section intro animations
  - Staggered text animations
  - Scroll-triggered title animations
  - Background color changes based on active portfolio piece
  - Video autoplay for portfolio pieces
- **Mobile Optimized** - Touch-friendly interactions with mobile-specific scroll handling
- **Modern UI/UX** - Clean, professional design with smooth transitions
- **Privacy-Focused Links** - External links use `rel="noreferrer"` to prevent referrer tracking

## Project Structure

```
src/js/
├── functions.js      # Main entry point and utility functions
├── animations.js     # GSAP animations and ScrollTrigger configurations
├── portfolio.js      # Dynamic portfolio data and generation
├── mouse-trail.js    # Interactive mouse trail effects
└── ...

docs/
├── index.html        # Main HTML file
├── css/             # Compiled stylesheets
├── js/              # Compiled JavaScript bundle
├── images/          # Images and media assets
└── ...
```

## Technologies Used

- **JavaScript (ES6+)** - Modern JavaScript with modules
- **GSAP** - Professional animation library with ScrollTrigger
- **CSS3** - Advanced styling with CSS Grid and Flexbox
- **HTML5** - Semantic markup
- **esbuild** - Fast JavaScript bundler

## Development Setup

### Prerequisites

- Node.js and npm installed
- Modern web browser

### Installation

1. Clone the repository:

2. Install dependencies:

```bash
npm install
```

### Build Process

The project uses esbuild for fast JavaScript bundling:

**Package.json scripts:**

```json
"scripts": {
  "build:js": "esbuild src/js/functions.js --bundle --outfile=docs/js/functions.js --minify --watch --sourcemap",
  "dev": "npm run build:js"
}
```

**Development (with watch mode):**

```bash
npm run dev
```

**One-time build:**

```bash
npx esbuild src/js/functions.js --bundle --outfile=docs/js/functions.js --minify
```

## Adding Portfolio Projects

To add new portfolio pieces, edit the `portfolioData` array in `src/js/portfolio.js`:

```javascript
{
  title: 'Project Name',
  brandColor: '#000000',
  agency: 'Agency Name',
  role: 'Your role',
  technology: 'Technologies used',
  url: 'https://example.com',
  media: {
    type: 'video', // or 'image'
    src: 'path/to/media.mp4'
  }
}
```

After making changes, run the build command to update the compiled JavaScript.

## Browser Support

- Modern browsers with ES6+ support
- Mobile browsers (iOS Safari, Chrome Mobile, etc.)
- Desktop browsers (Chrome, Firefox, Safari, Edge)

## License

This project is the personal portfolio of Jorge Martin Elvir. All rights reserved.
