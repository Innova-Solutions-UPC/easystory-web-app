<template>
    <PostCreator @save="savePost" />
</template>

<script lang="ts" setup>
import publishingController from "@/publishing/model/PublishingController";
import PostCreator from "@/publishing/components/post-creator.component.vue";
import type {CreatePostInterface} from "@/publishing/model/entities/create-post.interface";
import type {Item} from "@/publishing/model/entities/item.interface";
import PostInputInformation from "@/publishing/components/post-input-information.component.vue";
import TextEditor from "@/publishing/components/text-editor.component.vue";


const savePost =(p_post: Item) => {
  publishingController.updateSelectedPost(p_post, publishingController.selectedPost.id!);
}
</script>

<style scoped>

</style>
