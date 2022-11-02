<template>
  <div
      class="w-full p-8 rounded shadow-2xl bg-charcoal-600 card card-cnt"
      ref="target"
      :style="{
      transform: cardTransform,
      transition: 'transform 0.25s ease-out'
    }"
      @click="selectPost"
  >
    <h1 class="mb-2 text-2xl font-bold">{{ props.post.title }}</h1>
    <section class="flex" style="margin-bottom: 15px">
      <img
          :src="props.post.image"
          class="w-8 h-8 mr-4 rounded image-book"
      />
      <h2 class="font-2xl"> @{{ props.post.author.username }}</h2>
    </section>
    <code>{{ props.post.slug }}</code>

<!--    <Editor readonly v-model="props.post.content" editorStyle="height: 150px" class="editor-cnt" style="margin-top: 15px">-->
<!--      <template v-slot:toolbar style="display: none">-->
<!--      </template>-->
<!--    </Editor>-->
    <QuillEditor class="quill-preview" theme="bubble" read-only content-type="html" :content="props.post.content" />
  </div>
</template>


<script lang="ts" setup>
import type {Item} from "@/shared/models/entities/item.interface";
import {useMouseInElement, useShare, useTimeAgo} from "@vueuse/core";
import {computed, ref} from "vue";
import socialFacade from "@/social/model/social.facade";
import router from "@/shared/router";
import {QuillEditor} from "@vueup/vue-quill";

const props = defineProps<{
  post: Item;
}>();

console.log(props);
const timeAgo = useTimeAgo(new Date(props.post.createdAt!));
const selectPost = () => {
  socialFacade.selectedPost = props.post;
  router.push('/post-detail')
}



//LINK: https://vueuse.org/core/useShare/
const {share, isSupported} = useShare()

function startShare() {
  share({
    title: 'Hello',
    text: 'Hello my friend!',
    url: location.href,
  })
}

//LINK: https://www.youtube.com/watch?v=AVMNjbKdU1M
const target = ref(null)
const {elementX, elementY, isOutside, elementHeight, elementWidth} =
    useMouseInElement(target)
const cardTransform = computed(() => {
  const MAX_ROTATION = 75
  const rX = (
      MAX_ROTATION / 2 -
      (elementY.value / elementHeight.value) * MAX_ROTATION
  ).toFixed(2) // handles x-axis
  const rY = (
      (elementX.value / elementWidth.value) * MAX_ROTATION -
      MAX_ROTATION / 2
  ).toFixed(2) // handles y-axis
  return isOutside.value
      ? ''
      : `perspective(${elementWidth.value}px) rotateX(${rX}deg) rotateY(${rY}deg)`
})
</script>


<script lang="ts">
import {computed, ref} from "vue";
import {TransitionPresets, useTimeAgo, useTransition} from "@vueuse/core";

export default {
  name: "HomeItem"
}
</script>

<style >
.item-cnt {
  height: 5vh !important;
}

.image-book {
  max-width: 90px;
  max-height: 50px;
}

.card-cnt {
  background-color: #191a23;
  border-radius: 30px;
  max-height: 400px;
}

.card-cnt:hover {
  box-shadow: 0px 10px 20px 2px rgba(0, 255, 255, 0.7);
  cursor: pointer;
}
.p-editor-toolbar{
  display: none;
}

.p-editor-container {
  background-color: transparent !important;
  border-style: none;
}
.quill-preview{
  border-radius: 30px;
  background-color: #20212e;
  margin-top: 5px;
  height: 120px;

}

</style>

