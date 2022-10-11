<template>
  <Editor v-model="post" editorStyle="height: 40vh">
    <template v-slot:toolbar>
                <span class="ql-formats">
                    <button class="ql-bold" ></button>
                    <button class="ql-italic"></button>
                    <button class="ql-underline" ></button>
                </span>
    </template>
  </Editor>
</template>

<script lang="ts" setup>
import type {Ref} from "vue";
import {ref} from "vue";

const post: Ref<string> = ref('');

defineExpose({
  post
})
</script>

<style scoped>

</style>
