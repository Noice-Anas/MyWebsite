# Copilot Instructions for MyWebsite

## Project Overview

Static personal portfolio website for Anas Alhalabi (@Noice-Anas) showcasing work, services, and technical articles. Built with vanilla HTML/CSS/JavaScript, hosted on GitHub Pages at `noiceanas.com`. **Zero build tools or dependencies**—changes deploy directly from `main` branch.

## Architecture

### Bilingual Static Site Pattern

- Parallel HTML files for English/Arabic: `index.html` & `index-ar.html`, `articles.html` & `articles-ar.html`
- Language switching via separate HTML pages (NOT client-side routing)
- [i18n.js](../i18n.js) provides `data-i18n` attribute support for dynamic content on articles pages only
- [translations/translations.json](../translations/translations.json) stores nested translation keys (e.g., `hero.name`, `nav.home`)
- RTL support: Arabic pages set `dir="rtl"` on `<html>` element

### Component System (No Framework)

Modular vanilla JS components in [components/](../components/):

- [FluidCursor.js](../components/FluidCursor.js) - Self-initializing WebGL fluid dynamics (1000+ lines, auto-creates canvas overlay)
- [ProfileCard.js](../components/ProfileCard.js) - React component (legacy ES6 import syntax, not used)
- [ProfileCardInit.js](../components/ProfileCardInit.js) - **Active implementation** - React component rendered via CDN (no build step)
- Components initialize via `DOMContentLoaded` listeners or React.createRoot

### Article Content Management

- Articles live as individual HTML files in [articles/](../articles/) directory
- [articles-config.js](../articles-config.js) acts as metadata database with `articlesData` array containing:
  ```javascript
  {
    id,
      title,
      titleAr,
      date,
      description,
      descriptionAr,
      tags,
      tagsAr,
      readTime,
      featured;
  }
  ```
- [script.js](../script.js) `loadArticles()` dynamically generates article cards for homepage (3 recent) and articles page (all)
- `loadArticleHeader()` populates article metadata using `data-article-id` attribute on article pages

## Key Files & Responsibilities

| File                                                                        | Purpose                                                 |
| --------------------------------------------------------------------------- | ------------------------------------------------------- |
| [index.html](../index.html) / [index-ar.html](../index-ar.html)             | Main landing pages with hero, services, recent articles |
| [articles.html](../articles.html) / [articles-ar.html](../articles-ar.html) | Full article listing pages                              |
| [script.js](../script.js)                                                   | Mobile menu, article loading, smooth scrolling          |
| [styles.css](../styles.css)                                                 | All styling (1700+ lines, organized by component)       |
| [galaxy-bg.js](../galaxy-bg.js)                                             | Three.js animated particle background                   |
| [articles-config.js](../articles-config.js)                                 | Article metadata source of truth                        |
| [i18n.js](../i18n.js)                                                       | Translation utilities (only for dynamic content)        |

## Development Patterns

### Adding New Articles

1. Create `articles/article-slug.html` with `data-article-id="article-slug"` on container
2. Add metadata object to `articlesData` array in [articles-config.js](../articles-config.js) with matching `id`
3. Include both English and Arabic versions (`title`/`titleAr`, `description`/`descriptionAr`, `tags`/`tagsAr`)

### Styling Conventions

- **CSS Variables**: Extensive use of CSS custom properties in `:root` (see [styles.css#L53-L84](../styles.css#L53-L84))
- **Responsive Breakpoints**: `768px` (tablet), `480px` (mobile)
- **Color Scheme**: Purple gradient (`#667eea` to `#764ba2`), dark background (`#0a0a1a`)
- **Effects**: Glassmorphism via `backdrop-filter`, `clamp()` for fluid typography
- **BEM-like Classes**: Profile card uses `pc-` prefix (e.g., `pc-card`, `pc-behind`, `pc-glare`)

### JavaScript Patterns

- **No Modules**: All scripts load via `<script src="...">` tags in HTML
- **Global Functions**: Use `function` declarations for global scope (e.g., `loadArticles()`, `getArticleById()`)
- **Event Delegation**: Mobile menu uses single listener with `toggleMobileMenu()`
- **Arabic Locale**: Use `'ar-SA'` for date formatting, check `document.documentElement.lang === 'ar'`

### External Dependencies (CDN Only)

- React 18 + ReactDOM for ProfileCard component only
- Three.js r128 for galaxy background
- GSAP 3.12.5 + ScrollTrigger for animations
- No npm, no package.json, no bundler

## Deployment & Testing

### GitHub Pages Workflow

- [.github/workflows/static.yml](../.github/workflows/static.yml) auto-deploys on push to `main`
- No build step—entire repository deploys as-is
- CNAME file points to `noiceanas.com` custom domain

### Local Development

```bash
# Serve locally (any simple HTTP server works)
python3 -m http.server 8000
# or
npx serve
```

- Open `index.html` directly in browser for quick checks
- Use DevTools responsive mode to test breakpoints (768px, 480px)
- Changes are live immediately (no hot reload needed)

## Important Quirks & Gotchas

### i18n System Gotchas

- `initializeI18n()` conditionally runs: **NOT on homepage** (`index.html`, `index-ar.html`)
- Homepage uses hardcoded content, only article pages use `data-i18n` attributes
- Language preference stored in `localStorage` as `preferredLanguage`

### Profile Card Component

- **Active**: [ProfileCardInit.js](../components/ProfileCardInit.js) - React component using CDN React/ReactDOM (no build step)
- Renders via `ReactDOM.createRoot()` into `#profile-card-root` div
- Legacy [ProfileCard.js](../components/ProfileCard.js) with ES6 imports exists but is not used
- All styles in [styles.css](../styles.css) with `pc-` prefixed classes
- 3D tilt effects via CSS transforms and `--rotate-x` / `--rotate-y` custom properties
- Uses `React.createElement()` instead of JSX (no transpilation needed)

### FluidCursor WebGL

- Auto-initializes on import, no config needed for default behavior
- Creates full-page canvas overlay with `position: fixed; pointer-events: none; z-index: 9999`
- Performance intensive—1000+ line shader-based simulation

### Mobile Menu

- Hidden via `display: none` on desktop (>768px)
- Toggle visibility via `.active` class on `.nav-links`
- Button selector: `#mobile-menu-btn`, links close menu on click

## Cross-File Dependencies

```
index.html → script.js → articles-config.js → articlesData
                       → i18n.js (conditional)
index.html → galaxy-bg.js → Three.js CDN
index.html → components/FluidCursor.js (auto-init)
index.html → components/ProfileCardInit.js → React CDN → ReactDOM.createRoot()
articles.html → script.js → loadArticles(limit=null)
articles/[slug].html → script.js → loadArticleHeader()
                     → articles-config.js → getArticleById(id)
```

## AI Agent Best Practices

1. **Maintain Bilingual Parity**: Always update both English and Arabic versions when modifying content
2. **Preserve Zero-Build**: Avoid suggesting npm packages, bundlers, or compilation steps
3. **Test Both Languages**: Changes to article loading must work for `lang="en"` and `lang="ar"`
4. **Respect CSS Variable System**: Modify theme via `:root` variables, not hardcoded values
5. **Keep Components Self-Contained**: FluidCursor and ProfileCard should initialize independently
6. **Update Article Config**: New articles require metadata in `articlesData` array
7. **Verify GitHub Pages**: Ensure changes work when served from root path (no build folder)
