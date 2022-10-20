<template>
  <Suspense>
    <template #default>
      <div class="posts-gallery">
        <post-card />
      </div>
    </template>
    <template #fallback>
    ...loadinf
    </template>
  </Suspense>

</template>

<script lang="ts" setup>
import PostCard from "@/publishing/components/post-card.vue";
import type {AuthorPosts} from "@/publishing/model/entities/authorPosts.interface";
import publishingController from "@/publishing/model/PublishingController";

const posts: AuthorPosts = await publishingController.getPostsByAutenticatedUser();
console.log(posts)
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
