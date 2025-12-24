import { useTranslations } from 'next-intl'
import { BentoCard } from '@/components/layout/BentoGrid'

export function Contact() {
  const t = useTranslations('contact')

  return (
    <BentoCard span="col-span-12 md:col-span-4" id="contact">
      <h2 className="text-2xl font-bold mb-2">{t('title')}</h2>
      <p className="text-foreground-muted mb-6">{t('description')}</p>

      <a
        href="mailto:anas@noiceanas.com"
        className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-hover text-accent-foreground rounded-lg transition-colors"
      >
        {t('email')}
      </a>
    </BentoCard>
  )
}
