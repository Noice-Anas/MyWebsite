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
