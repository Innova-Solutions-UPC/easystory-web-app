<template>
  <PostCreator @save="savePost" :title="existingPost.title" :content="existingPost.content" :description="existingPost.description" :hashtags="existingPost.hashtags" :image="existingPost.image" :status="existingPost.status" />
</template>

<script lang="ts" setup>
import {ICreatePost} from "@/publishingLifecycle/model/IPublishing";
import publishingController from "@/publishingLifecycle/model/PublishingController";
import PostCreator from "@/publishingLifecycle/components/post-creator.vue";

const savePost =(p_post: ICreatePost) => {
  publishingController.createNewPost(p_post, false);
}

let existingPost = publishingController.getPostById(4);



</script>

<style scoped>

</style>
