import Link from 'next/link'
import { blogPosts } from '@/assets/data/blog-posts'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export const metadata = {
  title: 'Rovatok | Körkapcsolás',
  description: 'Böngéssz témakör szerint a Körkapcsolás cikkei között.'
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Legendás Meccsek': 'Azok a találkozók, amelyek örökre beírták magukat a sporthistóriába. Gólok, fordulatok, legendák.',
  'Sporttörténelem': 'A sport múltjának mélyrétegei — a nagy korszakok, fordulópontok és elfelejtett hősök.',
  'Ikonok & Legendák': 'Portrék azokról, akik nemcsak sportolók, hanem kulturális jelenségek is.',
  'Aktuális Elemzések': 'Taktikai bontások, idényelemzések és a jelenkori futball mélyrétegei.',
  'Okos Tippek': 'Valószínűség, logika és felelős gondolkodás a sportfogadásban — ígéret nélkül.'
}

const CATEGORY_COLORS: Record<string, string> = {
  'Legendás Meccsek': 'from-amber-500/10 to-orange-500/5',
  'Sporttörténelem': 'from-sky-500/10 to-blue-500/5',
  'Ikonok & Legendák': 'from-purple-500/10 to-violet-500/5',
  'Aktuális Elemzések': 'from-emerald-500/10 to-green-500/5',
  'Okos Tippek': 'from-rose-500/10 to-red-500/5'
}

const RovatokPage = () => {
  const allPosts = blogPosts
  const categories = [...new Set(allPosts.map(p => p.category))].sort()

  return (
    <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
      {/* Header */}
      <div className='mb-12 space-y-3'>
        <p className='text-muted-foreground text-xs font-medium uppercase tracking-[0.22em]'>
          Témakörök
        </p>
        <h1 className='text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'>Rovatok</h1>
        <p className='text-muted-foreground max-w-2xl text-lg'>
          Válogass a témakörök között — minden rovat más-más szemszögből közelíti meg a sportot.
        </p>
        <Separator className='mt-6 max-w-24 opacity-40' />
      </div>

      {/* Categories Grid */}
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {categories.map(category => {
          const posts = allPosts.filter(p => p.category === category)
          const latest = posts[posts.length - 1]
          const gradient = CATEGORY_COLORS[category] ?? 'from-muted/50 to-muted/20'

          return (
            <Link key={category} href={`/?cat=${encodeURIComponent(category)}#categories`}>
              <Card
                className={`group h-full cursor-pointer overflow-hidden shadow-none transition-all duration-300 hover:shadow-md bg-gradient-to-br ${gradient}`}
              >
                <CardContent className='flex flex-col gap-4 p-6'>
                  <div className='flex items-start justify-between gap-3'>
                    <h2 className='text-foreground text-xl font-bold leading-tight group-hover:text-primary transition-colors'>
                      {category}
                    </h2>
                    <Badge className='bg-primary/10 text-primary shrink-0 border-0 text-sm font-semibold'>
                      {posts.length}
                    </Badge>
                  </div>

                  <p className='text-muted-foreground text-sm leading-relaxed'>
                    {CATEGORY_DESCRIPTIONS[category] ?? 'Cikkek ebből a témakörből.'}
                  </p>

                  {latest && (
                    <>
                      <Separator className='opacity-30' />
                      <div className='space-y-1'>
                        <p className='text-muted-foreground text-xs uppercase tracking-wide'>Legutóbbi</p>
                        <p className='text-foreground line-clamp-2 text-sm font-medium'>{latest.title}</p>
                        <p className='text-muted-foreground text-xs'>{latest.author} · {latest.date}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* All articles link */}
      <div className='mt-12 text-center'>
        <Link
          href='/#categories'
          className='text-primary hover:text-primary/80 text-sm font-medium underline-offset-4 hover:underline transition-colors'
        >
          Összes cikk megtekintése →
        </Link>
      </div>
    </div>
  )
}

export default RovatokPage
