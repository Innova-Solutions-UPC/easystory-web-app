<template>
<div class="posts-gallery">
  <post-card />
</div>
</template>

<script lang="ts" setup>

import PostCard from "@/publishing/components/post-card.vue";
</script>

<style scoped>
.posts-gallery{
  margin-top: 1rem;
  display: grid;
  gap: 1rem;
  grid-auto-rows: 15rem;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
}
</style>
