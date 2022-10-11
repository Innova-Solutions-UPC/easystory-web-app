<template>
  <PostCreator @save="savePost" />
</template>

<script lang="ts" setup>
import type {ICreatePost} from "@/publishingLifecycle/model/IPublishing";
import publishingController from "@/publishingLifecycle/model/PublishingController";
import PostCreator from "@/publishingLifecycle/components/post-creator.vue";


const savePost =(p_post: ICreatePost) => {
  publishingController.createNewPost(p_post, true);
}

</script>

<style scoped>
.card-container{
  margin-top: 2%;
}
</style>
