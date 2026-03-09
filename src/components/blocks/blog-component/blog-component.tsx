'use client'

import { useState, useMemo } from 'react'

import { useRouter } from 'next/navigation'

import { SearchIcon, ArrowRightIcon, CalendarDaysIcon, XIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

import { blogPosts } from '@/assets/data/blog-posts'

export type BlogPost = {
  id: number
  slug: string
  title: string
  description: string
  imageUrl: string
  imageAlt: string
  date: string
  category: string
  author: string
  avatarUrl: string
  readTime: number
  featured: boolean
}

const BlogGrid = ({
  posts,
  onCategoryClick,
  searchQuery
}: {
  posts: BlogPost[]
  onCategoryClick: (category: string) => void
  searchQuery: string
}) => {
  const router = useRouter()

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return posts
    const q = searchQuery.toLowerCase()
    return posts.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }, [posts, searchQuery])

  if (filtered.length === 0) {
    return (
      <div className='text-muted-foreground flex flex-col items-center gap-3 py-16 text-center'>
        <SearchIcon className='size-10 opacity-30' />
        <p className='text-lg font-medium'>Nincs találat erre: &ldquo;{searchQuery}&rdquo;</p>
        <p className='text-sm'>Próbálj más kulcsszóra keresni.</p>
      </div>
    )
  }

  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {filtered.map(post => (
        <Card
          key={post.id}
          className='group h-full cursor-pointer overflow-hidden shadow-none transition-all duration-300'
          onClick={() => router.push(`/blog-detail/${post.slug}`)}
        >
          <CardContent className='space-y-3.5'>
            <div className='mb-6 overflow-hidden rounded-lg sm:mb-12'>
              <img
                src={post.imageUrl}
                alt={post.imageAlt}
                className='h-59.5 w-full object-cover transition-transform duration-300 group-hover:scale-105'
              />
            </div>
            <div className='flex items-center justify-between gap-1.5'>
              <div className='text-muted-foreground flex items-center gap-1.5'>
                <CalendarDaysIcon className='size-5' />
                <span>{post.date}</span>
              </div>
              <Badge
                className='bg-primary/10 text-primary rounded-full border-0 text-sm'
                onClick={e => {
                  e.stopPropagation()
                  onCategoryClick(post.category)
                }}
              >
                {post.category}
              </Badge>
            </div>
            <h3 className='line-clamp-2 text-lg font-medium md:text-xl'>{post.title}</h3>
            <p className='text-muted-foreground line-clamp-2'>{post.description}</p>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium'>{post.author}</span>
              <Button
                size='icon'
                className='group-hover:bg-primary! bg-background text-foreground hover:bg-primary! hover:text-primary-foreground group-hover:text-primary-foreground border group-hover:border-transparent hover:border-transparent'
              >
                <ArrowRightIcon className='size-4 -rotate-45' />
                <span className='sr-only'>Tovább: {post.title}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

const Blog = () => {
  const [selectedTab, setSelectedTab] = useState('Összes')
  const [searchQuery, setSearchQuery] = useState('')

  const nonFeaturedPosts = useMemo(
    () => blogPosts.filter(post => !post.featured).sort((a, b) => b.id - a.id),
    []
  )

  const uniqueCategories = [...new Set(nonFeaturedPosts.map(post => post.category))]
  const categories = ['Összes', ...uniqueCategories.sort()]

  const isSearching = searchQuery.trim().length > 0

  return (
    <section className='py-8 sm:py-16 lg:py-24' id='categories'>
      <div className='mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:space-y-16 lg:px-8'>
        {/* Header */}
        <div className='space-y-4'>
          {!isSearching && selectedTab === 'Összes' && (
            <p className='text-muted-foreground text-xs font-medium uppercase tracking-[0.2em]'>Cikkek</p>
          )}
          {!isSearching && selectedTab !== 'Összes' && (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href='#'>Archívum</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{selectedTab}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          )}
          {isSearching && (
            <p className='text-muted-foreground text-xs font-medium uppercase tracking-[0.2em]'>
              Keresési eredmények
            </p>
          )}

          <h2 className='text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl'>
            Sport mint kultúra, történelem és stratégia.
          </h2>

          <p className='text-muted-foreground text-lg md:text-xl'>
            Mélyelemzések, portrék és taktikai útmutatók — nyugodtan, értelmesen, mélyen.
          </p>
        </div>

        {/* Tabs and Search */}
        <Tabs
          defaultValue='Összes'
          value={isSearching ? 'Összes' : selectedTab}
          onValueChange={val => {
            setSelectedTab(val)
            setSearchQuery('')
          }}
          className='gap-8 lg:gap-16'
        >
          <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
            <ScrollArea className='bg-muted w-full rounded-lg sm:w-auto'>
              <TabsList className='h-auto gap-1'>
                {categories.map(category => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    id={`category-${category}`}
                    className='hover:bg-primary/10 cursor-pointer rounded-lg px-4 text-base'
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>

            <div className='relative max-md:w-full'>
              <div className='text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3'>
                <SearchIcon className='size-4' />
              </div>
              <Input
                type='search'
                placeholder='Keresés cím, szerző, kategória...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='peer h-10 pl-9 pr-9 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none'
              />
              {isSearching && (
                <button
                  onClick={() => setSearchQuery('')}
                  className='text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex items-center pr-3 transition-colors'
                >
                  <XIcon className='size-4' />
                  <span className='sr-only'>Keresés törlése</span>
                </button>
              )}
            </div>
          </div>

          {isSearching ? (
            <BlogGrid
              posts={nonFeaturedPosts}
              onCategoryClick={cat => {
                setSearchQuery('')
                setSelectedTab(cat)
              }}
              searchQuery={searchQuery}
            />
          ) : (
            <>
              <TabsContent value='Összes'>
                <BlogGrid posts={nonFeaturedPosts} onCategoryClick={setSelectedTab} searchQuery='' />
              </TabsContent>
              {categories.slice(1).map(category => (
                <TabsContent key={category} value={category}>
                  <BlogGrid
                    posts={nonFeaturedPosts.filter(post => post.category === category)}
                    onCategoryClick={setSelectedTab}
                    searchQuery=''
                  />
                </TabsContent>
              ))}
            </>
          )}
        </Tabs>
      </div>
    </section>
  )
}

export default Blog
