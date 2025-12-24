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
