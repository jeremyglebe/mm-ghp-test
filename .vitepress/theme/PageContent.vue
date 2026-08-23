<script setup lang="ts">
import { Content, useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <article class="standalone-page">
    <header class="page-header">
      <p v-if="frontmatter.eyebrow" class="eyebrow">{{ frontmatter.eyebrow }}</p>
      <h1>{{ frontmatter.title }}</h1>
      <p v-if="frontmatter.description">{{ frontmatter.description }}</p>
    </header>
    <div class="prose">
      <Content />
    </div>
  </article>
</template>
