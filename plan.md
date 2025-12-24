# Next.js + Tailwind Migration Implementation Plan

## Overview
This document provides a step-by-step implementation guide for migrating your portfolio from vanilla HTML/CSS/JS to Next.js 16.1.1 + Tailwind CSS.

**Current Status:** Planning Phase
**Target Completion:** 14 days (2 weeks)

---

## Pre-Migration Checklist

Before starting implementation:
- [x] Create CLAUDE.md as source of truth
- [x] Create plan.md for implementation tracking
- [ ] Back up current website
- [ ] Create new GitHub branch: `version-2.0-nextjs`
- [ ] Review and approve the migration plan

---

## Phase 1: Foundation Setup (Days 1-2)

### Step 1.1: Initialize Next.js Project

**Location:** `/Users/anasalhalabi/Desktop/`

```bash
# Create new Next.js project
npx create-next-app@latest MyWebsite-Next \
  --typescript \
  --tailwind \
  --app \
  --eslint \
  --import-alias "@/*"

cd MyWebsite-Next
```

**Options to select:**
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ src/ directory
- ✅ App Router
- ✅ Import alias (@/*)
- ❌ Turbopack (not stable yet)

### Step 1.2: Install Required Dependencies

```bash
# Install i18n library
npm install next-intl

# Install Tailwind RTL plugin
npm install -D tailwindcss-rtl

# Install utility library for class merging
npm install clsx tailwind-merge
```

### Step 1.3: Create Folder Structure

```bash
# Create component directories
mkdir -p src/components/layout
mkdir -p src/components/sections
mkdir -p src/components/ui

# Create data directory
mkdir -p src/data

# Create lib directory
mkdir -p src/lib

# Create messages directory
mkdir -p src/messages

# Create types directory
mkdir -p src/types

# Create assets directory in public
mkdir -p public/assets/projects
```

### Step 1.4: Configure Tailwind

**File:** `tailwind.config.ts`

Replace contents with:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-cairo)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
}

export default config
```

**Note:** Colors now use CSS variables for light/dark mode support. See Step 2.2 for CSS variable definitions.

### Step 1.5: Setup i18n Configuration

**File:** `src/lib/i18n.ts`

```typescript
import { getRequestConfig } from 'next-intl/server'

export const locales = ['ar', 'en'] as const
export const defaultLocale = 'ar' as const

export type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`@/messages/${locale}.json`)).default,
  timeZone: 'Asia/Riyadh',
  now: new Date()
}))
```

**File:** `next.config.mjs`

Replace contents with:

```javascript
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/lib/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Required for GitHub Pages static export
  images: {
    unoptimized: true,  // GitHub Pages doesn't support image optimization
  },
}

export default withNextIntl(nextConfig)
```

**Note:** This configuration is set up for GitHub Pages deployment with static export. All pages will be pre-rendered at build time.

**File:** `src/middleware.ts`

```typescript
import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './lib/i18n'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
})

export const config = {
  matcher: ['/', '/(ar|en)/:path*']
}
```

### Step 1.6: Create Utility Functions

**File:** `src/lib/utils.ts`

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Checklist:**
- [ ] Next.js project initialized
- [ ] Dependencies installed
- [ ] Folder structure created
- [ ] Tailwind configured with design tokens
- [ ] i18n configured with Arabic default
- [ ] Middleware created for locale routing
- [ ] Utility functions added

---

## Phase 2: Core Layout Components (Days 3-4)

### Step 2.1: Setup Root Layouts

**File:** `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://noiceanas.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
```

**File:** `src/app/[locale]/layout.tsx`

```typescript
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { locales } from '@/lib/i18n'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cairo = localFont({
  src: '../fonts/Cairo-VariableFont_wght.ttf',
  variable: '--font-cairo',
  display: 'swap',
})

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    title: {
      template: '%s | Anas Alhalabi',
      default: t('title'),
    },
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
      siteName: 'Anas Alhalabi',
      images: [
        {
          url: '/assets/anas_headshot.png',
          width: 1200,
          height: 630,
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
  }
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale as any)) {
    notFound()
  }

  const direction = locale === 'ar' ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={direction}>
      <body className={`${inter.variable} ${cairo.variable} ${locale === 'ar' ? 'font-arabic' : 'font-sans'} bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  )
}
```

### Step 2.2: Update Global Styles

**File:** `src/app/globals.css`

Replace contents with CSS variables for light/dark mode support:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Light Mode Colors */
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
    /* Dark Mode Colors */
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
    @apply bg-background text-foreground transition-colors;
  }
}
```

**Important Notes:**
- Colors use HSL format without `hsl()` wrapper (Tailwind requirement)
- Light mode is default (`:root`)
- Dark mode uses `.dark` class (applied via JavaScript or system preference)
- All components will automatically adapt to theme changes

### Step 2.3: Create BentoGrid Component

**File:** `src/components/layout/BentoGrid.tsx`

```typescript
import { cn } from '@/lib/utils'

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn(
      'grid grid-cols-12 gap-4 md:gap-6 auto-rows-[minmax(200px,auto)]',
      className
    )}>
      {children}
    </div>
  )
}

interface BentoCardProps {
  children: React.ReactNode
  className?: string
  span?: string
}

export function BentoCard({
  children,
  className,
  span = 'col-span-12 md:col-span-6'
}: BentoCardProps) {
  return (
    <div className={cn(
      'group relative overflow-hidden',
      'bg-background-elevated border border-border',
      'rounded-2xl p-6 md:p-8',
      'hover:border-border-hover transition-colors duration-200',
      span,
      className
    )}>
      {children}
    </div>
  )
}
```

### Step 2.4: Create Header Component

**File:** `src/components/layout/Header.tsx`

```typescript
'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export function Header() {
  const t = useTranslations('nav')
  const params = useParams()
  const locale = params.locale as string

  return (
    <header className="fixed top-0 start-0 end-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="text-xl font-semibold hover:text-accent transition-colors"
        >
          Anas
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}#projects`}
            className="text-sm text-foreground-muted hover:text-foreground transition-colors"
          >
            {t('projects')}
          </Link>
          <Link
            href={`/${locale}#contact`}
            className="text-sm text-foreground-muted hover:text-foreground transition-colors"
          >
            {t('contact')}
          </Link>

          {/* Theme and Language Toggles */}
          <div className="flex items-center gap-2 ms-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}
```

### Step 2.5: Create Language Toggle Component

**File:** `src/components/ui/LanguageToggle.tsx`

```typescript
'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'

export function LanguageToggle() {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()

  const currentLocale = params.locale as string
  const otherLocale = currentLocale === 'ar' ? 'en' : 'ar'

  const handleToggle = () => {
    const newPathname = pathname.replace(`/${currentLocale}`, `/${otherLocale}`)
    router.push(newPathname)
  }

  return (
    <button
      onClick={handleToggle}
      className="px-3 py-1.5 text-sm border border-border rounded-lg hover:border-border-hover hover:bg-background-elevated transition-colors"
      aria-label={`Switch to ${otherLocale === 'ar' ? 'Arabic' : 'English'}`}
    >
      {otherLocale === 'ar' ? 'العربية' : 'EN'}
    </button>
  )
}
```

### Step 2.6: Create Theme Toggle Component

**File:** `src/components/ui/ThemeToggle.tsx`

```typescript
'use client'

import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const initialTheme = savedTheme || systemTheme

    setTheme(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  // Prevent flash of wrong theme
  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg border border-border" />
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-border hover:border-border-hover hover:bg-background-elevated transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        // Moon icon for dark mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg>
      ) : (
        // Sun icon for light mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
      )}
    </button>
  )
}
```

**Alternative: Script to Prevent Flash (Add to layout)**

Add this script before the body closes in `src/app/layout.tsx`:

```typescript
<script
  dangerouslySetInnerHTML={{
    __html: `
      try {
        const theme = localStorage.getItem('theme') ||
          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', theme === 'dark');
      } catch (e) {}
    `,
  }}
/>
```

### Step 2.7: Create Footer Component

**File:** `src/components/layout/Footer.tsx`

```typescript
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="border-t border-border mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground-muted">
            © {new Date().getFullYear()} Anas Alhalabi. {t('rights')}
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-muted hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-muted hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

**Checklist:**
- [ ] Root layouts created
- [ ] Fonts configured (Inter + Cairo)
- [ ] Global styles updated with CSS variables for light/dark mode
- [ ] BentoGrid component built
- [ ] Header component built
- [ ] Theme toggle working (light/dark mode)
- [ ] Language toggle working (AR/EN)
- [ ] Footer component built

---

## Phase 3: Content Migration (Days 5-7)

### Step 3.1: Optimize Assets

**Headshot Image:**
```bash
# Using Squoosh or ImageOptim to compress
# Target: <100KB, WebP format
# Recommended size: 800x800px

# Move to public directory
cp /Users/anasalhalabi/Desktop/MyWebsite/assets/anas_headshot.png \
   /Users/anasalhalabi/Desktop/MyWebsite-Next/public/assets/
```

**Logo:**
```bash
# Using SVGO to optimize
npx svgo /Users/anasalhalabi/Desktop/MyWebsite/assets/anas_logo.svg \
         -o /Users/anasalhalabi/Desktop/MyWebsite-Next/public/assets/anas_logo.svg
```

### Step 3.2: Extract Content from Current Site

Read `index.html` and `index-ar.html` to extract:
- Hero section text (name, title, bio)
- Contact information
- Social links
- Any other content to preserve

### Step 3.3: Create Translation Files

**File:** `src/messages/ar.json`

```json
{
  "metadata": {
    "title": "أنس الحلبي - مطور ومصمم",
    "description": "مطور ومصمم متخصص في بناء تجارب رقمية حديثة",
    "imageAlt": "أنس الحلبي"
  },
  "nav": {
    "projects": "المشاريع",
    "contact": "تواصل"
  },
  "hero": {
    "greeting": "مرحباً، أنا أنس",
    "title": "مطور ومصمم",
    "bio": "أبني تجارب رقمية حديثة ومبتكرة باستخدام أحدث التقنيات"
  },
  "projects": {
    "title": "المشاريع",
    "viewProject": "عرض المشروع",
    "viewCode": "الكود المصدري"
  },
  "contact": {
    "title": "تواصل معي",
    "description": "دعنا نعمل معاً على مشروعك القادم",
    "email": "البريد الإلكتروني"
  },
  "footer": {
    "rights": "جميع الحقوق محفوظة"
  }
}
```

**File:** `src/messages/en.json`

```json
{
  "metadata": {
    "title": "Anas Alhalabi - Developer & Designer",
    "description": "Developer and designer specialized in building modern digital experiences",
    "imageAlt": "Anas Alhalabi"
  },
  "nav": {
    "projects": "Projects",
    "contact": "Contact"
  },
  "hero": {
    "greeting": "Hi, I'm Anas",
    "title": "Developer & Designer",
    "bio": "I build modern and innovative digital experiences using cutting-edge technologies"
  },
  "projects": {
    "title": "Projects",
    "viewProject": "View Project",
    "viewCode": "View Code"
  },
  "contact": {
    "title": "Get in Touch",
    "description": "Let's work together on your next project",
    "email": "Email"
  },
  "footer": {
    "rights": "All rights reserved"
  }
}
```

### Step 3.4: Create Hero Section

**File:** `src/components/sections/Hero.tsx`

```typescript
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { BentoCard } from '@/components/layout/BentoGrid'

export function Hero() {
  const t = useTranslations('hero')

  return (
    <>
      <BentoCard span="col-span-12 md:col-span-8">
        <div className="flex flex-col justify-center h-full">
          <p className="text-foreground-muted text-lg mb-2">
            {t('greeting')}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-foreground-muted text-lg max-w-2xl">
            {t('bio')}
          </p>
        </div>
      </BentoCard>

      <BentoCard span="col-span-12 md:col-span-4" className="flex items-center justify-center">
        <div className="relative w-full aspect-square max-w-sm">
          <Image
            src="/assets/anas_headshot.png"
            alt="Anas Alhalabi"
            fill
            className="rounded-2xl object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      </BentoCard>
    </>
  )
}
```

### Step 3.5: Create Contact Section

**File:** `src/components/sections/Contact.tsx`

```typescript
import { useTranslations } from 'next-intl'
import { BentoCard } from '@/components/layout/BentoGrid'

export function Contact() {
  const t = useTranslations('contact')

  return (
    <BentoCard span="col-span-12 md:col-span-4" id="contact">
      <h2 className="text-2xl font-bold mb-2">{t('title')}</h2>
      <p className="text-foreground-muted mb-6">{t('description')}</p>

      <a
        href="mailto:your.email@example.com"
        className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors"
      >
        {t('email')}
      </a>
    </BentoCard>
  )
}
```

**Checklist:**
- [ ] Assets optimized and moved
- [ ] Translation files created
- [ ] Hero section built
- [ ] Contact section built
- [ ] Content extracted from old site

---

## Phase 4: Projects Section (Days 8-9)

### Step 4.1: Create Projects Data Structure

**File:** `src/types/index.ts`

```typescript
export interface Project {
  id: string
  titleEn: string
  titleAr: string
  descriptionEn: string
  descriptionAr: string
  tags: string[]
  demoUrl?: string
  githubUrl?: string
  imageUrl: string
  featured: boolean
  order: number
}
```

**File:** `src/data/projects.ts`

```typescript
import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'project-1',
    titleEn: 'Project Name',
    titleAr: 'اسم المشروع',
    descriptionEn: 'Brief description of the project',
    descriptionAr: 'وصف مختصر للمشروع',
    tags: ['Next.js', 'TypeScript', 'Tailwind'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/username/repo',
    imageUrl: '/assets/projects/project-1.png',
    featured: true,
    order: 1
  },
  // Add 4-5 more projects
]

export function getProjects(): Project[] {
  return projects.sort((a, b) => a.order - b.order)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured).sort((a, b) => a.order - b.order)
}
```

### Step 4.2: Create Projects Section

**File:** `src/components/sections/Projects.tsx`

```typescript
'use client'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { BentoCard } from '@/components/layout/BentoGrid'
import { getProjects } from '@/data/projects'
import type { Locale } from '@/lib/i18n'

export function Projects() {
  const t = useTranslations('projects')
  const locale = useLocale() as Locale
  const projects = getProjects()

  return (
    <>
      <BentoCard span="col-span-12">
        <h2 className="text-3xl font-bold mb-8" id="projects">
          {t('title')}
        </h2>
      </BentoCard>

      {projects.map((project, index) => {
        const title = locale === 'ar' ? project.titleAr : project.titleEn
        const description = locale === 'ar' ? project.descriptionAr : project.descriptionEn
        const span = index === 0 ? 'col-span-12 md:col-span-8' : 'col-span-12 md:col-span-4'

        return (
          <BentoCard key={project.id} span={span}>
            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-foreground-muted mb-4">{description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs bg-background-glass border border-border rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent hover:text-accent-hover transition-colors"
                >
                  {t('viewProject')} →
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground-muted hover:text-foreground transition-colors"
                >
                  {t('viewCode')}
                </a>
              )}
            </div>
          </BentoCard>
        )
      })}
    </>
  )
}
```

### Step 4.3: Gather Project Images

Create or find placeholder images for 5-6 projects:
- Size: 800x600px
- Format: WebP
- Optimize to <50KB each
- Save in `public/assets/projects/`

**Checklist:**
- [ ] Project type defined
- [ ] Projects data created (5-6 projects)
- [ ] Project images gathered and optimized
- [ ] Projects section component built
- [ ] Projects display correctly in both languages

---

## Phase 5: Assemble Homepage (Day 10)

### Step 5.1: Create Homepage

**File:** `src/app/[locale]/page.tsx`

```typescript
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BentoGrid } from '@/components/layout/BentoGrid'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Header />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <BentoGrid>
          <Hero />
          <Projects />
          <Contact />
        </BentoGrid>
      </main>

      <Footer />
    </>
  )
}
```

### Step 5.2: Test Local Development

```bash
npm run dev
```

Visit:
- `http://localhost:3000` (should redirect to `/ar`)
- `http://localhost:3000/ar` (Arabic version)
- `http://localhost:3000/en` (English version)

**Test:**
- [ ] Arabic loads by default
- [ ] Language toggle works
- [ ] RTL layout renders correctly
- [ ] All sections display properly
- [ ] Images load
- [ ] Navigation links work

---

## Phase 6: Polish & Optimization (Days 11-12)

### Step 6.1: Add Subtle Animations

Update components with hover effects:

```typescript
// Example: Enhanced project card hover
<BentoCard
  span={span}
  className="hover:-translate-y-1 transition-all duration-200"
>
```

### Step 6.2: Responsive Testing

Test at breakpoints:
- 320px (iPhone SE)
- 375px (iPhone 12/13)
- 414px (iPhone 12/13 Pro Max)
- 768px (iPad)
- 1024px (iPad Pro)
- 1440px (Desktop)
- 1920px (Large Desktop)

### Step 6.3: Performance Optimization

```bash
# Build for production
npm run build

# Analyze bundle
npm run build -- --analyze # (if analyzer plugin added)
```

Check:
- [ ] Bundle size <200KB initial JS
- [ ] Images optimized
- [ ] No console errors
- [ ] Fast load time

### Step 6.4: Lighthouse Audit

Run Lighthouse in Chrome DevTools:
- [ ] Performance >90
- [ ] Accessibility >90
- [ ] Best Practices >90
- [ ] SEO >90

Fix any issues identified.

---

## Phase 7: Testing & QA (Day 13)

### Step 7.1: Functional Testing

- [ ] Homepage loads in Arabic by default
- [ ] Language toggle works (AR ↔ EN)
- [ ] RTL layout correct (text alignment, margins)
- [ ] LTR layout correct when switched to English
- [ ] All links work (internal anchors, external links)
- [ ] Images load and display correctly
- [ ] Mobile menu works (if added)
- [ ] Smooth scrolling to anchors

### Step 7.2: Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Safari iOS (real device)
- [ ] Chrome Android (if available)

### Step 7.3: Accessibility Testing

- [ ] All images have alt text
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works
- [ ] Screen reader tested (VoiceOver)
- [ ] Focus indicators visible

### Step 7.4: SEO Verification

- [ ] Meta tags present in both languages
- [ ] Open Graph preview (use https://www.opengraph.xyz/)
- [ ] Twitter Card preview
- [ ] Hreflang tags correct
- [ ] Sitemap accessible (auto-generated by Next.js)

---

## Phase 8: Deployment (Day 14)

### Step 8.1: Initialize Git

```bash
cd MyWebsite-Next
git init
git add .
git commit -m "[Feature] Initial Next.js migration with bilingual support"
```

### Step 8.2: Push to GitHub

```bash
# Create new repo on GitHub first, then:
git remote add origin https://github.com/yourusername/MyWebsite-Next.git
git branch -M main
git push -u origin main
```

### Step 8.3: Configure for GitHub Pages

1. **Update `next.config.mjs`** for static export:

```javascript
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/lib/i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Required for GitHub Pages
  images: {
    unoptimized: true,  // GitHub Pages doesn't support image optimization
  },
}

export default withNextIntl(nextConfig)
```

2. **Create CNAME file** in `public/` directory:
```bash
echo "noiceanas.com" > public/CNAME
```

3. **Create GitHub Actions workflow** (`.github/workflows/deploy.yml`):

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

4. **Commit and push workflow**:
```bash
git add .github/workflows/deploy.yml next.config.mjs public/CNAME
git commit -m "[Config] Configure GitHub Pages deployment"
git push origin main
```

### Step 8.4: Configure Custom Domain

1. **Enable GitHub Pages** in repository settings:
   - Go to Settings > Pages
   - Source: Deploy from a branch → `gh-pages`
   - Custom domain: `noiceanas.com`

2. **Configure DNS records** in your domain provider:
   - **A Records** (add all four):
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - **Or CNAME** (alternative): `yourusername.github.io`

3. Wait for DNS propagation (up to 24-48 hours)
4. Enable "Enforce HTTPS" in GitHub Pages settings
5. Verify HTTPS certificate is issued

### Step 8.5: Final Testing

Test on production:
- [ ] https://noiceanas.com (redirects to /ar)
- [ ] https://noiceanas.com/ar
- [ ] https://noiceanas.com/en
- [ ] HTTPS works
- [ ] Custom domain works
- [ ] All features work in production

---

## Phase 9: Post-Deployment (Day 14+)

### Step 9.1: Archive Old Site

```bash
cd /Users/anasalhalabi/Desktop/MyWebsite
git checkout -b archive/version-1.0
git push origin archive/version-1.0
```

### Step 9.2: Update Repository

Option 1: Replace current repo with Next.js version
Option 2: Keep both repos separate

### Step 9.3: Monitor & Iterate

- Monitor GitHub Actions workflow runs for deployment status
- Check browser console for client-side errors
- Use Google Analytics or similar for traffic monitoring
- Gather user feedback
- Make iterative improvements

---

## Troubleshooting

### Issue: Fonts not loading
**Solution:** Download Cairo font and place in `src/app/fonts/`, update font config

### Issue: RTL not working
**Solution:** Check `dir` attribute in layout, ensure RTL plugin installed

### Issue: Images not optimizing
**Solution:** Verify Next.js Image component usage, check image paths

### Issue: Build fails
**Solution:** Run `npm run build` locally, check TypeScript errors

---

## Success Criteria

✅ Homepage loads in Arabic by default
✅ Language toggle works smoothly (AR ↔ EN)
✅ RTL/LTR layouts render correctly
✅ Bento grid layout implemented
✅ Modern minimal aesthetic achieved
✅ 5-6 projects displayed
✅ All images optimized (<100KB hero, <50KB projects)
✅ Lighthouse score >90 (all metrics)
✅ Mobile responsive
✅ Custom domain works (noiceanas.com)
✅ CLAUDE.md created as source of truth

---

## Next Steps After Launch

1. **Analytics:** Add Google Analytics or similar analytics service
2. **Blog:** Consider adding MDX-based blog system
3. **Contact Form:** Implement functional contact form (using services like Formspree, EmailJS, or Netlify Forms)
4. **Animations:** Add more subtle micro-interactions with Framer Motion
5. **More Pages:** About page, detailed project pages, case studies
6. **Performance:** Monitor Core Web Vitals and optimize as needed
7. **SEO:** Submit sitemap to Google Search Console
8. **Accessibility:** Run full WCAG audit and address any issues

---

**Status:** Ready for implementation
**Last Updated:** December 24, 2025
