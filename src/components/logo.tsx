import LogoSvg from '@/assets/svg/logo'

// Util Imports
import { cn } from '@/lib/utils'

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <LogoSvg />
      <span className='text-foreground text-[18px] font-bold tracking-[0.18em] uppercase'>TAKTIKA</span>
    </div>
  )
}

export default Logo
