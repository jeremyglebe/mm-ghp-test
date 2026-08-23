<script setup lang="ts">
import { computed } from 'vue'
import { data as posts, type PostSummary } from '../posts.data'
import PostList from './PostList.vue'

const groups = computed(() => {
  const byYear = new Map<string, PostSummary[]>()

  for (const post of posts) {
    const year = post.date.slice(0, 4)
    byYear.set(year, [...(byYear.get(year) ?? []), post])
  }

  return [...byYear.entries()]
})
</script>

<template>
  <section class="archive-header" aria-labelledby="archive-title">
    <p class="eyebrow">Writing and work in progress</p>
    <h1 id="archive-title">Posts</h1>
    <p>
      Project notes, things I am learning, and the occasional record that I did,
      in fact, make something.
    </p>
  </section>

  <div class="archive">
    <section v-for="[year, yearPosts] in groups" :key="year" class="year-group">
      <h2>{{ year }}</h2>
      <PostList :posts="yearPosts" />
    </section>
  </div>
</template>
