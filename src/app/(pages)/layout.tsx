import type { ReactNode } from 'react'

import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import NewsletterSignup from '@/components/blocks/newsletter-signup/newsletter-signup'
import NewsletterPopup from '@/components/blocks/newsletter-signup/newsletter-popup'

import type { NavigationSection } from '@/components/blocks/menu-navigation'

const navigationData: NavigationSection[] = [
  {
    title: 'Legfrissebb',
    href: '/legfrissebb'
  },
  {
    title: 'Rovatok',
    href: '/rovat'
  },
  {
    title: 'Szerzők',
    href: '/szerzo'
  },
  {
    title: 'Tippek',
    href: '/tippek'
  },
  {
    title: 'Kvíz',
    href: '/kviz'
  }
]

const PagesLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div className='flex h-full w-full min-w-0 flex-col'>
      {/* Header Section */}
      <Header navigationData={navigationData} />

      {/* Newsletter Banner */}
      <NewsletterSignup variant='banner' />

      {/* Main Content */}
      <main className='flex flex-col'>{children}</main>

      {/* Footer Section */}
      <Footer />

      {/* Newsletter Popup — triggers on scroll 60% or after 45s */}
      <NewsletterPopup />
    </div>
  )
}

export default PagesLayout
