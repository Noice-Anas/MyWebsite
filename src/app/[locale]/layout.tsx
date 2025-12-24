import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
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
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  if (!locales.includes(locale as any)) {
    notFound()
  }

  const direction = locale === 'ar' ? 'rtl' : 'ltr'
  
  // Load messages for client components
  const messages = (await import(`@/messages/${locale}.json`)).default

  return (
    <html lang={locale} dir={direction}>
      <head>
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
      </head>
      <body className={`${inter.variable} ${cairo.variable} ${locale === 'ar' ? 'font-arabic' : 'font-sans'} bg-background text-foreground antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
