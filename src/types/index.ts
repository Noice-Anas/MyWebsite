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
