<template>
<div v-bind="containerProps" class="props-cnt">
  <div v-bind="wrapperProps" class="gallery">
    <div v-for="{index, data} in list" :key="index">
      <HomeItem :post="data" />
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import {computed, watch} from "vue";
import socialFacade from "@/social/model/social.facade";
import HomeItem from "@/social/components/item.component.vue";
import {useVirtualList} from "@vueuse/core";

await socialFacade.loadPosts();
await socialFacade.loadBookmarks();
const posts = computed(()=> socialFacade.allPosts?.items);
const selectedPost = computed(()=> socialFacade.selectedPost);

const {list, containerProps, wrapperProps} = useVirtualList(posts.value!,{
  itemHeight: 496
})

</script>



<style lang="scss" scoped>
.gallery{
  display: grid;
  gap: 5rem;
  grid-auto-rows: 10%;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
}
.props-cnt{
  margin-left: 1%;
  margin-right: 1%;
  margin-top: 2%;
}
</style>
