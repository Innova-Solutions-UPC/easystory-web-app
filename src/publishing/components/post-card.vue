<template>
<div class="post-container">
  <div class="transparent-side border-1 border-bottom-none border-blue-50">
    <Breadcrumb :home="home" :model="items" />
    <Image src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" alt="Image" class="post-image"/>
  </div>
  <div class="information-side">
    <Tag class="mr-2 post-name" severity="info" value="Inasdsadsad sadad"></Tag>
  </div>

</div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

//import {defineProps} from "vue";
//import type {Item} from "@/publishing/model/entities/item.interface";
//
//const props = defineProps<{
//  post: Item
//}>();



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
}
.post-container{
  background-color: transparent;
}
.post-image{
  z-index: 1;
  position: relative;
  top:10px;
  max-width: 120px;
  max-height: 120px;
}
.post-name{
  position: absolute;
  bottom: 10px;
  left: 35%;
  right: 35%;
}
</style>
