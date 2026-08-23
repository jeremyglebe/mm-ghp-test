<script setup lang="ts">
import { withBase } from 'vitepress'
</script>

<template>
  <footer class="site-footer">
    <p>© 2026 Jeremy Glebe</p>
    <nav aria-label="Footer navigation">
      <a :href="withBase('/feed.xml')">RSS</a>
      <a href="https://github.com/jeremyglebe">GitHub</a>
      <a href="https://jeremyglebe.com">Professional site</a>
    </nav>
  </footer>
</template>
