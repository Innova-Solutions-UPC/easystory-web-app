<template>
  <div class="card-container">
    <div class="block  font-bold text-center p-4 border-round mb-3">
      <PostInputInformation ref="postInputInformation" />
    </div>
    <div class="block  font-bold text-center p-4 border-round mb-3">
      <TextEditor ref="textEditor"  />
    </div>
    <div class="block font-bold text-center p-4 border-round mb-3">
      <Button @click="savePost" :label="translate('bc-publishing-publish')" icon="pi pi-check"/>
    </div>
  </div>
</template>

<script lang="ts" setup>

import  TextEditor from "@/publishing/components/text-editor.component.vue";
import {computed, reactive, ref} from "vue";
import  PostInputInformation from "@/publishing/components/post-input-information.component.vue";
import type {CreatePostInterface} from "@/publishing/model/entities/create-post.interface";
import type {EPostStatus} from "@/publishing/model/entities/post-status.enum";
import type {Item} from "@/shared/models/entities/item.interface";
import publishingFacade from "@/publishing/model/publishing.facade";
import { translate } from "@/shared/plugins/i18n/i18n";


const textEditor = ref<InstanceType<typeof TextEditor> | null>(null);
const postInputInformation = ref<InstanceType<typeof PostInputInformation> | null>(null);


const newPost: Item = reactive(publishingFacade.selectedPost!)
newPost.hashtags = newPost.hashtags?.map( e => {
  return [e.name]
}).flat();

const savePost = () => {
  newPost.content = textEditor.value?.post;
  //TODO:
  // newPost.image = postInputInformation.value.image;
  newPost.image = 'https://st.booknet.com/uploads/covers/220/1602531481_84.png'
  newPost.description = postInputInformation.value?.description;
  newPost.title = postInputInformation.value?.tittle;
  newPost.hashtags = postInputInformation.value?.hashtags
  newPost.status = postInputInformation.value?.status;
  emits('save', newPost);
}

const emits = defineEmits<{
  (e: 'save', post: Item): void;
}>();


</script>
<script lang="ts">
export default {
  name: "PostCreator"
}
</script>

<style scoped>

</style>
