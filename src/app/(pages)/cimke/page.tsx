import Link from 'next/link'
import { blogPosts } from '@/assets/data/blog-posts'
import { authors } from '@/assets/data/authors'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export const metadata = {
  title: 'Címkék | TAKTIKA',
  description: 'Böngéssz témák, kulcsszavak és szerzők szerint a TAKTIKA tartalmai között.'
}

const CimkekPage = () => {
  const categories = [...new Set(blogPosts.map(p => p.category))].sort()
  const authorNames = [...new Set(blogPosts.map(p => p.author))].sort()

  const categoryCounts = Object.fromEntries(
    categories.map(cat => [cat, blogPosts.filter(p => p.category === cat).length])
  )
  const authorCounts = Object.fromEntries(
    authorNames.map(name => [name, blogPosts.filter(p => p.author === name).length])
  )

  const authorSlugMap = Object.fromEntries(
    authors.map(a => [a.name, a.slug])
  )

  return (
    <div className='mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8'>
      {/* Header */}
      <div className='mb-12 space-y-3'>
        <p className='text-muted-foreground text-xs font-medium uppercase tracking-[0.22em]'>Feltárás</p>
        <h1 className='text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl'>Címkék</h1>
        <p className='text-muted-foreground max-w-2xl text-lg'>
          Keress rá témakörökre, szerzőkre — fedezd fel a TAKTIKA teljes tartalmát.
        </p>
        <Separator className='mt-6 max-w-24 opacity-40' />
      </div>

      <div className='space-y-12'>
        {/* Categories as tags */}
        <section className='space-y-5'>
          <h2 className='text-lg font-bold tracking-tight'>Témakörök</h2>
          <div className='flex flex-wrap gap-3'>
            {categories.map(cat => (
              <Link key={cat} href={`/cimke/${encodeURIComponent(cat)}`}>
                <Badge
                  className='bg-primary/10 text-primary hover:bg-primary/20 border-0 cursor-pointer px-4 py-2 text-sm font-medium transition-colors'
                >
                  {cat}
                  <span className='text-primary/60 ml-2 font-normal'>{categoryCounts[cat]}</span>
                </Badge>
              </Link>
            ))}
          </div>
        </section>

        <Separator className='opacity-30' />

        {/* Authors as tags */}
        <section className='space-y-5'>
          <h2 className='text-lg font-bold tracking-tight'>Szerzők</h2>
          <div className='flex flex-wrap gap-3'>
            {authorNames.map(name => {
              const slug = authorSlugMap[name]
              return (
                <Link key={name} href={slug ? `/szerzo/${slug}` : '#'}>
                  <Badge
                    variant='outline'
                    className='hover:border-primary hover:text-primary cursor-pointer px-4 py-2 text-sm font-medium transition-colors'
                  >
                    {name}
                    <span className='text-muted-foreground ml-2 font-normal'>{authorCounts[name]}</span>
                  </Badge>
                </Link>
              )
            })}
          </div>
        </section>

        <Separator className='opacity-30' />

        {/* All tags alphabetically */}
        <section className='space-y-5'>
          <h2 className='text-lg font-bold tracking-tight'>Minden témacímke</h2>
          <div className='flex flex-wrap gap-2'>
            {categories.map(cat => (
              <Link key={cat} href={`/cimke/${encodeURIComponent(cat)}`}>
                <span className='text-muted-foreground hover:text-primary border-b border-dashed border-current pb-0.5 text-sm transition-colors cursor-pointer'>
                  #{cat.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'es')}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default CimkekPage
