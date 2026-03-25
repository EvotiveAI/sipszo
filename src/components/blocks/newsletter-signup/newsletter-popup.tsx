'use client'

import { useState, useEffect } from 'react'
import NewsletterSignup from '@/components/blocks/newsletter-signup/newsletter-signup'

const NewsletterPopup = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Don't show if already dismissed in this session
    const dismissed = sessionStorage.getItem('korkapcsolas_newsletter_dismissed')
    if (dismissed) return

    // Show popup after 45 seconds on page, or when user scrolls 60% down
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 45000)

    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent > 60 && !isDismissed) {
        setIsVisible(true)
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isDismissed])

  const handleClose = () => {
    setIsVisible(false)
    setIsDismissed(true)
    sessionStorage.setItem('korkapcsolas_newsletter_dismissed', '1')
  }

  if (!isVisible) return null

  return (
    <div
      className='fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center'
      role='dialog'
      aria-modal='true'
      aria-label='Hírlevél feliratkozás'
    >
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/40 backdrop-blur-sm'
        onClick={handleClose}
        aria-hidden='true'
      />
      {/* Modal */}
      <div className='bg-background relative w-full max-w-sm rounded-2xl border p-6 shadow-2xl'>
        <NewsletterSignup variant='popup' onClose={handleClose} />
      </div>
    </div>
  )
}

export default NewsletterPopup
