<script setup lang="ts">
import { withBase } from 'vitepress'
import type { PostSummary } from '../posts.data'
import { formatDate } from './utils'

defineProps<{
  posts: PostSummary[]
}>()
</script>

<template>
  <div class="post-list">
    <article v-for="post in posts" :key="post.url" class="post-row">
      <time :datetime="post.date">{{ formatDate(post.date) }}</time>
      <div>
        <h3>
          <a :href="withBase(post.url)">{{ post.title }}</a>
        </h3>
        <p>{{ post.description }}</p>
        <ul v-if="post.tags.length" class="tag-list" aria-label="Tags">
          <li v-for="tag in post.tags" :key="tag">{{ tag }}</li>
        </ul>
      </div>
    </article>
  </div>
</template>
