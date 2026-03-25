'use client'

import { useState } from 'react'
import { collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore'
import { MailIcon, CheckCircleIcon, ArrowRightIcon, GiftIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { db } from '@/lib/firebase'

type NewsletterVariant = 'inline' | 'popup' | 'banner'

interface NewsletterSignupProps {
  variant?: NewsletterVariant
  onClose?: () => void
}

async function subscribeEmail(email: string): Promise<{ ok: boolean; alreadyExists?: boolean }> {
  const subscribersRef = collection(db, 'newsletter_subscribers')

  // Check for duplicate
  const existing = await getDocs(query(subscribersRef, where('email', '==', email)))
  if (!existing.empty) {
    return { ok: true, alreadyExists: true }
  }

  await addDoc(subscribersRef, {
    email,
    subscribedAt: serverTimestamp(),
    source: typeof window !== 'undefined' ? window.location.pathname : '/',
    active: true
  })

  return { ok: true }
}

const NewsletterSignup = ({ variant = 'inline', onClose }: NewsletterSignupProps) => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [alreadyExists, setAlreadyExists] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError('Kérjük, adj meg egy érvényes email-címet.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const result = await subscribeEmail(email.toLowerCase().trim())
      setAlreadyExists(result.alreadyExists ?? false)
      setSubmitted(true)
    } catch {
      setError('Hiba történt. Kérjük, próbáld újra.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className='flex flex-col items-center gap-3 py-4 text-center'>
        <CheckCircleIcon className='text-primary size-10' />
        <h3 className='text-foreground text-lg font-bold'>
          {alreadyExists ? 'Már fel vagy iratkozva!' : 'Feliratkoztál!'}
        </h3>
        <p className='text-muted-foreground max-w-xs text-sm'>
          {alreadyExists
            ? 'Ez az email-cím már szerepel a listánkon. Hamarosan érkeznek az elemzések!'
            : 'Hamarosan küldjük az első heti elemzést. Nézd meg a spam mappádat is!'}
        </p>
        {onClose && (
          <Button variant='ghost' size='sm' onClick={onClose} className='mt-1'>
            Bezárás
          </Button>
        )}
      </div>
    )
  }

  if (variant === 'banner') {
    return (
      <div className='bg-primary/5 border-primary/20 border-y py-4'>
        <div className='mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 sm:flex-row sm:justify-between sm:px-6 lg:px-8'>
          <div className='flex items-center gap-2'>
            <GiftIcon className='text-primary size-4 shrink-0' />
            <p className='text-foreground text-sm font-medium'>
              Heti 1 ingyenes value bet elemzés emailben —{' '}
              <span className='text-primary font-semibold'>töltsd le a Value Betting Bibliát is!</span>
            </p>
          </div>
          <form onSubmit={handleSubmit} className='flex w-full gap-2 sm:w-auto'>
            <Input
              type='email'
              placeholder='email@cimed.hu'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='h-9 w-full min-w-0 text-sm sm:w-52'
              aria-label='Email cím'
            />
            <Button type='submit' size='sm' disabled={loading} className='shrink-0'>
              {loading ? '...' : 'Feliratkozom'}
            </Button>
          </form>
        </div>
        {error && <p className='mt-1 text-center text-xs text-red-500'>{error}</p>}
      </div>
    )
  }

  if (variant === 'popup') {
    return (
      <div className='space-y-5 p-2'>
        <div className='flex items-start justify-between gap-2'>
          <div className='space-y-1'>
            <Badge className='bg-primary/10 text-primary border-0 text-xs'>Ingyenes</Badge>
            <h2 className='text-foreground text-xl font-bold leading-snug'>
              Heti elemzés + Value Betting Biblia
            </h2>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className='text-muted-foreground hover:text-foreground mt-1 text-lg leading-none'
              aria-label='Bezárás'
            >
              ×
            </button>
          )}
        </div>

        <ul className='text-muted-foreground space-y-2 text-sm'>
          <li className='flex items-center gap-2'>
            <CheckCircleIcon className='text-primary size-4 shrink-0' />
            Heti 1 value bet elemzés — ingyen, emailben
          </li>
          <li className='flex items-center gap-2'>
            <CheckCircleIcon className='text-primary size-4 shrink-0' />
            Value Betting Biblia PDF — azonnal letöltve
          </li>
          <li className='flex items-center gap-2'>
            <CheckCircleIcon className='text-primary size-4 shrink-0' />
            Hétvégi meccsek előrejelzése pénteken
          </li>
        </ul>

        <form onSubmit={handleSubmit} className='space-y-3'>
          <Input
            type='email'
            placeholder='email@cimed.hu'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='w-full'
            aria-label='Email cím'
          />
          {error && <p className='text-xs text-red-500'>{error}</p>}
          <Button type='submit' disabled={loading} className='w-full'>
            {loading ? 'Feliratkozás...' : (
              <span className='flex items-center gap-2'>
                Feliratkozom ingyen <ArrowRightIcon className='size-4' />
              </span>
            )}
          </Button>
          <p className='text-muted-foreground text-center text-xs'>
            Semmi spam. Bármikor leiratkozhatsz.
          </p>
        </form>
      </div>
    )
  }

  // inline variant (default)
  return (
    <Card className='shadow-none'>
      <CardContent className='space-y-4 p-6'>
        <div className='flex items-center gap-3'>
          <div className='bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-full'>
            <MailIcon className='text-primary size-5' />
          </div>
          <div>
            <h3 className='text-foreground font-bold'>Heti elemzés emailben</h3>
            <p className='text-muted-foreground text-sm'>Iratkozz fel — és kapod a Value Betting Bibliát is</p>
          </div>
        </div>

        <ul className='text-muted-foreground grid grid-cols-1 gap-1.5 text-sm sm:grid-cols-2'>
          <li className='flex items-center gap-2'>
            <CheckCircleIcon className='text-primary size-3.5 shrink-0' />
            Heti value bet elemzés
          </li>
          <li className='flex items-center gap-2'>
            <CheckCircleIcon className='text-primary size-3.5 shrink-0' />
            PDF guide azonnal
          </li>
          <li className='flex items-center gap-2'>
            <CheckCircleIcon className='text-primary size-3.5 shrink-0' />
            Pénteki tippek előre
          </li>
          <li className='flex items-center gap-2'>
            <CheckCircleIcon className='text-primary size-3.5 shrink-0' />
            Semmi spam
          </li>
        </ul>

        <form onSubmit={handleSubmit} className='flex flex-col gap-2 sm:flex-row'>
          <Input
            type='email'
            placeholder='email@cimed.hu'
            value={email}
            onChange={e => setEmail(e.target.value)}
            className='flex-1'
            aria-label='Email cím'
          />
          <Button type='submit' disabled={loading} className='shrink-0'>
            {loading ? 'Feliratkozás...' : 'Feliratkozom'}
          </Button>
        </form>
        {error && <p className='text-xs text-red-500'>{error}</p>}
        <p className='text-muted-foreground text-xs'>
          Semmi spam, bármikor leiratkozhatsz. Az adataidat nem adjuk ki.
        </p>
      </CardContent>
    </Card>
  )
}

export default NewsletterSignup
