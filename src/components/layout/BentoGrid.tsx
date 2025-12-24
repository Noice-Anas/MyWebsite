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
