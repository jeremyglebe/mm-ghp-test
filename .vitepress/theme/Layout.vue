<script setup lang="ts">
import { useData } from 'vitepress'
import HomePage from './HomePage.vue'
import NotFound from './NotFound.vue'
import PageContent from './PageContent.vue'
import PostPage from './PostPage.vue'
import PostsPage from './PostsPage.vue'
import SiteFooter from './SiteFooter.vue'
import SiteHeader from './SiteHeader.vue'

const { frontmatter, page } = useData()
</script>

<template>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <SiteHeader />

  <main id="main-content" tabindex="-1">
    <NotFound v-if="page.isNotFound" />
    <HomePage v-else-if="frontmatter.layout === 'home'" />
    <PostsPage v-else-if="frontmatter.layout === 'posts'" />
    <PostPage v-else-if="frontmatter.layout === 'post'" />
    <PageContent v-else />
  </main>

  <SiteFooter />
</template>
