<template>
  <PostCreator @save="savePost" :title="existingPost.title" :content="existingPost.content" :description="existingPost.description" :hashtags="existingPost.hashtags" :image="existingPost.image" :status="existingPost.status" />
</template>

<script lang="ts" setup>
import publishingController from "@/publishing/model/PublishingController";
import PostCreator from "@/publishing/components/post-creator.vue";
import type {CreatePostInterface} from "@/publishing/model/entities/createPost.interface";

const savePost =(p_post: CreatePostInterface) => {
  publishingController.createNewPost(p_post, false);
}

let existingPost = publishingController.getPostById(4);



</script>

<style scoped>

</style>
