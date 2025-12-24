# MyWebsite - Next.js Portfolio

## Project Overview
Modern minimal portfolio built with Next.js 15 (App Router), TypeScript, and Tailwind CSS.
**Default language: Arabic (AR)** with English toggle support.

**Live Site:** https://noiceanas.com

---

## Tech Stack

### Core Framework
- **Framework:** Next.js 16.1+ (App Router)
- **Language:** TypeScript 5.0+
- **Styling:** Tailwind CSS 4.0+
- **i18n:** next-intl 3.0+
- **Package Manager:** npm

### Deployment
- **Platform:** github pages
- **Custom Domain:** noiceanas.com
- **Auto-deploy:** On push to main branch

---

## Design Philosophy

### Aesthetic Principles
- **Style:** Modern minimal (inspired by Apple, Linear, and contemporary design)
- **Layout:** Bento box/grid system for visual interest and hierarchy
- **Colors:** Deep black backgrounds, off-white text, subtle blue accents
- **Typography:** Clean sans-serif fonts (Inter for English, Cairo for Arabic)
- **Animations:** Subtle CSS transitions only - no heavy JavaScript animations
- **Performance:** Optimize for Core Web Vitals, Lighthouse score 90+
- **Accessibility:** WCAG 2.1 AA compliance, proper RTL support

### Design Constraints
- **NO** heavy animations (Three.js, GSAP)
- **NO** complex 3D effects or particle systems
- **NO** auto-playing videos or intensive graphics
- **YES** to glass-morphism and subtle hover effects
- **YES** to clean, spacious layouts with generous whitespace
- **YES** to fast, lightweight pages

---

## File Organization

### Directory Structure
```
MyWebsite-Next/
├── src/
│   ├── app/
│   │   ├── [locale]/              # Locale-based routing (ar, en)
│   │   │   ├── layout.tsx         # Root layout with RTL/LTR handling
│   │   │   ├── page.tsx           # Homepage
│   │   │   ├── about/             # About page (optional)
│   │   │   │   └── page.tsx
│   │   │   └── contact/           # Contact page (optional)
│   │   │       └── page.tsx
│   │   ├── layout.tsx             # App-wide root layout
│   │   ├── globals.css            # Tailwind imports + base styles
│   │   └── not-found.tsx          # 404 page
│   │
│   ├── components/
│   │   ├── layout/                # Layout components
│   │   │   ├── Header.tsx         # Navigation with language toggle
│   │   │   ├── Footer.tsx         # Footer with social links
│   │   │   └── BentoGrid.tsx      # Reusable bento grid system
│   │   │
│   │   ├── sections/              # Page sections
│   │   │   ├── Hero.tsx           # Hero section (name, title, bio)
│   │   │   ├── Projects.tsx       # Projects/work portfolio section
│   │   │   ├── About.tsx          # About section
│   │   │   └── Contact.tsx        # Contact section
│   │   │
│   │   └── ui/                    # Reusable UI components
│   │       ├── Button.tsx         # Button component
│   │       ├── Card.tsx           # Card component for bento grid
│   │       └── LanguageToggle.tsx # Language switcher component
│   │
│   ├── lib/
│   │   ├── i18n.ts                # i18n configuration (next-intl)
│   │   └── utils.ts               # Utility functions (cn, etc.)
│   │
│   ├── data/
│   │   ├── projects.ts            # Portfolio projects data
│   │   └── content.ts             # Other static content
│   │
│   ├── messages/                  # Translation files
│   │   ├── ar.json                # Arabic translations (default)
│   │   └── en.json                # English translations
│   │
│   └── types/
│       └── index.ts               # TypeScript type definitions
│
├── public/
│   ├── assets/
│   │   ├── anas_headshot.png      # Profile photo (optimized <100KB)
│   │   ├── anas_logo.svg          # Logo (optimized <50KB)
│   │   └── projects/              # Project images
│   ├── favicon.ico
│   └── robots.txt
│
├── .env.local                     # Environment variables
├── .gitignore
├── next.config.mjs                # Next.js configuration
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json
├── CLAUDE.md                      # This file (project source of truth)
└── README.md
```

### Naming Conventions

#### Files
- **Components:** PascalCase (e.g., `BentoGrid.tsx`, `LanguageToggle.tsx`)
- **Pages:** lowercase (e.g., `page.tsx`, `layout.tsx`)
- **Utilities:** camelCase (e.g., `utils.ts`, `i18n.ts`)
- **Data files:** camelCase (e.g., `projects.ts`, `content.ts`)
- **Locales:** Lowercase (e.g., `[locale]`, `ar`, `en`)

#### Code
- **Components:** PascalCase (e.g., `export function BentoGrid()`)
- **Props interfaces:** ComponentNameProps (e.g., `BentoGridProps`)
- **Functions:** camelCase (e.g., `getProjects()`, `formatDate()`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `DEFAULT_LOCALE`, `SUPPORTED_LOCALES`)
- **Types/Interfaces:** PascalCase (e.g., `Project`, `Translation`)

---

## Coding Standards

### TypeScript

#### Strict Mode
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true
  }
}
```

#### Type Definitions
- **Prefer interfaces over types** for object shapes
- **Use explicit return types** for exported functions
- **No `any` types** - use `unknown` if type is uncertain
- **Define prop types** for all components

```typescript
// Good
interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps): JSX.Element {
  return <div className={cn("grid", className)}>{children}</div>
}

// Bad
export function BentoGrid({ children, className }: any) {
  return <div className={className}>{children}</div>
}
```

### React & Next.js

#### Server Components First
- **Default to Server Components** - use Client Components only when needed
- **Use `'use client'` directive** only for interactive components
- **Prefer async Server Components** over `useEffect` for data fetching
- **Use Next.js `<Image>` component** for all images

```typescript
// Server Component (default)
export default async function HomePage() {
  const data = await fetchData()
  return <div>{data.title}</div>
}

// Client Component (only when needed)
'use client'

import { useState } from 'react'

export function LanguageToggle() {
  const [locale, setLocale] = useState('ar')
  // ...
}
```

#### Image Optimization
Always use Next.js `<Image>` component:

```typescript
import Image from 'next/image'

<Image
  src="/assets/anas_headshot.png"
  alt="Anas Alhalabi"
  width={400}
  height={400}
  quality={85}
  priority // For above-fold images
  className="rounded-2xl"
/>
```

### Tailwind CSS

#### Class Organization
Use Tailwind utility classes over custom CSS when possible:

```typescript
// Good
<div className="bg-background-elevated rounded-2xl p-6 md:p-8 border border-border hover:border-border-hover transition-colors">

// Avoid
<div className="custom-card">
// with custom CSS in styles.css
```

#### Conditional Classes
Use the `cn()` utility for conditional classes:

```typescript
import { cn } from '@/lib/utils'

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)}>
```

#### Mobile-First Responsive Design
Always start with mobile styles, then add breakpoints:

```typescript
// Good - mobile first
<div className="text-sm md:text-base lg:text-lg">

// Bad - desktop first
<div className="text-lg md:text-base sm:text-sm">
```

#### RTL Support
Use logical properties for RTL compatibility:

```typescript
// Good - works in RTL and LTR
<div className="ms-4 me-2">  // margin-start, margin-end

// Bad - doesn't adapt to RTL
<div className="ml-4 mr-2">  // margin-left, margin-right
```

### Internationalization (i18n)

#### Translation Files
All user-facing text must be in translation files:

```typescript
// src/messages/ar.json
{
  "hero": {
    "welcomeMessage": "مرحباً، أنا أنس",
    "title": "مطور ومصمم"
  }
}

// src/messages/en.json
{
  "hero": {
    "welcomeMessage": "Hi, I'm Anas",
    "title": "Developer & Designer"
  }
}
```

#### Translation Keys
- Use **camelCase** for translation keys
- Organize by **section/component** (e.g., `hero.title`, `projects.viewMore`)
- Keep keys **synchronized** across all locale files

#### Using Translations

**In Client Components:**
```typescript
'use client'

import { useTranslations } from 'next-intl'

export function Hero() {
  const t = useTranslations('hero')
  return <h1>{t('welcomeMessage')}</h1>
}
```

**In Server Components:**
```typescript
import { getTranslations } from 'next-intl/server'

export default async function HomePage() {
  const t = await getTranslations('hero')
  return <h1>{t('welcomeMessage')}</h1>
}
```

---

## Design System (Tailwind Configuration)

### Color Palette

The design system supports both **light** and **dark** modes using Tailwind's `dark:` variant.

**Usage in code:**
```typescript
// Automatically adapts based on system preference or manual toggle
<div className="bg-background text-foreground">
  <div className="bg-elevated border border-border hover:border-border-hover">
    Content
  </div>
</div>
```

**Tailwind Configuration:**

```typescript
// tailwind.config.ts
colors: {
  background: {
    DEFAULT: 'hsl(var(--background))',
    elevated: 'hsl(var(--background-elevated))',
    glass: 'hsl(var(--background-glass))',
  },
  foreground: {
    DEFAULT: 'hsl(var(--foreground))',
    muted: 'hsl(var(--foreground-muted))',
    subtle: 'hsl(var(--foreground-subtle))',
  },
  border: {
    DEFAULT: 'hsl(var(--border))',
    hover: 'hsl(var(--border-hover))',
  },
  accent: {
    DEFAULT: 'hsl(var(--accent))',
    hover: 'hsl(var(--accent-hover))',
    foreground: 'hsl(var(--accent-foreground))',
  },
  destructive: {
    DEFAULT: 'hsl(var(--destructive))',
    foreground: 'hsl(var(--destructive-foreground))',
  },
  muted: {
    DEFAULT: 'hsl(var(--muted))',
    foreground: 'hsl(var(--muted-foreground))',
  },
}
```

**CSS Variables (in `globals.css`):**

```css
@layer base {
  :root {
    /* Light Mode */
    --background: 0 0% 100%;                    /* White */
    --background-elevated: 0 0% 98%;            /* Off-white */
    --background-glass: 0 0% 96% / 0.8;         /* Glass effect */

    --foreground: 222 47% 11%;                  /* Dark gray */
    --foreground-muted: 215 16% 47%;            /* Medium gray */
    --foreground-subtle: 220 9% 66%;            /* Light gray */

    --border: 214 32% 91%;                      /* Light border */
    --border-hover: 214 32% 85%;                /* Hover border */

    --accent: 221 83% 53%;                      /* Blue */
    --accent-hover: 221 83% 45%;                /* Darker blue */
    --accent-foreground: 0 0% 100%;             /* White text on accent */

    --destructive: 0 84% 60%;                   /* Red */
    --destructive-foreground: 0 0% 100%;        /* White */

    --muted: 210 40% 96%;                       /* Light muted bg */
    --muted-foreground: 215 16% 47%;            /* Muted text */

    --radius: 0.5rem;                           /* Default border radius */
  }

  .dark {
    /* Dark Mode */
    --background: 222 47% 4%;                   /* Deep black */
    --background-elevated: 222 47% 8%;          /* Card backgrounds */
    --background-glass: 0 0% 100% / 0.05;       /* Glass effect */

    --foreground: 0 0% 98%;                     /* Off-white */
    --foreground-muted: 215 20% 65%;            /* Light gray */
    --foreground-subtle: 217 10% 40%;           /* Medium gray */

    --border: 0 0% 100% / 0.1;                  /* Transparent white */
    --border-hover: 0 0% 100% / 0.2;            /* Lighter transparent */

    --accent: 221 83% 53%;                      /* Blue */
    --accent-hover: 221 83% 45%;                /* Darker blue */
    --accent-foreground: 0 0% 100%;             /* White text */

    --destructive: 0 84% 60%;                   /* Red */
    --destructive-foreground: 0 0% 100%;        /* White */

    --muted: 217 33% 17%;                       /* Dark muted bg */
    --muted-foreground: 215 20% 65%;            /* Muted text */
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}
```

**Color Reference:**

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `background` | White | Deep Black | Page background |
| `background-elevated` | Off-white | Dark Gray | Cards, elevated surfaces |
| `background-glass` | Light Gray (80%) | White (5%) | Glass-morphism effect |
| `foreground` | Dark Gray | Off-white | Primary text |
| `foreground-muted` | Medium Gray | Light Gray | Secondary text |
| `foreground-subtle` | Light Gray | Medium Gray | Tertiary text |
| `border` | Light Border | White (10%) | Default borders |
| `border-hover` | Medium Border | White (20%) | Hover state borders |
| `accent` | Blue | Blue | Primary actions |
| `accent-hover` | Darker Blue | Darker Blue | Accent hover state |
| `destructive` | Red | Red | Destructive actions |
| `muted` | Light Muted | Dark Muted | Muted backgrounds |

### Typography

**Font Families:**
- **English:** Inter (Google Fonts) - 400, 500, 600 weights
- **Arabic:** Cairo (Google Fonts) - 400, 500, 600 weights

**Font Sizes:**
Use fluid typography with `clamp()` for responsive scaling:

```typescript
fontSize: {
  'xs': ['0.75rem', { lineHeight: '1rem' }],
  'sm': ['0.875rem', { lineHeight: '1.25rem' }],
  'base': ['1rem', { lineHeight: '1.5rem' }],
  'lg': ['1.125rem', { lineHeight: '1.75rem' }],
  'xl': ['1.25rem', { lineHeight: '1.75rem' }],
  '2xl': ['1.5rem', { lineHeight: '2rem' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
}
```

**Line Heights:**
- Body text: 1.6-1.8 (relaxed)
- Headings: 1.2-1.4 (tight)

### Spacing

Use Tailwind's default spacing scale (4px base unit):
- **Micro:** `gap-2` (8px), `p-2` (8px)
- **Small:** `gap-4` (16px), `p-4` (16px)
- **Medium:** `gap-6` (24px), `p-6` (24px)
- **Large:** `gap-8` (32px), `p-8` (32px)
- **XL:** `gap-12` (48px), `p-12` (48px)

### Border Radius

```typescript
borderRadius: {
  'sm': '0.25rem',   // 4px
  'md': '0.5rem',    // 8px
  'lg': '0.75rem',   // 12px
  'xl': '1rem',      // 16px
  '2xl': '1.5rem',   // 24px - cards
  '4xl': '2rem',     // 32px - large cards
}
```

### Shadows

Use subtle shadows for elevation:

```typescript
boxShadow: {
  'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
}
```

---

## Component Patterns

### Bento Grid Layout

The core layout system for the homepage:

```typescript
// Usage
<BentoGrid>
  <BentoCard span="col-span-12 md:col-span-8">
    <Hero />
  </BentoCard>
  <BentoCard span="col-span-12 md:col-span-4">
    <ProfilePhoto />
  </BentoCard>
</BentoGrid>
```

**Grid Configuration:**
- **Mobile:** Single column (col-span-12)
- **Tablet:** 12-column grid with flexible spans
- **Desktop:** 12-column grid with balanced layout

**Common Span Patterns:**
- Full width: `col-span-12`
- Half width: `col-span-12 md:col-span-6`
- Two-thirds: `col-span-12 md:col-span-8`
- One-third: `col-span-12 md:col-span-4`

### Glass-Morphism Effect

Standard glass card styling:

```typescript
className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl"
```

### Hover Effects

Subtle hover interactions:

```typescript
// Border glow
className="border border-border hover:border-border-hover transition-colors duration-200"

// Slight lift
className="hover:-translate-y-1 transition-transform duration-200"

// Combined
className="border border-border hover:border-border-hover hover:-translate-y-1 transition-all duration-200"
```

### Theme Toggle (Light/Dark Mode)

The theme toggle allows users to switch between light and dark modes:

**Implementation:**
- Uses `localStorage` to persist user preference
- Respects system preference (`prefers-color-scheme`) as default
- Prevents flash of wrong theme on page load
- Adds/removes `.dark` class on `<html>` element

**Usage in Header:**

```typescript
import { ThemeToggle } from '@/components/ui/ThemeToggle'

<ThemeToggle />
```

**How it works:**
1. On mount, checks `localStorage.getItem('theme')`
2. Falls back to system preference if no saved theme
3. Applies theme by toggling `.dark` class on `document.documentElement`
4. All colors automatically adapt via CSS variables

**Testing theme toggle:**
- Verify theme persists across page reloads
- Check that all components adapt colors correctly
- Ensure no flash of wrong theme on initial load
- Test with system dark mode enabled/disabled

---

## Data Management

### Projects Data Structure

**File:** `src/data/projects.ts`

```typescript
export interface Project {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  imageUrl: string;
  featured: boolean;
  order: number;
}

export const projects: Project[] = [
  {
    id: 'project-1',
    titleEn: 'E-commerce Platform',
    titleAr: 'منصة تجارة إلكترونية',
    descriptionEn: 'Full-stack e-commerce with Next.js and Stripe',
    descriptionAr: 'منصة تجارة إلكترونية متكاملة مع Next.js و Stripe',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/repo',
    imageUrl: '/assets/projects/ecommerce.png',
    featured: true,
    order: 1
  },
  // ... more projects
]
```

**Guidelines:**
- Always provide **both English and Arabic** versions of text
- Use **featured flag** to highlight key projects
- Use **order field** to control display sequence
- Keep **tags array** to 3-5 items
- Optimize **project images** to <50KB

---

## Performance Guidelines

### Image Optimization
- **Hero images:** <100KB (WebP format)
- **Project images:** <50KB (WebP format)
- **Use `next/image`** with appropriate `width`, `height`, and `quality`
- **Lazy load** below-fold images (default Next.js behavior)
- **Priority load** above-fold images with `priority` prop

### Bundle Size
- **Initial JS:** Target <200KB
- **Use dynamic imports** for heavy components
- **Tree-shake** unused dependencies

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint):** <2.5s
- **FID (First Input Delay):** <100ms
- **CLS (Cumulative Layout Shift):** <0.1

### Lighthouse Score Target
- **Performance:** 90+
- **Accessibility:** 90+
- **Best Practices:** 90+
- **SEO:** 90+

---

## SEO & Metadata

### Bilingual SEO Strategy

Every page must include:
- **Title and description** in both languages
- **hreflang tags** for language alternatives
- **Open Graph tags** for social sharing
- **Twitter Card tags**
- **Canonical URLs**

**Example metadata (Server Component):**

```typescript
// src/app/[locale]/page.tsx
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://noiceanas.com/${locale}`,
      languages: {
        'ar': 'https://noiceanas.com/ar',
        'en': 'https://noiceanas.com/en',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: 'https://noiceanas.com',
      siteName: 'Anas Alhalabi Portfolio',
      images: [
        {
          url: '/assets/anas_headshot.png',
          width: 1200,
          height: 630,
          alt: t('imageAlt'),
        }
      ],
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/assets/anas_headshot.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
```

---

## Git Workflow

### Branch Strategy
- **main:** Production-ready code (auto-deploys to GitHub Pages)
- **develop:** Integration branch for features
- **feature/*:** Feature branches (e.g., `feature/projects-section`)
- **fix/*:** Bug fix branches (e.g., `fix/rtl-layout`)
- **refactor/*:** Refactoring branches

### Commit Messages
Use descriptive, imperative mood commit messages:

**Format:** `[Type] Brief description`

**Types:**
- `[Feature]` - New feature
- `[Fix]` - Bug fix
- `[Refactor]` - Code refactoring
- `[Style]` - Styling changes
- `[Docs]` - Documentation updates
- `[Config]` - Configuration changes

**Examples:**
```
[Feature] Add projects section with bento grid layout
[Fix] Resolve RTL text alignment in Hero section
[Refactor] Extract language toggle to separate component
[Style] Update hover effects on project cards
[Docs] Update CLAUDE.md with component patterns
[Config] Configure next-intl with Arabic default locale
```

### Pull Request Requirements
- **Descriptive title** following commit message format
- **Description** explaining what and why
- **Screenshots** for UI changes
- **Test checklist** for functionality
- **Review required** before merging to main

---

## Arabic Language Considerations

### Default Language
- **Primary locale:** Arabic (`ar`)
- **URL structure:** `/ar` (default), `/en` (toggle)
- **Root redirect:** `/` → `/ar`

### RTL (Right-to-Left) Support
- **Automatic direction:** `dir="rtl"` for Arabic pages
- **Logical properties:** Use `ms-*`, `me-*`, `ps-*`, `pe-*` instead of `ml-*`, `mr-*`, `pl-*`, `pr-*`
- **RTL plugin:** `tailwindcss-rtl` for directional utilities
- **Test thoroughly:** All layouts must work in both RTL and LTR

### Font Requirements
- **Arabic font:** Cairo (clean, modern, excellent legibility)
- **Support weights:** 400 (regular), 500 (medium), 600 (semibold)
- **Fallback:** System Arabic fonts

### Content Guidelines
- **All text** must have Arabic translations
- **Date formatting:** Use Arabic calendar where appropriate
- **Number formatting:** Consider Arabic numerals (٠-٩) vs Western (0-9)
- **Cultural considerations:** Ensure content is culturally appropriate

---

## Testing Checklist

### Before Every Deployment

#### Functionality
- [ ] Homepage loads in Arabic by default (`/` → `/ar`)
- [ ] Language toggle switches between `/ar` and `/en`
- [ ] RTL layout renders correctly (text alignment, spacing)
- [ ] LTR layout renders correctly when switched to English
- [ ] Theme toggle switches between light and dark modes
- [ ] Theme preference persists across page reloads
- [ ] Light mode colors have proper contrast and readability
- [ ] Dark mode colors have proper contrast and readability
- [ ] No flash of wrong theme on initial page load
- [ ] All images load and are optimized
- [ ] All links work (internal and external)
- [ ] Forms submit correctly (if applicable)
- [ ] Mobile menu works on mobile devices

#### Responsive Design
- [ ] Test on mobile (320px, 375px, 414px widths)
- [ ] Test on tablet (768px, 1024px widths)
- [ ] Test on desktop (1440px, 1920px widths)
- [ ] Bento grid adapts gracefully at all breakpoints
- [ ] Text remains readable at all sizes
- [ ] Images scale appropriately

#### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Safari (latest) - especially important for macOS users
- [ ] Firefox (latest)
- [ ] Safari iOS (test on real device)
- [ ] Chrome Android (test on real device if possible)

#### Performance
- [ ] Lighthouse score >90 on all metrics
- [ ] Images optimized (<100KB hero, <50KB projects)
- [ ] No console errors or warnings
- [ ] Fast page load (<3s on 3G)
- [ ] Smooth animations and transitions

#### SEO & Metadata
- [ ] Meta tags present for both languages
- [ ] Open Graph preview works (test with Facebook/LinkedIn preview)
- [ ] Twitter Card preview works
- [ ] Hreflang tags correct (`ar_SA`, `en_US`)
- [ ] Sitemap generated and accessible
- [ ] robots.txt configured correctly

#### Accessibility
- [ ] All images have `alt` text
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Keyboard navigation works
- [ ] Screen reader tested (VoiceOver on macOS/iOS)
- [ ] Focus indicators visible

---

## Deployment

### Platform: GitHub Pages

#### Requirements
- Next.js must be configured for **static export** (`output: 'export'` in `next.config.mjs`)
- No server-side features (API routes, ISR, SSR)
- All pages must be statically generated at build time

#### Configuration

**File: `next.config.mjs`**
```javascript
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/lib/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Required for GitHub Pages
  images: {
    unoptimized: true,  // GitHub Pages doesn't support image optimization
  },
  basePath: '',  // Leave empty for custom domain, or set to repo name for username.github.io/repo
}

export default withNextIntl(nextConfig)
```

#### Build & Deploy

**GitHub Actions Workflow** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - run: npm ci
      - run: npm run build

      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

#### Custom Domain Setup
1. Add `CNAME` file to `public/` directory with domain name: `noiceanas.com`
2. Configure DNS records:
   - **A Record**: Point to GitHub Pages IPs (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153)
   - **Or CNAME**: Point to `yourusername.github.io`
3. Enable "Enforce HTTPS" in repository settings
4. Wait for DNS propagation (up to 24-48 hours)

#### Local Testing
```bash
# Build for production
npm run build

# Serve static files locally (install serve globally first)
npx serve out

# Or use Next.js built-in static server
npx serve@latest out
```

#### Important Limitations
- **No dynamic image optimization** - All images must be pre-optimized
- **No API routes** - Use external APIs or serverless functions elsewhere
- **No ISR/SSR** - Everything is statically generated at build time
- **Client-side routing only** - Use Next.js Link component for navigation

---

## Maintenance & Updates

### Adding New Projects
1. Add project data to `src/data/projects.ts`
2. Add project image to `public/assets/projects/`
3. Update translations in `src/messages/ar.json` and `en.json` (if needed)
4. Test display on homepage
5. Commit and push

### Adding New Pages
1. Create `src/app/[locale]/new-page/page.tsx`
2. Add translations for the page
3. Update navigation in `src/components/layout/Header.tsx`
4. Generate metadata for SEO
5. Test in both languages

---

## Troubleshooting

### Common Issues

#### RTL Layout Not Working
- Check `dir` attribute in `src/app/[locale]/layout.tsx`
- Verify Tailwind RTL plugin is installed
- Use logical properties (`ms-*`, `me-*`) instead of directional (`ml-*`, `mr-*`)

#### Translations Not Showing
- Check translation key exists in both `ar.json` and `en.json`
- Verify `useTranslations` hook is using correct namespace
- Ensure locale is passed correctly in URL (`/ar` or `/en`)

#### Images Not Optimizing
- Verify using Next.js `<Image>` component
- Check `width` and `height` props are set
- Ensure images are in `public/` directory
- Note: GitHub Pages uses static export, ensure `next.config.mjs` has `output: 'export'`
- Pre-optimize images before committing (use Squoosh or similar tools)

#### Build Errors
- Run `npm run build` locally first
- Check TypeScript errors with `npm run type-check`
- Verify all dependencies are installed
- Clear `.next` cache and rebuild

---

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [next-intl Docs](https://next-intl-docs.vercel.app)

### Design Inspiration
- [Linear](https://linear.app) - Modern minimal design
- [Apple](https://apple.com) - Clean, spacious layouts
- [Vercel](https://vercel.com) - Bento grid examples
- [Stripe](https://stripe.com) - Glass-morphism effects

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance testing
- [SVGO](https://github.com/svg/svgo) - SVG optimization
- [Squoosh](https://squoosh.app) - Image optimization
- [Can I Use](https://caniuse.com) - Browser compatibility

---

## Contact & Support

**Developer:** Anas Alhalabi
**Website:** https://noiceanas.com
**GitHub:** https://github.com/Noice-Anas
**LinkedIn:** https://www.linkedin.com/in/anas-al-halabi/
**Substack:** https://substack.com/@noiceanas

For questions or issues with this project, please refer to this document first. This `CLAUDE.md` file serves as the **single source of truth** for all development decisions, coding standards, and project guidelines.

---

**Last Updated:** December 24, 2025
**Version:** 2.0 (Next.js Migration)
