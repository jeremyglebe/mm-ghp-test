<script setup lang="ts">
import { useRoute, withBase } from 'vitepress'
import { normalizeRoute } from './utils'

const route = useRoute()

function isActive(path: string) {
  const current = normalizeRoute(route.path)
  return path === '/' ? current === '/' : current.startsWith(path)
}
</script>

<template>
  <header class="site-header">
    <a class="site-name" :href="withBase('/')">
      <span aria-hidden="true">J</span>
      <span>Jeremy's Place</span>
    </a>

    <nav aria-label="Primary navigation">
      <a :href="withBase('/posts/')" :aria-current="isActive('/posts/') ? 'page' : undefined">
        Posts
      </a>
      <a :href="withBase('/about/')" :aria-current="isActive('/about/') ? 'page' : undefined">
        About
      </a>
      <a class="portfolio-link" href="https://jeremyglebe.com">
        JeremyGlebe.com <span aria-hidden="true">↗</span>
      </a>
    </nav>
  </header>
</template>
