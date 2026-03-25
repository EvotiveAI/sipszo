import LogoSvg from '@/assets/svg/logo'

// Util Imports
import { cn } from '@/lib/utils'

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <LogoSvg />
      <span className='text-foreground text-[15px] font-bold tracking-[0.10em] uppercase'>KÖRKAPCSOLÁS</span>
    </div>
  )
}

export default Logo
