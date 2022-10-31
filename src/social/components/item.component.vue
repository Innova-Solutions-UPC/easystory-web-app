<template>
<div class="item-cnt">
  <Card style="width: 25em; ">
    <template #header>
      <Image width="120" height="140" :src="props.post.image" alt="Image" class="post-image"/>
    </template>
    <template #title>
      {{props.post.title}}
    </template>
    <template #subtitle>
      <h4>By: {{props.post.author.username }}</h4>
      <code>Time Ago: {{timeAgo}}</code>

    </template>
    <template #content>
      <p>{{props.post.content}}</p>
    </template>
    <template #footer>
      <Button @click="startShare" icon="pi pi-check" label="Save" />
    </template>
  </Card>
</div>
</template>


<script lang="ts" setup>
import type {Item} from "@/shared/models/entities/item.interface";
import {useShare, useTimeAgo} from "@vueuse/core";

const props = defineProps<{
  post: Item;
}>();
console.log(props);
const timeAgo = useTimeAgo(new Date(props.post.createdAt!))


//LINK: https://vueuse.org/core/useShare/
const { share, isSupported } = useShare()
function startShare() {
  share({
    title: 'Hello',
    text: 'Hello my friend!',
    url: location.href,
  })
}
</script>



<script lang="ts">
import {computed, ref} from "vue";
import {TransitionPresets, useTimeAgo, useTransition} from "@vueuse/core";

export default {
  name: "HomeItem"
}
</script>

<style scoped>
.item-cnt{
  height: 5vh !important;
}
</style>
