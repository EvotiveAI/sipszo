import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon, CalendarDaysIcon, ClockIcon } from 'lucide-react'
import { blogPosts } from '@/assets/data/blog-posts'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type Props = {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const categories = [...new Set(blogPosts.map(p => p.category))]
  return categories.map(cat => ({ tag: encodeURIComponent(cat) }))
}

export async function generateMetadata({ params }: Props) {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  return {
    title: `${decoded} | Címkék | TAKTIKA`,
    description: `Cikkek a(z) "${decoded}" témakörből.`
  }
}

const CimkeOldalPage = async ({ params }: Props) => {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)

  const filtered = blogPosts.filter(p => p.category === decoded)

  if (filtered.length === 0) notFound()

  return (
    <div className='mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8'>
      {/* Back */}
      <Link
        href='/cimke'
        className='text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-1.5 text-sm transition-colors'
      >
        <ArrowLeftIcon className='size-4' />
        Összes címke
      </Link>

      {/* Header */}
      <div className='mb-10 space-y-3'>
        <p className='text-muted-foreground text-xs font-medium uppercase tracking-[0.22em]'>
          Rovat
        </p>
        <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>{decoded}</h1>
        <div className='flex items-center gap-2'>
          <Badge className='bg-primary/10 text-primary border-0'>
            {filtered.length} cikk
          </Badge>
        </div>
        <Separator className='mt-6 max-w-24 opacity-40' />
      </div>

      {/* Posts */}
      <div className='space-y-4'>
        {filtered.map(post => (
          <Link key={post.id} href={`/blog-detail/${post.slug}`}>
            <Card className='group cursor-pointer shadow-none transition-all duration-200 hover:shadow-md'>
              <CardContent className='flex gap-4 p-4 sm:p-5'>
                <div className='size-20 shrink-0 overflow-hidden rounded-lg sm:size-24'>
                  <img
                    src={post.imageUrl}
                    alt={post.imageAlt}
                    className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                </div>
                <div className='flex flex-1 flex-col justify-between gap-1 min-w-0'>
                  <div className='space-y-1'>
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
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CimkeOldalPage
