<template>
<!--  <Editor v-model="post" editorStyle="height: 40vh">-->
<!--&lt;!&ndash;    <template v-slot:toolbar>&ndash;&gt;-->
<!--&lt;!&ndash;                <span class="ql-formats">&ndash;&gt;-->
<!--&lt;!&ndash;                    <button class="ql-bold" ></button>&ndash;&gt;-->
<!--&lt;!&ndash;                    <button class="ql-italic"></button>&ndash;&gt;-->
<!--&lt;!&ndash;                    <button class="ql-underline" ></button>&ndash;&gt;-->
<!--&lt;!&ndash;                </span>&ndash;&gt;-->
<!--&lt;!&ndash;    </template>&ndash;&gt;-->
<!--  </Editor>-->
  <QuillEditor theme="snow"  toolbar="full" content-type="text" :content="post" class="quill-editor" style="min-height: 40vh;" />
</template>

<script lang="ts" setup>
import type {Ref} from "vue";
import {ref} from "vue";

import type {CreatePostInterface} from "@/publishing/model/entities/create-post.interface";
import {EPostStatus} from "@/publishing/model/entities/post-status.enum";
import type {Item} from "@/shared/models/entities/item.interface";
import publishingFacade from "@/publishing/model/publishing.facade";
import {QuillEditor} from "@vueup/vue-quill";




const post= ref(publishingFacade.selectedPost.content);

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
