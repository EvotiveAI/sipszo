'use client'
import { ArrowUpRightIcon, CalendarDaysIcon, ClockIcon } from 'lucide-react'

import { useRouter } from 'next/navigation'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { BlogPost } from '@/components/blocks/blog-component/blog-component'

const HeroSection = ({ blogData }: { blogData: BlogPost[] }) => {
  const featuredPosts = blogData.filter(post => post.featured)
  const [heroPrimary, ...heroSecondary] = featuredPosts
  const router = useRouter()

  if (!heroPrimary) return null

  return (
    <section id='home' className='bg-muted -mt-16 pt-32 pb-12 sm:pb-16 lg:pb-20'>
      <div className='mx-auto flex h-full max-w-7xl flex-col gap-3 px-4 sm:px-6 lg:px-8'>

        {/* Editorial masthead */}
        <div className='flex flex-col items-center gap-2 pb-8 pt-2 text-center'>
          <p className='text-xs font-semibold uppercase tracking-[0.22em]' style={{ color: 'var(--brand-amber)' }}>
            Prémium Magyar Sportelemzés
          </p>
          <h1 className='text-foreground text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
            Sport mint kultúra.
          </h1>
          <p className='text-muted-foreground mt-1 max-w-xl text-base leading-relaxed'>
            Legendás meccsek, ikonikus személyiségek, taktikai mélységek — intelligens olvasóknak.
          </p>
          <div className='mt-6 h-px w-24 opacity-70' style={{ backgroundColor: 'var(--brand-amber)' }} />
        </div>

        {/* Primary featured article — full-width editorial hero */}
        <Card
          className='group cursor-pointer overflow-hidden border-0 bg-transparent py-0 shadow-none'
          onClick={() => router.push(`/blog-detail/${heroPrimary.slug}`)}
        >
          <CardContent className='grid grid-cols-1 gap-0 px-0 lg:grid-cols-5'>
            {/* Image — 3 cols */}
            <div className='lg:col-span-3'>
              <div className='h-72 w-full overflow-hidden rounded-lg sm:h-96 lg:h-[480px]'>
                <img
                  src={heroPrimary.imageUrl}
                  alt={heroPrimary.imageAlt}
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-103'
                />
              </div>
            </div>

            {/* Content — 2 cols */}
            <div className='flex flex-col justify-center gap-5 px-0 py-8 lg:col-span-2 lg:px-10'>
              <div className='flex items-center gap-3'>
                <Badge className='bg-primary/10 text-primary cursor-pointer border-0 text-xs font-medium tracking-wide uppercase'>
                  {heroPrimary.category}
                </Badge>
                <span className='text-muted-foreground flex items-center gap-1 text-xs'>
                  <ClockIcon className='size-3.5' />
                  {heroPrimary.readTime} perc olvasás
                </span>
              </div>

              <Link href={`/blog-detail/${heroPrimary.slug}`}>
                <h2 className='text-foreground font-serif text-2xl leading-snug font-bold tracking-tight sm:text-3xl lg:text-[1.9rem] lg:leading-tight'>
                  {heroPrimary.title}
                </h2>
              </Link>

              <p className='text-muted-foreground text-base leading-relaxed'>
                {heroPrimary.description}
              </p>

              <div className='flex items-center justify-between pt-2'>
                <div className='flex items-center gap-2 text-sm'>
                  <span className='text-foreground font-medium'>{heroPrimary.author}</span>
                  <span className='text-muted-foreground'>·</span>
                  <span className='text-muted-foreground flex items-center gap-1'>
                    <CalendarDaysIcon className='size-3.5' />
                    {heroPrimary.date}
                  </span>
                </div>
                <Button
                  size='icon'
                  variant='outline'
                  className='group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors'
                  asChild
                >
                  <Link href={`/blog-detail/${heroPrimary.slug}`}>
                    <ArrowUpRightIcon className='size-4' />
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Secondary featured articles */}
        {heroSecondary.length > 0 && (
          <div className='mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {heroSecondary.map((item, index) => (
              <Card
                key={`${item.author}-${index}`}
                className='group cursor-pointer overflow-hidden shadow-none'
                onClick={() => router.push(`/blog-detail/${item.slug}`)}
              >
                <CardContent className='space-y-4 px-5 py-5'>
                  <div className='overflow-hidden rounded-md'>
                    <img
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      className='h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                  </div>
                  <div className='flex items-center gap-2'>
                    <Badge className='bg-primary/10 text-primary border-0 text-xs uppercase tracking-wide'>
                      {item.category}
                    </Badge>
                    <span className='text-muted-foreground text-xs'>{item.readTime} perc</span>
                  </div>
                  <Link href={`/blog-detail/${item.slug}`}>
                    <h3 className='text-foreground line-clamp-3 text-base leading-snug font-semibold'>{item.title}</h3>
                  </Link>
                  <p className='text-muted-foreground line-clamp-2 text-sm leading-relaxed'>{item.description}</p>
                  <div className='text-muted-foreground flex items-center gap-1.5 text-xs'>
                    <CalendarDaysIcon className='size-3.5' />
                    <span>{item.date}</span>
                    <span>·</span>
                    <span className='text-foreground font-medium'>{item.author}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default HeroSection
