import type { ReactNode } from 'react'

import { Inter, Source_Serif_4, IBM_Plex_Mono } from 'next/font/google'
import type { Metadata } from 'next'

import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'

import { cn } from '@/lib/utils'

import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
})

const sourceSerif4 = Source_Serif_4({
  variable: '--font-source-serif-4',
  subsets: ['latin']
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: {
    template: '%s — TAKTIKA',
    default: 'TAKTIKA — Magyar Sportelemzés & Sporttörténelem'
  },
  description:
    'A TAKTIKA prémium magyar sportelemzési platform. Legendás meccsek, ikonikus sportolók portréi, taktikai elemzések és felelős fogadási útmutatók.',
  robots: 'index,follow',
  keywords: ['magyar sport', 'sportelemzés', 'sporttörténelem', 'legendás meccsek', 'Puskás', 'futball elemzés', 'okos fogadás'],
  icons: {
    icon: [
      {
        url: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        url: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        url: '/favicon/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon'
      }
    ],
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    other: [
      {
        url: '/favicon/android-chrome-192x192.png',
        rel: 'icon',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        url: '/favicon/android-chrome-512x512.png',
        rel: 'icon',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}`),
    openGraph: {
    title: {
      template: '%s — TAKTIKA',
      default: 'TAKTIKA — Magyar Sportelemzés & Sporttörténelem'
    },
    description:
      'A TAKTIKA prémium magyar sportelemzési platform. Legendás meccsek, ikonikus sportolók portréi, taktikai elemzések.',
    type: 'website',
    siteName: 'TAKTIKA',
    url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}`,
    images: [
      {
        url: '/images/og-image.webp',
        type: 'image/png',
        width: 1200,
        height: 630,
        alt: 'TAKTIKA — Magyar Sportelemzés'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      template: '%s — TAKTIKA',
      default: 'TAKTIKA — Magyar Sportelemzés & Sporttörténelem'
    },
    description:
      'A TAKTIKA prémium magyar sportelemzési platform. Legendás meccsek, ikonikus sportolók portréi, taktikai elemzések.'
  }
}

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html
      lang='hu'
      className={cn(
        inter.variable,
        sourceSerif4.variable,
        ibmPlexMono.variable,
        'flex min-h-full w-full scroll-smooth'
      )}
      suppressHydrationWarning
    >
      <body className='flex min-h-full w-full flex-auto flex-col'>
        <ThemeProvider attribute='class' enableSystem={false} disableTransitionOnChange>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default RootLayout
