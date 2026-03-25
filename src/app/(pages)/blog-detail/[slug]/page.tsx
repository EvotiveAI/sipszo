import Link from 'next/link'
import type { Metadata } from 'next'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { notFound } from 'next/navigation'

import CTA from '@/components/blocks/cta-section/cta-section'
import Blog from '@/components/blocks/blog-related-post/blog-related-post'
import NewsletterSignup from '@/components/blocks/newsletter-signup/newsletter-signup'
import SupportButton from '@/components/blocks/support-button/support-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { DynamicToc } from '@/components/table-of-contents/dynamic-toc'

import { blogPosts } from '@/assets/data/blog-posts'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://korkapcsolas.hu'

// Generate per-article metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)
  if (!post) return {}

  return {
    title: `${post.title} | Körkapcsolás`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${APP_URL}/blog-detail/${post.slug}`,
      siteName: 'Körkapcsolás — Prémium Magyar Sportelemzés',
      images: [
        {
          url: `${APP_URL}${post.imageUrl}`,
          width: 1200,
          height: 630,
          alt: post.imageAlt
        }
      ],
      locale: 'hu_HU',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      section: post.category
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`${APP_URL}${post.imageUrl}`]
    },
    alternates: {
      canonical: `${APP_URL}/blog-detail/${post.slug}`
    }
  }
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  return blogPosts.map(post => ({
    slug: post.slug
  }))
}

// Navigation component for previous/next posts
const PostNavigation = ({ currentPost }: { currentPost: (typeof blogPosts)[0] }) => {
  const sortedPosts = blogPosts.sort((a, b) => a.id - b.id)
  const currentIndex = sortedPosts.findIndex(post => post.id === currentPost.id)

  const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null

  return (
    <div className='flex w-full justify-between'>
      {previousPost ? (
        <Link href={`/blog-detail/${previousPost.slug}`}>
          <Button className='rounded-[8px]' variant='outline'>
            <ChevronLeftIcon className='size-4' />
            Előző cikk
          </Button>
        </Link>
      ) : (
        <Button className='rounded-[8px]' variant='outline' disabled>
          <ChevronLeftIcon className='size-4' />
          Előző cikk
        </Button>
      )}

      {nextPost ? (
        <Link className='ml-auto' href={`/blog-detail/${nextPost.slug}`}>
          <Button
            className='rounded-[8px] bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20'
            variant='outline'
          >
            Következő cikk
            <ChevronRightIcon className='size-4' />
          </Button>
        </Link>
      ) : (
        <Button
          className='ml-auto rounded-[8px] bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20'
          variant='outline'
          disabled
        >
          Következő cikk
          <ChevronRightIcon className='size-4' />
        </Button>
      )}
    </div>
  )
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const post = blogPosts.find(p => p.slug === slug)

  const { default: Post } = await import(`@/content/${slug}.mdx`)

  if (!post || !Post) {
    notFound()
  }

  // Get related posts with same category first, then fill with other posts
  const sameCategoryPosts = blogPosts.filter(p => p.category === post.category && p.slug !== post.slug)
  const otherPosts = blogPosts.filter(p => p.category !== post.category && p.slug !== post.slug)

  // Combine: same category posts first, then other posts, limit to 3
  const relatedPosts = [...sameCategoryPosts, ...otherPosts].slice(0, 3)

  // Per-article Article schema (replaces the generic template)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${APP_URL}#website`,
        name: 'Körkapcsolás — Prémium Magyar Sportelemzés',
        description: 'Mélyelemzések, taktikai értékelések és okos fogadási útmutatók sportelemzésekre specializált szerkesztőségtől.',
        url: APP_URL,
        inLanguage: 'hu-HU',
        publisher: {
          '@type': 'Organization',
          name: 'Körkapcsolás',
          url: APP_URL,
          logo: {
            '@type': 'ImageObject',
            url: `${APP_URL}/images/logo.png`
          }
        }
      },
      {
        '@type': 'Article',
        '@id': `${APP_URL}/blog-detail/${post.slug}#article`,
        headline: post.title,
        description: post.description,
        image: {
          '@type': 'ImageObject',
          url: `${APP_URL}${post.imageUrl}`,
          caption: post.imageAlt
        },
        datePublished: post.date,
        dateModified: post.date,
        author: {
          '@type': 'Person',
          name: post.author
        },
        publisher: {
          '@type': 'Organization',
          name: 'Körkapcsolás',
          url: APP_URL
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${APP_URL}/blog-detail/${post.slug}`
        },
        articleSection: post.category,
        timeRequired: `PT${post.readTime}M`,
        inLanguage: 'hu-HU'
      }
    ]
  }

  return (
    <div>
      <section className='py-8 sm:pt-16 sm:pb-24'>
        <div className='mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:space-y-16 lg:px-8'>
          <div className='gap-16 md:grid md:grid-cols-5 lg:grid-cols-7'>
            <div className='hidden md:col-span-2 md:block lg:col-span-2'>
              <DynamicToc />
            </div>

            <div className='space-y-12 md:col-span-3 lg:col-span-5'>
              <div className='space-y-6'>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                    <BreadcrumbLink href='/'>Főoldal</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href='/#categories'>Archívum</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{post.category}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <h1 className='text-foreground font-serif text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-[2.4rem]'>
                  {post.title}
                </h1>

                <p className='text-muted-foreground text-lg leading-relaxed sm:text-xl'>{post.description}</p>

                <Separator />

                <div className='flex flex-wrap justify-between gap-4'>
                  <div className='flex flex-wrap items-center gap-3'>
                    <Avatar className='size-11.5'>
                      <AvatarImage src={post.avatarUrl} alt={post.author} />
                      <AvatarFallback className='text-xs'>
                        {post.author
                          .split(' ')
                          .map(n => n[0])
                          .join('')
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col gap-1'>
                      <span className='text-muted-foreground text-sm'>Szerző</span>
                      <span className='text-foreground text-sm font-medium'>{post.author}</span>
                    </div>
                  </div>
                  <div className='flex flex-col gap-1.5'>
                    <span className='text-muted-foreground text-sm'>Olvasási idő</span>
                    <span className='text-foreground text-sm font-medium'>{post.readTime} perc</span>
                  </div>
                  <div className='flex flex-col gap-1.5'>
                    <span className='text-muted-foreground text-sm'>Megjelent</span>
                    <span className='text-foreground text-sm font-medium'>{post.date}</span>
                  </div>
                </div>
              </div>

              <div>
                <img src={post.imageUrl} alt={post.imageAlt} className='max-h-148 w-full rounded-[8px]' />
              </div>

              <article id='content' className='space-y-6 leading-[1.875]'>
                <Post />
              </article>

              {/* Support + Newsletter — after article content */}
              <SupportButton variant='card' />

              <NewsletterSignup variant='inline' />

              <PostNavigation currentPost={post} />
            </div>
          </div>
        </div>
      </section>

      <Blog blogPosts={relatedPosts} />

      <CTA />

      {/* Per-article Article schema JSON-LD */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, '\\u003c')
        }}
      />
    </div>
  )
}

