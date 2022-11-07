<template>
<div class="post-container">
  <div class="transparent-side ">
    <Tag class="mr-2 tag-status" severity="warning" :value="props.post.status"></Tag>
    <Image width="120" height="140" :src="props.post.image" alt="Image" class="post-image"/>
  </div>
  <div class="information-side">
    <Tag class="mr-2 post-name" severity="info" :value="props.post.title"></Tag>
  </div>

</div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

import {defineProps} from "vue";
import type {Item} from "@/shared/models/entities/item.interface";

const props = defineProps<{
 post: Item
}>();



const home = ref({
  icon: 'pi pi-home',
  to: '/',
});
const items = ref([
  {label: 'Computer'},
  {label: 'Notebook'},
  {label: 'Accessories'},
  {label: 'Backpacks'},
  {label: 'Item'}
]);


</script>
<script lang="ts">
export default {
  name: "PostCard"
}
</script>

<style scoped>
.transparent-side{
  background-color: transparent;
  height: 30%;
  display: flex
}
.information-side{
  background-color: #193f6c;
  height: 70%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  text-align: center;
}
.post-container{
  background-color: transparent;
  cursor: pointer;
}
.post-image{
  z-index: 1;
  position: relative;
  top:10px;
}
.post-name{
  position: absolute;
  bottom: 10px;
  left: 35%;
  right: 35%;
}
.tag-status{
  position: absolute;
  bottom: 10px;
  left: 2px;
  max-height: 26px;
  top: 2px
}


</style>
