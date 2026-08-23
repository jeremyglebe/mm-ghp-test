import { createContentLoader } from 'vitepress'

export interface PostSummary {
  title: string
  description: string
  date: string
  url: string
  tags: string[]
  categories: string[]
  readingMinutes: number
  externalUrl?: string
  image?: string
}

declare const data: PostSummary[]
export { data }

function asText(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function asList(value: unknown) {
  const values = Array.isArray(value) ? value : value ? [value] : []

  return values
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean)
}

function asDate(value: unknown, url: string) {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10)
  }

  const text = asText(value)
  const match = text.match(/^\d{4}-\d{2}-\d{2}/)

  if (!match || Number.isNaN(Date.parse(match[0] + 'T12:00:00Z'))) {
    throw new Error('Post needs a valid YYYY-MM-DD date: ' + url)
  }

  return match[0]
}

function publicPostUrl(sourceUrl: string) {
  const filename = sourceUrl.replace(/\\/g, '/').split('/').at(-1) ?? ''
  const slug = filename
    .replace(/\.html$/, '')
    .replace(/\.md$/, '')
    .replace(/^\d{4}-\d{2}-\d{2}-/, '')

  return '/posts/' + slug + '/'
}

function plainText(source: string) {
  return source
    .replace(/^---[\s\S]*?---\s*/m, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<!--([\s\S]*?)-->/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~|\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function readingMinutes(source: string) {
  const words = plainText(source).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 220))
}

export default createContentLoader('_posts/*.md', {
  includeSrc: true,
  transform(rawPages): PostSummary[] {
    return rawPages
      .map((page) => {
        const source = page.src ?? ''
        const title = asText(page.frontmatter.title)
        const description = asText(page.frontmatter.description)

        if (!title) {
          throw new Error('Post needs a title: ' + page.url)
        }

        if (!description) {
          throw new Error('Post needs a description: ' + page.url)
        }

        return {
          title,
          description,
          date: asDate(page.frontmatter.date, page.url),
          url: publicPostUrl(page.url),
          tags: asList(page.frontmatter.tags),
          categories: asList(page.frontmatter.categories ?? page.frontmatter.category),
          readingMinutes: readingMinutes(source),
          externalUrl: asText(page.frontmatter.link) || undefined,
          image: asText(page.frontmatter.image) || undefined,
        }
      })
      .sort((a, b) => b.date.localeCompare(a.date))
  },
})
