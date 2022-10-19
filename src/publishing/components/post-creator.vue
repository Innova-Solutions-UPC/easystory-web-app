<template>
  <div class="card-container">
    <div class="block  font-bold text-center p-4 border-round mb-3">
      <PostInputInformation ref="postInputInformation" :input-information="newPost"/>
    </div>
    <div class="block  font-bold text-center p-4 border-round mb-3">
      <TextEditor ref="textEditor"   :post-information="newPost"/>
    </div>
    <div class="block font-bold text-center p-4 border-round mb-3">
      <Button @click="savePost" label="Save" icon="pi pi-check"/>
    </div>
  </div>
</template>

<script lang="ts" setup>

import TextEditor from "@/publishing/components/text-editor.vue";
import {computed, reactive, ref} from "vue";
import PostInputInformation from "@/publishing/components/post-input-information.vue";
import type {CreatePostInterface} from "@/publishing/model/entities/createPost.interface";
import {EPostStatus} from "@/publishing/model/entities/postStatus.enum";

const textEditor = ref<InstanceType<typeof TextEditor> | null>(null);
const postInputInformation = ref<InstanceType<typeof PostInputInformation> | null>(null);


const props = withDefaults(defineProps<{
  title?: string,
  description?: string,
  status?: EPostStatus,
  content?: string,
  image?: string,
  hashtags?: Array<string>
}>(), {
  title: '',
  image: '',
  description: '',
  status: undefined,
  hashtags: undefined,
  content: ''
})


const newPost: CreatePostInterface = reactive({
  title: props.title,
  description: props.description,
  image: props.image,
  content: props.content,
  status: props.status,
  hashtags: props.hashtags
})

const savePost = () => {
  newPost.content = textEditor.value.post;
  newPost.image = postInputInformation.value.image;
  newPost.description = postInputInformation.value.description;
  newPost.title = postInputInformation.value.tittle;
  newPost.hashtags = postInputInformation.value.hashtags
  newPost.status = postInputInformation.value.status;
  emits('save', newPost);
}

const emits = defineEmits<{
  (e: 'save', post: CreatePostInterface): void;
}>();


</script>

<style scoped>

</style>
