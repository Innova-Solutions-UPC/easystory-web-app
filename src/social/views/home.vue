<template>
  <div>
    <div>
      <LastPostComponent :post="posts?.filter(e => e.id == 63).at(0)!" />
    </div>
    <div v-bind="containerProps" class="props-cnt">
      <div v-bind="wrapperProps" class="gallery">
        <div v-auto-animate v-for="{ index, data } in list" :key="index">
          <HomeItem :post="data" />
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { computed, watch } from "vue";
import socialFacade from "@/social/model/social.facade";
import HomeItem from "@/social/components/item.component.vue";
import { useVirtualList } from "@vueuse/core";
import LastPostComponent from "../components/last-post.component.vue";

await socialFacade.loadPosts();
await socialFacade.loadBookmarks();
const posts = computed(() => socialFacade.allPosts?.items);
const selectedPost = computed(() => socialFacade.selectedPost);

const { list, containerProps, wrapperProps } = useVirtualList(posts.value!, {
  itemHeight: 380
})

</script>



<style lang="scss" scoped>
.gallery {
  margin-left: 10px;
  margin-right: 1% !important;
  display: grid;
  gap: 1rem;
  grid-auto-rows: 8%;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
}

.props-cnt {
  padding-top: 20px;
  background: #bdc3c7;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2c3e50, #bdc3c7);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2c3e50, #bdc3c7);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
