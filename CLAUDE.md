# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Anas Alhalabi, a frontend developer aspiring to become fullstack. The site is a static HTML/CSS/JavaScript portfolio hosted on GitHub Pages at `noiceanas.com`.

## Technology Stack

- **HTML5** - Page structure and semantics
- **CSS3** - Responsive design with Flexbox, gradient backgrounds, backdrop filters
- **Vanilla JavaScript** - DOM manipulation for interactivity
- **Hosting** - GitHub Pages with automatic deployment

No build tools, package managers, or dependencies required.

## Project Structure

```
.
├── index.html         # Main portfolio page
├── styles.css         # All styling (no CSS preprocessing)
├── script.js          # Client-side interactions
├── CNAME              # Custom domain configuration (noiceanas.com)
├── .github/workflows/ # GitHub Actions CI/CD
└── .git/              # Version control
```

## Key Features

- **Hero Section**: Introduction with name, title, description, and developer quote
- **Responsive Design**: Mobile-first approach with breakpoints at 768px and 480px
- **Social Links**: GitHub and LinkedIn connections with hover effects
- **Mobile Navigation**: Hidden by default, toggles on smaller screens
- **Modern Styling**: Glassmorphism design with backdrop filters and gradient background

## Common Development Tasks

### Testing & Validation

Since this is a static site with no build process, testing involves:

- **Browser Testing**: Open `index.html` directly in a browser or serve locally
- **Local Server**: Run a simple HTTP server to test (e.g., `python -m http.server` or `npx serve`)
- **Responsive Testing**: Use browser DevTools to test at breakpoints (768px, 480px)
- **CSS/JS Changes**: No build step needed—changes are immediately visible

### Deployment

The site automatically deploys to GitHub Pages when code is pushed to the `main` branch via GitHub Actions (see `.github/workflows/`).

Manual deployment is optional since the workflow is automated.

### Code Organization

- **CSS**: All styles are in `styles.css`, organized by component (header, hero, buttons, responsive, etc.)
- **JavaScript**: All DOM interactions in `script.js` (mobile menu toggle, smooth scrolling, click handlers)
- **HTML**: Single-page layout in `index.html`; keep semantic markup focused

## Important Patterns & Guidelines

### Responsive Design

- Use `clamp()` for scalable typography (already implemented in hero section)
- Test at: 480px (mobile), 768px (tablet), and desktop widths
- Mobile menu is hidden on desktop, visible on mobile (see `.nav-links` styles)

### Styling

- Modern features in use: CSS gradients, backdrop filters, smooth transitions
- Maintain consistent color scheme: purple gradient background (`#667eea` to `#764ba2`)
- All text uses `rgba(255, 255, 255, ...)` with opacity for layering over gradient

### JavaScript

- No frameworks; focus on vanilla DOM manipulation
- Key selectors: `.nav-links`, `.mobile-menu-btn`, `.hero`, `.container`
- Event listeners attach to DOM on `DOMContentLoaded`
- Smooth scrolling handled for anchor links (`href^="#"`)

## Deployment & CI/CD

Two identical workflow files exist in `.github/workflows/`:
- `deploy.yml` and `static.yml` both handle automatic deployment to GitHub Pages
- Triggered on push to `main` branch or manual workflow dispatch
- No environment variables or secrets currently required

## Custom Domain

Site is configured with custom domain `noiceanas.com` via `CNAME` file. Do not modify the CNAME unless changing the domain.
