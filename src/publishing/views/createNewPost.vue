<template>
  <PostCreator @save="savePost" />
</template>

<script lang="ts" setup>
import publishingController from "@/publishing/model/PublishingController";
import PostCreator from "@/publishing/components/post-creator.vue";
import type {CreatePost} from "@/publishing/model/entities/CreatePost";


const savePost =(p_post: CreatePost) => {
  publishingController.createNewPost(p_post, true);
}

</script>

<style scoped>
.card-container{
  margin-top: 2%;
}
</style>
