import Link from 'next/link'
import { CalendarDaysIcon, ClockIcon, ArrowRightIcon } from 'lucide-react'
import { blogPosts } from '@/assets/data/blog-posts'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export const metadata = {
  title: 'Legfrissebb | TAKTIKA',
  description: 'A TAKTIKA legújabb cikkei, időrend szerint.'
}

const LegfrissebbPage = () => {
  const sorted = [...blogPosts].sort((a, b) => b.id - a.id)

  return (
    <div className='mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8'>
      {/* Header */}
      <div className='mb-12 space-y-3'>
        <p className='text-muted-foreground text-xs font-medium uppercase tracking-[0.22em]'>
          Archívum
        </p>
        <h1 className='text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'>Legfrissebb cikkek</h1>
        <p className='text-muted-foreground max-w-2xl text-lg'>
          Minden megjelent cikk időrend szerint — a legelejétől a legutolsóig.
        </p>
        <Separator className='mt-6 max-w-24 opacity-40' />
      </div>

      {/* Articles List */}
      <div className='space-y-4'>
        {sorted.map((post, index) => (
          <Link key={post.id} href={`/blog-detail/${post.slug}`}>
            <Card className='group cursor-pointer shadow-none transition-all duration-200 hover:shadow-md'>
              <CardContent className='flex gap-5 p-4 sm:p-5'>
                {/* Index number */}
                <div className='text-muted-foreground/40 hidden w-8 shrink-0 items-center justify-center text-lg font-bold tabular-nums sm:flex'>
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Thumbnail */}
                <div className='size-20 shrink-0 overflow-hidden rounded-lg sm:size-24'>
                  <img
                    src={post.imageUrl}
                    alt={post.imageAlt}
                    className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                </div>

                {/* Content */}
                <div className='flex flex-1 flex-col justify-between gap-2 min-w-0'>
                  <div className='space-y-1.5'>
                    <div className='flex flex-wrap items-center gap-2'>
                      <Badge className='bg-primary/10 text-primary border-0 text-xs'>
                        {post.category}
                      </Badge>
                      {post.featured && (
                        <Badge className='bg-amber-500/10 text-amber-600 border-0 text-xs'>
                          Kiemelt
                        </Badge>
                      )}
                    </div>
                    <h2 className='text-foreground line-clamp-2 font-semibold leading-snug group-hover:text-primary transition-colors'>
                      {post.title}
                    </h2>
                    <p className='text-muted-foreground line-clamp-1 text-sm hidden sm:block'>
                      {post.description}
                    </p>
                  </div>

                  <div className='text-muted-foreground flex flex-wrap items-center gap-3 text-xs'>
                    <span className='text-foreground font-medium'>{post.author}</span>
                    <span className='flex items-center gap-1'>
                      <CalendarDaysIcon className='size-3' />
                      {post.date}
                    </span>
                    <span className='flex items-center gap-1'>
                      <ClockIcon className='size-3' />
                      {post.readTime} perc
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <div className='hidden shrink-0 items-center sm:flex'>
                  <ArrowRightIcon className='text-muted-foreground/30 size-5 -rotate-45 transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className='mt-10 text-center'>
        <p className='text-muted-foreground text-sm'>
          Összesen <span className='text-foreground font-semibold'>{sorted.length}</span> cikk a magazinban.
        </p>
      </div>
    </div>
  )
}

export default LegfrissebbPage
