<template>
  <div class="card-container ">
    <div class="block  font-bold text-center p-4 border-round mb-3">
      <PostInputInformation ref="postInputInformation"/>
    </div>
    <div class="block  font-bold text-center p-4 border-round mb-3">
      <TextEditor ref="textEditor"/>
    </div>
    <div class="block font-bold text-center p-4 border-round mb-3">
      <Button @click="savePost" label="Save" icon="pi pi-check"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import TextEditor from "@/publishingLifecycle/components/text-editor.vue";
import {computed, reactive, ref} from "vue";
import PostInputInformation from "@/publishingLifecycle/components/post-input-information.vue";
import type {ICreatePost} from "@/publishingLifecycle/model/IPublishing";
import {EPostStatus} from "@/publishingLifecycle/model/IPublishing";
import publishingController from "@/publishingLifecycle/model/PublishingController";

const textEditor = ref<InstanceType<typeof TextEditor> | null>(null);
const postInputInformation = ref<InstanceType<typeof PostInputInformation> | null>(null);


const newPost: ICreatePost  = reactive({
  title: '',
  description: '',
  image: '',
  content: '',
  status: EPostStatus.Draft,
})

const savePost = () => {
  newPost.content = textEditor.value.post;
  newPost.image = postInputInformation.value.image;
  newPost.description = postInputInformation.value.description;
  newPost.title = postInputInformation.value.tittle;
  publishingController.createNewPost(newPost);
}
</script>

<style scoped>

</style>
