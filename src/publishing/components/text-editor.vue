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
import type {CreatePost} from "@/publishing/model/entities/CreatePost";
import {EPostStatus} from "@/publishing/model/entities/PostStatus";



const props = defineProps<{
  postInformation: CreatePost
}>()

const post= ref(props.postInformation.content);

defineExpose({
  post
})
</script>

<style scoped>

</style>
