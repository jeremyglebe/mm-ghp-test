<script setup lang="ts">
import { withBase } from 'vitepress'
import { data as posts } from '../posts.data'
import PostList from './PostList.vue'
</script>

<template>
  <section class="home-hero" aria-labelledby="home-title">
    <p class="eyebrow">A quiet corner of the internet</p>
    <h1 id="home-title">Jeremy's Place</h1>
    <p class="home-intro">
      Notes on making things, learning in public, and finding my way back to the
      projects I enjoy.
    </p>
    <div class="hero-links">
      <a class="primary-link" :href="withBase('/posts/')">Read the posts</a>
      <a href="https://jeremyglebe.com">
        Professional site <span aria-hidden="true">↗</span>
      </a>
    </div>
  </section>

  <section class="latest-section" aria-labelledby="latest-title">
    <div class="section-heading">
      <div>
        <p class="eyebrow">From the notebook</p>
        <h2 id="latest-title">Latest posts</h2>
      </div>
      <a :href="withBase('/posts/')">View all</a>
    </div>

    <PostList :posts="posts.slice(0, 3)" />
  </section>

  <section class="place-note" aria-labelledby="place-note-title">
    <p class="eyebrow">About this place</p>
    <div>
      <h2 id="place-note-title">The less polished half.</h2>
      <p>
        JeremyGlebe.com holds the concise professional version. This is where the
        longer thoughts, experiments, game projects, and works in progress get room
        to breathe.
      </p>
      <a :href="withBase('/about/')">More about me</a>
    </div>
  </section>
</template>
