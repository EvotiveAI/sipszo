import Link from 'next/link'
import { authors } from '@/assets/data/authors'
import { blogPosts } from '@/assets/data/blog-posts'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const metadata = {
  title: 'Szerzők | Körkapcsolás',
  description: 'Ismerd meg a Körkapcsolás szerkesztőit és elemzőit.'
}

const SzerzokPage = () => {
  return (
    <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
      {/* Header */}
      <div className='mb-12 space-y-3'>
        <p className='text-muted-foreground text-xs font-medium uppercase tracking-[0.22em]'>
          Szerkesztőség
        </p>
        <h1 className='text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'>Szerzők</h1>
        <p className='text-muted-foreground max-w-2xl text-lg'>
          A Körkapcsolás mögött álló emberek — elemzők, sporttörténészek, taktikai szakértők. Minden cikk egy
          valódi szakember munkája.
        </p>
        <Separator className='mt-6 max-w-24 opacity-40' />
      </div>

      {/* Authors Grid */}
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {authors.map(author => {
          const postCount = blogPosts.filter(p => p.author === author.name).length
          return (
            <Link key={author.id} href={`/szerzo/${author.slug}`}>
              <Card className='group h-full cursor-pointer shadow-none transition-all duration-300 hover:shadow-md'>
                <CardContent className='flex flex-col gap-4 p-6'>
                  <div className='flex items-center gap-4'>
                    <Avatar className='size-16 ring-2 ring-transparent transition-all group-hover:ring-primary/30'>
                      <AvatarImage src={author.avatarUrl} alt={author.name} />
                      <AvatarFallback>{author.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className='text-foreground font-semibold leading-tight group-hover:text-primary transition-colors'>
                        {author.name}
                      </h2>
                      <p className='text-muted-foreground text-sm'>{author.role}</p>
                    </div>
                  </div>

                  <p className='text-muted-foreground line-clamp-3 text-sm leading-relaxed'>{author.bio}</p>

                  <div className='flex flex-wrap gap-1.5'>
                    {author.specialties.map(s => (
                      <Badge key={s} className='bg-primary/10 text-primary border-0 text-xs'>
                        {s}
                      </Badge>
                    ))}
                  </div>

                  <Separator className='opacity-30' />

                  <p className='text-muted-foreground text-xs'>
                    <span className='text-foreground font-semibold'>{postCount}</span>{' '}
                    {postCount === 1 ? 'cikk' : 'cikk'} a magazinban
                  </p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default SzerzokPage
