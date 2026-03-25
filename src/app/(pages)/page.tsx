import { blogPosts } from '@/assets/data/blog-posts'

import HeroSection from '@/components/blocks/hero-section/hero-section'
import Blog from '@/components/blocks/blog-component/blog-component'
import CTA from '@/components/blocks/cta-section/cta-section'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://korkapcsolas.hu'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${APP_URL}#website`,
      name: 'Körkapcsolás — Prémium Magyar Sportelemzés',
      description:
        'Mélyelemzések, taktikai értékelések, legendás meccsek és okos fogadási útmutatók — felelős, gondolkodó sportrajongóknak.',
      url: APP_URL,
      inLanguage: 'hu-HU',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${APP_URL}/legfrissebb?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Körkapcsolás',
        url: APP_URL,
        sameAs: [
          'https://facebook.com/korkapcsolas',
          'https://instagram.com/korkapcsolas',
          'https://twitter.com/korkapcsolas',
          'https://youtube.com/@korkapcsolas'
        ]
      }
    }
  ]
}

const Home = () => {
  return (
    <div>
      <HeroSection blogData={blogPosts} />
      <Blog />
      <CTA />
      {/* Add JSON-LD to your page */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')
        }}
      />
    </div>
  )
}

export default Home
