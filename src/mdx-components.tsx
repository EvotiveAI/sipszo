import type { MDXComponents } from 'mdx/types'

const components = {
  h2: ({ children }) => <h2 className='text-foreground mt-16 mb-4 scroll-mt-20 text-2xl font-semibold'>{children}</h2>,
  h3: ({ children }) => <h3 className='text-foreground mb-4 scroll-mt-20 text-xl font-medium'>{children}</h3>,
  p: ({ children }) => <p className='text-muted-foreground mb-4'>{children}</p>,
  ul: ({ children }) => <ul className='mb-4 list-inside list-disc space-y-2 pl-2'>{children}</ul>,
  li: ({ children }) => <li className='text-muted-foreground'>{children}</li>,
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <figure className='my-8'>
      <img
        src={src}
        alt={alt ?? ''}
        loading='lazy'
        decoding='async'
        className='w-full rounded-lg object-cover shadow-md'
      />
      {alt && (
        <figcaption className='text-muted-foreground mt-2 text-center text-sm italic'>
          {alt}
        </figcaption>
      )}
    </figure>
  )
} satisfies MDXComponents

export function useMDXComponents(): MDXComponents {
  return components
}
