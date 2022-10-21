<template>
  <Editor v-model="post" editorStyle="height: 40vh">
<!--    <template v-slot:toolbar>-->
<!--                <span class="ql-formats">-->
<!--                    <button class="ql-bold" ></button>-->
<!--                    <button class="ql-italic"></button>-->
<!--                    <button class="ql-underline" ></button>-->
<!--                </span>-->
<!--    </template>-->
  </Editor>
</template>

<script lang="ts" setup>
import type {Ref} from "vue";
import {ref} from "vue";
import type {CreatePostInterface} from "@/publishing/model/entities/create-post.interface";
import {EPostStatus} from "@/publishing/model/entities/post-status.enum";
import type {Item} from "@/publishing/model/entities/item.interface";
import publishingController from "@/publishing/model/PublishingController";




const post= ref(publishingController.selectedPost.content);

defineExpose({
  post
})
</script>
<script lang="ts">
export default {
  name: "TextEditor"
}
</script>

<style scoped>

</style>
