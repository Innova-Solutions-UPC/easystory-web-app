import { defineProps } from 'vue';
<template>

  <div class="grid grid-nogutter surface-section text-800">
    <div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
      <section>
        <span class="block text-6xl font-bold mb-1">{{ translate('bc-home-last-post-tittle')}}</span>
        <div class="text-6xl text-primary font-bold mb-3">{{ props.post.title }}</div>
        <p class="mt-0 mb-4 text-700 line-height-3">{{ props.post.description }}</p>
        <Button @click="selectPost()" :label="translate('bc-home-last-post-view-more')" type="button" class="mr-3 p-button-raised"></Button>
      </section>
    </div>
    <div class="col-12 md:col-6 overflow-hidden">
      <img :src="props.post.image" alt="Image" class="md:ml-auto block md:h-full"
        style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)">
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Item } from "@/shared/models/entities/item.interface";
import router from "@/shared/plugins/router";
import Button from "primevue/button";
import socialFacade from "../model/social.facade";
import { translate } from '../../shared/plugins/i18n/i18n';
const selectPost = () => {
  socialFacade.selectedPost = props.post;
  router.push('/post-detail')
}
const props = defineProps<{
  post: Item
}>();

console.log(props.post, 'ñññññññ')
</script>

<script lang="ts">
export default {
  name: "last-item"
}
</script>