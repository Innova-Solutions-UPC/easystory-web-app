<template>
  <div class="author-posts">
    <Button
      @click="router.push('/create-post')"
      icon="pi pi-plus-circle"
      class="add-btn"
    />
    <div class="posts-gallery" ref="parent">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @click="selectPost(post)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { AuthorPosts } from "@/shared/models/entities/author-posts.interface";
import publishingFacade from "@/publishing/model/publishing.facade";
import type { Item } from "@/shared/models/entities/item.interface";
import router from "@/shared/plugins/router";
import PostCard from "@/publishing/components/post-card.component.vue";
import { useAutoAnimate } from '@formkit/auto-animate/vue'
// import {computed, ref} from "vue";

// const showLoading = ref(true);
// const showOpacity = computed(() => showLoading.value ? 0.2 : 1);
await publishingFacade.loadInfo();

const posts: AuthorPosts | Array<Item> = publishingFacade.postsByAuthor!;
const [parent] = useAutoAnimate()
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
