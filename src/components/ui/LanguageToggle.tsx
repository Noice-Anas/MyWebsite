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
