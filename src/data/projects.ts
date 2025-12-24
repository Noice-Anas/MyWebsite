import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'project-1',
    titleEn: 'Portfolio Website',
    titleAr: 'موقع المحفظة',
    descriptionEn: 'Modern portfolio built with Next.js, TypeScript, and Tailwind CSS featuring bilingual support and dark mode',
    descriptionAr: 'محفظة أعمال حديثة مبنية بـ Next.js و TypeScript و Tailwind CSS مع دعم ثنائي اللغة والوضع الداكن',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'i18n'],
    demoUrl: 'https://noiceanas.com',
    githubUrl: 'https://github.com/Noice-Anas/MyWebsite',
    imageUrl: '/assets/projects/portfolio.png',
    featured: true,
    order: 1
  },
  {
    id: 'project-2',
    titleEn: 'iOS Development Setup',
    titleAr: 'إعداد تطوير iOS',
    descriptionEn: 'Comprehensive guide for setting up iOS development environment on Mac with Xcode and SwiftUI',
    descriptionAr: 'دليل شامل لإعداد بيئة تطوير iOS على Mac مع Xcode و SwiftUI',
    tags: ['iOS', 'Xcode', 'SwiftUI', 'macOS'],
    demoUrl: 'https://noiceanas.com/articles/vscode-ios-development-setup.html',
    imageUrl: '/assets/projects/ios-setup.png',
    featured: true,
    order: 2
  },
  {
    id: 'project-3',
    titleEn: 'Notion System Design',
    titleAr: 'تصميم نظام Notion',
    descriptionEn: 'Custom Notion workspace templates for productivity and project management',
    descriptionAr: 'قوالب مخصصة لمساحة عمل Notion للإنتاجية وإدارة المشاريع',
    tags: ['Notion', 'Productivity', 'Templates'],
    imageUrl: '/assets/projects/notion-system.png',
    featured: true,
    order: 3
  },
  {
    id: 'project-4',
    titleEn: 'macOS Productivity Setup',
    titleAr: 'إعداد الإنتاجية على macOS',
    descriptionEn: 'Complete guide to optimizing macOS for maximum productivity with shortcuts and automations',
    descriptionAr: 'دليل كامل لتحسين macOS لأقصى إنتاجية مع الاختصارات والأتمتة',
    tags: ['macOS', 'Productivity', 'Automation'],
    imageUrl: '/assets/projects/macos-productivity.png',
    featured: false,
    order: 4
  },
  {
    id: 'project-5',
    titleEn: 'Web Design System',
    titleAr: 'نظام تصميم الويب',
    descriptionEn: 'Reusable component library and design system built with modern web technologies',
    descriptionAr: 'مكتبة مكونات قابلة لإعادة الاستخدام ونظام تصميم مبني بتقنيات الويب الحديثة',
    tags: ['Design System', 'React', 'Components'],
    imageUrl: '/assets/projects/design-system.png',
    featured: false,
    order: 5
  }
]

export function getProjects(): Project[] {
  return projects.sort((a, b) => a.order - b.order)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured).sort((a, b) => a.order - b.order)
}
