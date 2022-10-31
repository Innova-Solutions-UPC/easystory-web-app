<template>
  <div>
    <Button
      @click="router.push('/create-post')"
      icon="pi pi-plus-circle"
      class="add-btn"
    />
    <div class="posts-gallery">
      <PostCard
        v-for="post in posts.items"
        :key="post.id"
        :post="post"
        @click="selectPost(post)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { AuthorPosts } from "@/publishing/model/entities/author-posts.interface";
import publishingFacade from "@/publishing/model/publishing.facade";
import type { Item } from "@/shared/models/entities/item.interface";
import router from "@/shared/router";
import PostCard from "@/publishing/components/post-card.component.vue";
// import {computed, ref} from "vue";

// const showLoading = ref(true);
// const showOpacity = computed(() => showLoading.value ? 0.2 : 1);
await publishingFacade.loadInfo();

const posts: AuthorPosts = publishingFacade.postsByAuthor!;

const selectPost = (p_post: Item) => {
  Object.assign(publishingFacade.selectedPost!, p_post);
  console.log("FROM ALL POSTS VIEWS: ", publishingFacade.selectedPost);
  router.push("/update-post");
};
</script>

<style scoped>
.posts-gallery {
  margin-top: 1rem;
  display: grid;
  gap: 1rem;
  grid-auto-rows: 15rem;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
}
.add-btn {
  margin: 2rem 45%;
}
.loading-spinner {
  position: absolute;
  top: 15vh;
  left: 45vw;
}
.opacity-loading {
  opacity: v-bind(showOpacity);
}
</style>
