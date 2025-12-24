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
          <BentoCard key={project.id} span={span} className="hover:-translate-y-1 transition-all duration-200">
            <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-muted">
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
