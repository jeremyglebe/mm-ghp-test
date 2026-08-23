<script setup lang="ts">
import { withBase } from 'vitepress'
</script>

<template>
  <section class="not-found">
    <p class="eyebrow">404</p>
    <h1>This room is empty.</h1>
    <p>The page may have moved, or perhaps it was only ever an idea.</p>
    <a class="primary-link" :href="withBase('/')">Return home</a>
  </section>
</template>
