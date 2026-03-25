import { SparklesIcon, LockIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface PremiumBadgeProps {
  variant?: 'badge' | 'banner'
  className?: string
}

const PremiumBadge = ({ variant = 'badge', className }: PremiumBadgeProps) => {
  if (variant === 'banner') {
    return (
      <div
        className={cn(
          'flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50/60 px-3 py-2 text-sm dark:border-amber-900/30 dark:bg-amber-900/10',
          className
        )}
      >
        <LockIcon className='size-4 shrink-0 text-amber-500' />
        <p className='text-muted-foreground'>
          <span className='text-foreground font-semibold'>Prémium tartalom:</span> Ez az elemzés hamarosan
          előfizetéses tartalommá válik. Most még ingyenesen olvasható.
        </p>
      </div>
    )
  }

  return (
    <Badge
      className={cn(
        'gap-1 border-0 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
        className
      )}
    >
      <SparklesIcon className='size-3' />
      Prémium
    </Badge>
  )
}

export default PremiumBadge
