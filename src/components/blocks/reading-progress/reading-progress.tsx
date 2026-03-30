'use client'

import { useEffect, useState } from 'react'

export const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0
      setProgress(pct)
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div
      className='fixed top-0 left-0 z-[60] h-[3px] bg-primary transition-[width] duration-75 ease-linear'
      style={{ width: `${progress}%` }}
      role='progressbar'
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label='Olvasási előrehaladás'
    />
  )
}
