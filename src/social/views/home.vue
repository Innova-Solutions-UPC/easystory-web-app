<template>
<div>
  <HomeItem v-for="post in post" :key="post.id" :post="post" />
</div>
</template>

<script lang="ts" setup>
import {computed} from "vue";
import socialFacade from "@/social/model/social.facade";
import HomeItem from "@/social/components/item.component.vue";

await socialFacade.loadPosts();
const posts = computed(()=> socialFacade.allPosts?.items);
const selectedPost = computed(()=> socialFacade.selectedPost);
</script>

<style scoped>

</style>
