import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from 'lucide-react'

import Link from 'next/link'

import { Separator } from '@/components/ui/separator'

import Logo from '@/components/logo'
import SupportButton from '@/components/blocks/support-button/support-button'

const Footer = () => {
  return (
    <footer>
      {/* Support strip */}
      <div className='bg-muted/50 border-t py-4'>
        <div className='mx-auto flex max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8'>
          <SupportButton variant='minimal' />
        </div>
      </div>

      <div className='mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 sm:py-6 md:gap-6 md:py-8 lg:px-8'>
        <Link href='/#'>
          <div className='flex items-center gap-3'>
            <Logo className='gap-3' />
          </div>
        </Link>
        <div className='flex flex-wrap items-center justify-center gap-x-3 gap-y-2 whitespace-nowrap sm:gap-5'>
          <Link
            href='/contact-us'
            className='text-muted-foreground hover:text-foreground opacity-80 transition-opacity duration-300 hover:opacity-100'
          >
            Kapcsolat
          </Link>
          <Link
            href='/impresszum'
            className='text-muted-foreground hover:text-foreground opacity-80 transition-opacity duration-300 hover:opacity-100'
          >
            Impresszum
          </Link>
          <Link
            href='/impresszum'
            className='text-muted-foreground hover:text-foreground opacity-80 transition-opacity duration-300 hover:opacity-100'
          >
            Szerkesztőségi elvek
          </Link>
          <Link
            href='/rovat'
            className='text-muted-foreground hover:text-foreground opacity-80 transition-opacity duration-300 hover:opacity-100'
          >
            Rovatok
          </Link>
          <Link
            href='/szerzo'
            className='text-muted-foreground hover:text-foreground opacity-80 transition-opacity duration-300 hover:opacity-100'
          >
            Szerzők
          </Link>
          <Link
            href='/cimke'
            className='text-muted-foreground hover:text-foreground opacity-80 transition-opacity duration-300 hover:opacity-100'
          >
            Címkék
          </Link>
        </div>

        <div className='flex items-center gap-4'>
          <Link href='https://facebook.com/korkapcsolas' target='_blank' rel='noopener noreferrer' className='text-muted-foreground hover:text-foreground'>
            <FacebookIcon className='size-5' />
          </Link>
          <Link href='https://instagram.com/korkapcsolas' target='_blank' rel='noopener noreferrer' className='text-muted-foreground hover:text-foreground'>
            <InstagramIcon className='size-5' />
          </Link>
          <Link href='https://twitter.com/korkapcsolas' target='_blank' rel='noopener noreferrer' className='text-muted-foreground hover:text-foreground'>
            <TwitterIcon className='size-5' />
          </Link>
          <Link href='https://youtube.com/@korkapcsolas' target='_blank' rel='noopener noreferrer' className='text-muted-foreground hover:text-foreground'>
            <YoutubeIcon className='size-5' />
          </Link>
        </div>
      </div>

      <Separator />

      <div className='mx-auto flex max-w-7xl justify-center px-4 py-8 sm:px-6 lg:px-8'>
        <p className='text-muted-foreground flex flex-col items-center gap-1 text-center text-sm text-balance sm:flex-row'>
          <span>
            {`© ${new Date().getFullYear()}`}{' '}
            <Link href='/' className='text-foreground font-semibold hover:underline'>
              Körkapcsolás
            </Link>
            {' '}— Prémium Magyar Sportelemzés.
          </span>
          <span className='sm:ml-1'>Minden jog fenntartva. 18+ | Játssz felelősséggel.</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
