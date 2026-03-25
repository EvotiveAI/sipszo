import { HeartIcon, ExternalLinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface SupportButtonProps {
  variant?: 'card' | 'inline' | 'minimal'
  className?: string
}

const SUPPORT_URL = 'https://ko-fi.com/korkapcsolas'

const SupportButton = ({ variant = 'card', className = '' }: SupportButtonProps) => {
  if (variant === 'minimal') {
    return (
      <a
        href={SUPPORT_URL}
        target='_blank'
        rel='noopener noreferrer'
        className={`text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm transition-colors ${className}`}
      >
        <HeartIcon className='size-4 text-rose-500' />
        Támogasd a Körkapcsolást
        <ExternalLinkIcon className='size-3' />
      </a>
    )
  }

  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <a href={SUPPORT_URL} target='_blank' rel='noopener noreferrer'>
          <Button variant='outline' size='sm' className='gap-2 border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 dark:border-rose-900/40 dark:text-rose-400 dark:hover:bg-rose-900/20'>
            <HeartIcon className='size-4' />
            Támogasd a Körkapcsolást
          </Button>
        </a>
        <span className='text-muted-foreground text-xs'>
          Ha értékes volt, egy kávé sokat jelent
        </span>
      </div>
    )
  }

  // card variant (default)
  return (
    <Card className={`shadow-none ${className}`}>
      <CardContent className='space-y-4 p-6'>
        <Separator className='opacity-30' />
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='space-y-1'>
            <div className='flex items-center gap-2'>
              <HeartIcon className='size-4 text-rose-500' />
              <h4 className='text-foreground font-semibold'>Tetszett a cikk?</h4>
            </div>
            <p className='text-muted-foreground text-sm leading-relaxed'>
              A Körkapcsolás ingyenes és az is marad — de ha segítesz, több mélyelemzést tudunk írni.
            </p>
          </div>
          <a href={SUPPORT_URL} target='_blank' rel='noopener noreferrer' className='shrink-0'>
              <Button
                      variant='outline'
                      className='w-full gap-2 border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 dark:border-rose-900/40 dark:text-rose-400 dark:hover:bg-rose-900/20 sm:w-auto'
                    >
                      <HeartIcon className='size-4' />
                      Támogasd a Körkapcsolást
                      <ExternalLinkIcon className='size-3.5' />
                    </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  )
}

export default SupportButton
