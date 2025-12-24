import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

export const locales = ['ar', 'en'] as const
export const defaultLocale = 'ar' as const

export type Locale = (typeof locales)[number]

export default getRequestConfig(async ({ requestLocale }) => {
  // Get locale from the request
  let locale = await requestLocale
  
  // Validate that the locale is valid
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale
  }
  
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'Asia/Riyadh',
    now: new Date()
  }
})
