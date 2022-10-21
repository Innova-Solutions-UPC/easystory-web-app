<template>
  <Suspense>
    <template #default>
      <div>
        <Button @click="router.push('/create-post')" icon="pi pi-plus-circle"  class="add-btn"/>
      <div class="posts-gallery">
        <PostCard v-for="post in posts.items" :post="post" @click="selectPost(post)" />
      </div>
      </div>
    </template>
    <template #fallback>
    <PostSkeleton />
      <Skeleton width="100%" height="22rem" />
    </template>
  </Suspense>

</template>

<script lang="ts" setup>
import type {AuthorPosts} from "@/publishing/model/entities/author-posts.interface";
import publishingController from "@/publishing/model/PublishingController";
import PostSkeleton from "@/publishing/components/post-skeleton.component.vue";
import type {Item} from "@/publishing/model/entities/item.interface";
import {watch} from "vue";
import router from "@/shared/router";
import PostCard from "@/publishing/components/post-card.component.vue";

await publishingController.loadInfo();

const posts: AuthorPosts = publishingController.postsByAuthor!;

const selectPost = (p_post: Item) => {
  Object.assign(publishingController.selectedPost!, p_post);
  console.log('FROM ALL POSTS VIEWS: ', publishingController.selectedPost);
  router.push('/update-post')
}
</script>


<style scoped>
.posts-gallery{
  margin-top: 1rem;
  display: grid;
  gap: 1rem;
  grid-auto-rows: 15rem;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
}
.add-btn{
  margin: 2rem 45%;
}
</style>
