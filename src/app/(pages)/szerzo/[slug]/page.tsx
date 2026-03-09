import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon, CalendarDaysIcon, ClockIcon } from 'lucide-react'
import { authors } from '@/assets/data/authors'
import { blogPosts } from '@/assets/data/blog-posts'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return authors.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const author = authors.find(a => a.slug === slug)
  if (!author) return {}
  return {
    title: `${author.name} | TAKTIKA`,
    description: author.bio
  }
}

const SzerzoProfilPage = async ({ params }: Props) => {
  const { slug } = await params
  const author = authors.find(a => a.slug === slug)
  if (!author) notFound()

  const authorPosts = blogPosts.filter(p => p.author === author.name)

  return (
    <div className='mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8'>
      {/* Back */}
      <Button variant='ghost' size='sm' className='text-muted-foreground mb-8 -ml-2' asChild>
        <Link href='/szerzo'>
          <ArrowLeftIcon className='mr-1 size-4' />
          Vissza a szerzőkhöz
        </Link>
      </Button>

      {/* Author Hero */}
      <div className='mb-12 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10'>
        <Avatar className='size-28 shrink-0 ring-4 ring-primary/10'>
          <AvatarImage src={author.avatarUrl} alt={author.name} />
          <AvatarFallback className='text-2xl'>{author.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className='space-y-3'>
          <div>
            <p className='text-muted-foreground text-xs font-medium uppercase tracking-[0.2em]'>
              {author.role}
            </p>
            <h1 className='text-3xl font-bold tracking-tight sm:text-4xl'>{author.name}</h1>
          </div>
          <p className='text-muted-foreground max-w-2xl leading-relaxed'>{author.bio}</p>
          <div className='flex flex-wrap gap-2 pt-1'>
            {author.specialties.map(s => (
              <Badge key={s} className='bg-primary/10 text-primary border-0'>
                {s}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Separator className='mb-10 opacity-40' />

      {/* Articles */}
      <div className='space-y-6'>
        <h2 className='text-xl font-bold tracking-tight'>
          Cikkek ({authorPosts.length})
        </h2>

        {authorPosts.length === 0 ? (
          <p className='text-muted-foreground'>Még nincsenek cikkek ettől a szerzőtől.</p>
        ) : (
          <div className='grid gap-5 sm:grid-cols-2'>
            {authorPosts.map(post => (
              <Link key={post.id} href={`/blog-detail/${post.slug}`}>
                <Card className='group h-full cursor-pointer shadow-none transition-all duration-300 hover:shadow-md'>
                  <CardContent className='flex gap-4 p-4'>
                    <div className='size-20 shrink-0 overflow-hidden rounded-md'>
                      <img
                        src={post.imageUrl}
                        alt={post.imageAlt}
                        className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                      />
                    </div>
                    <div className='flex flex-col justify-between gap-1'>
                      <div className='space-y-1'>
                        <Badge className='bg-primary/10 text-primary border-0 text-xs'>
                          {post.category}
                        </Badge>
                        <h3 className='text-foreground line-clamp-2 text-sm font-semibold leading-snug group-hover:text-primary transition-colors'>
                          {post.title}
                        </h3>
                      </div>
                      <div className='text-muted-foreground flex items-center gap-2 text-xs'>
                        <CalendarDaysIcon className='size-3' />
                        <span>{post.date}</span>
                        <span>·</span>
                        <ClockIcon className='size-3' />
                        <span>{post.readTime} perc</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SzerzoProfilPage
