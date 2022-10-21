<template>
  <PostCreator @save="savePost" />
</template>

<script lang="ts" setup>
import publishingController from "@/publishing/model/PublishingController";
import PostCreator from "@/publishing/components/post-creator.vue";
import type {CreatePostInterface} from "@/publishing/model/entities/createPost.interface";


const savePost =(p_post: CreatePostInterface) => {
  publishingController.createNewPost(p_post, true);
}

</script>

<style scoped>
.card-container{
  margin-top: 2%;
}
</style>
