import { mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { createContentLoader, defineConfig } from 'vitepress'

const siteOrigin = 'https://jeremy.place'
const postsDirectory = resolve(process.cwd(), '_posts')

function slugFromFilename(filename: string) {
  return basename(filename, '.md')
    .replace(/^\d{4}-\d{2}-\d{2}-/, '')
    .trim()
}

const postFiles = readdirSync(postsDirectory, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.md') && !entry.name.startsWith('_'))
  .map((entry) => entry.name)
  .sort()

const seenSlugs = new Set<string>()
const postRewrites = Object.fromEntries(
  postFiles.map((filename) => {
    const slug = slugFromFilename(filename)

    if (!slug) {
      throw new Error('Post filename must include a slug: ' + filename)
    }

    if (seenSlugs.has(slug)) {
      throw new Error('Duplicate post slug: ' + slug)
    }

    seenSlugs.add(slug)
    return ['_posts/' + filename, 'posts/' + slug + '/index.md']
  }),
)

function publicPostUrl(sourceUrl: string) {
  const filename = sourceUrl.replace(/\\/g, '/').split('/').at(-1) ?? ''
  const slug = slugFromFilename(filename.replace(/\.html$/, '').replace(/\.md$/, ''))
  return '/posts/' + slug + '/'
}

function canonicalPath(relativePath: string, layout?: string) {
  const path = relativePath.replace(/\\/g, '/')

  if (layout === 'home' || path === 'index.md') {
    return '/'
  }

  if (layout === 'posts' || path === 'posts/index.md') {
    return '/posts/'
  }

  if (layout === 'post') {
    const sourceMatch = path.match(/^_posts\/(.+)\.md$/)
    const routeMatch = path.match(/^posts\/([^/]+)\/index\.md$/)
    const slug = sourceMatch ? slugFromFilename(sourceMatch[1]) : routeMatch?.[1]
    return slug ? '/posts/' + slug + '/' : undefined
  }

  if (path === 'about/index.md') {
    return '/about/'
  }

  return undefined
}

function asText(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function asDate(value: unknown) {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10)
  }

  const text = asText(value)
  const match = text.match(/^\d{4}-\d{2}-\d{2}/)

  if (!match || Number.isNaN(Date.parse(match[0] + 'T12:00:00Z'))) {
    return undefined
  }

  return match[0]
}

function asList(value: unknown) {
  const values = Array.isArray(value) ? value : value ? [value] : []
  return values
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean)
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function redirectDocument(target: string, title: string) {
  const escapedTarget = escapeXml(target)
  const escapedTitle = escapeXml(title)

  return [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    '  <meta http-equiv="refresh" content="0; url=' + escapedTarget + '">',
    '  <link rel="canonical" href="' + siteOrigin + escapedTarget + '">',
    '  <title>' + escapedTitle + " | Jeremy's Place</title>",
    '</head>',
    '<body>',
    '  <p>This page moved to <a href="' + escapedTarget + '">' + escapedTitle + '</a>.</p>',
    '</body>',
    '</html>',
    '',
  ].join('\n')
}

export default defineConfig({
  title: "Jeremy's Place",
  titleTemplate: ":title | Jeremy's Place",
  description: 'Personal notes from Jeremy Glebe on projects, games, code, and learning in public.',
  lang: 'en-US',
  base: '/',
  appearance: false,
  rewrites: postRewrites,
  srcExclude: ['README.md', '_posts/_examples/**'],
  sitemap: {
    hostname: siteOrigin,
  },
  head: [
    ['meta', { name: 'theme-color', content: '#faf8f3' }],
    ['link', { rel: 'icon', type: 'image/jpeg', href: '/assets/images/bio-photo.jpg' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: "Jeremy's Place", href: '/feed.xml' }],
  ],
  markdown: {
    theme: 'github-light',
    image: {
      lazyLoading: true,
    },
  },
  transformPageData(pageData) {
    const relativePath = pageData.relativePath.replace(/\\/g, '/')
    const isPost =
      /^_posts\/.+\.md$/.test(relativePath) ||
      /^posts\/[^/]+\/index\.md$/.test(relativePath)
    let layout = asText(pageData.frontmatter.layout)

    if (isPost && !layout) {
      layout = 'post'
      pageData.frontmatter.layout = layout
    }

    const title = layout === 'home' ? "Jeremy's Place" : pageData.title + " | Jeremy's Place"
    const description =
      asText(pageData.frontmatter.description) ||
      "Personal notes from Jeremy Glebe on projects, games, code, and learning in public."
    const path = canonicalPath(pageData.relativePath, layout)
    const head = (pageData.frontmatter.head ??= [])

    head.push(
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:site_name', content: "Jeremy's Place" }],
      ['meta', { property: 'og:type', content: layout === 'post' ? 'article' : 'website' }],
      ['meta', { name: 'twitter:card', content: 'summary' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
    )

    if (path) {
      const canonical = siteOrigin + path
      head.push(
        ['link', { rel: 'canonical', href: canonical }],
        ['meta', { property: 'og:url', content: canonical }],
      )
    }

    const image = asText(pageData.frontmatter.image)
    if (image) {
      head.push(
        ['meta', { property: 'og:image', content: siteOrigin + image }],
        ['meta', { name: 'twitter:image', content: siteOrigin + image }],
      )
    }

    const published = asDate(pageData.frontmatter.date)
    if (layout === 'post' && published) {
      head.push(['meta', { property: 'article:published_time', content: published }])
    }
  },
  async buildEnd(siteConfig) {
    const pages = await createContentLoader('_posts/*.md').load()
    const posts = pages
      .map((page) => {
        const title = asText(page.frontmatter.title)
        const description = asText(page.frontmatter.description)
        const date = asDate(page.frontmatter.date)
        const url = publicPostUrl(page.url)

        if (!title || !description || !date) {
          throw new Error('Every post needs title, date, and description front matter: ' + page.url)
        }

        return {
          title,
          description,
          date,
          url,
          tags: asList(page.frontmatter.tags),
        }
      })
      .sort((a, b) => b.date.localeCompare(a.date))

    const latestDate = posts[0]?.date ?? '2023-11-13'
    const items = posts.map((post) => {
      const link = siteOrigin + post.url
      const categories = post.tags
        .map((tag) => '      <category>' + escapeXml(tag) + '</category>')
        .join('\n')

      return [
        '    <item>',
        '      <title>' + escapeXml(post.title) + '</title>',
        '      <link>' + link + '</link>',
        '      <guid isPermaLink="true">' + link + '</guid>',
        '      <pubDate>' + new Date(post.date + 'T12:00:00Z').toUTCString() + '</pubDate>',
        '      <description>' + escapeXml(post.description) + '</description>',
        categories,
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n')
    })

    const feed = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
      '  <channel>',
      "    <title>Jeremy's Place</title>",
      '    <link>' + siteOrigin + '/</link>',
      '    <description>Personal notes from Jeremy Glebe on projects, games, code, and learning in public.</description>',
      '    <language>en-us</language>',
      '    <lastBuildDate>' + new Date(latestDate + 'T12:00:00Z').toUTCString() + '</lastBuildDate>',
      '    <atom:link href="' + siteOrigin + '/feed.xml" rel="self" type="application/rss+xml" />',
      ...items,
      '  </channel>',
      '</rss>',
      '',
    ].join('\n')

    writeFileSync(resolve(siteConfig.outDir, 'feed.xml'), feed, 'utf8')

    for (const post of posts) {
      const slug = post.url.split('/').filter(Boolean).at(-1)
      if (!slug) continue

      const legacyDirectory = resolve(siteConfig.outDir, 'blog', slug)
      mkdirSync(legacyDirectory, { recursive: true })
      writeFileSync(
        resolve(legacyDirectory, 'index.html'),
        redirectDocument(post.url, post.title),
        'utf8',
      )
    }

    for (const archive of ['categories', 'tags']) {
      const legacyDirectory = resolve(siteConfig.outDir, archive)
      mkdirSync(legacyDirectory, { recursive: true })
      writeFileSync(
        resolve(legacyDirectory, 'index.html'),
        redirectDocument('/posts/', 'Posts'),
        'utf8',
      )
    }
  },
})
