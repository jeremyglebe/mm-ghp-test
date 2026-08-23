<script setup lang="ts">
import { computed } from 'vue'
import { Content, useData, useRoute, withBase } from 'vitepress'
import { data as posts } from '../posts.data'
import { formatDate, normalizeRoute } from './utils'

const { frontmatter } = useData()
const route = useRoute()

const currentIndex = computed(() => {
  const currentPath = normalizeRoute(route.path)
  return posts.findIndex((post) => normalizeRoute(post.url) === currentPath)
})

const currentPost = computed(() =>
  currentIndex.value >= 0 ? posts[currentIndex.value] : undefined,
)
const newerPost = computed(() =>
  currentIndex.value > 0 ? posts[currentIndex.value - 1] : undefined,
)
const olderPost = computed(() =>
  currentIndex.value >= 0 && currentIndex.value < posts.length - 1
    ? posts[currentIndex.value + 1]
    : undefined,
)

const date = computed(() => {
  const value = frontmatter.value.date
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value ?? '').slice(0, 10)
})

const tags = computed(() => currentPost.value?.tags ?? [])
const readingMinutes = computed(() => currentPost.value?.readingMinutes ?? 1)
const externalUrl = computed(
  () => currentPost.value?.externalUrl ?? String(frontmatter.value.link ?? ''),
)
</script>

<template>
  <article class="article">
    <header class="article-header">
      <a class="back-link" :href="withBase('/posts/')">← All posts</a>
      <h1>{{ frontmatter.title }}</h1>
      <p v-if="frontmatter.description" class="article-deck">
        {{ frontmatter.description }}
      </p>
      <div class="article-meta">
        <time :datetime="date">{{ formatDate(date) }}</time>
        <span aria-hidden="true">·</span>
        <span>{{ readingMinutes }} min read</span>
      </div>
    </header>

    <aside v-if="externalUrl" class="external-note">
      <span>Elsewhere</span>
      <a :href="externalUrl">Visit the linked site <span aria-hidden="true">↗</span></a>
    </aside>

    <div class="prose">
      <Content />
    </div>

    <footer class="article-footer">
      <ul v-if="tags.length" class="tag-list" aria-label="Tags">
        <li v-for="tag in tags" :key="tag">{{ tag }}</li>
      </ul>

      <nav v-if="newerPost || olderPost" class="post-navigation" aria-label="Post navigation">
        <a v-if="olderPost" :href="withBase(olderPost.url)">
          <span>Older</span>
          {{ olderPost.title }}
        </a>
        <a v-if="newerPost" :href="withBase(newerPost.url)">
          <span>Newer</span>
          {{ newerPost.title }}
        </a>
      </nav>
    </footer>
  </article>
</template>
