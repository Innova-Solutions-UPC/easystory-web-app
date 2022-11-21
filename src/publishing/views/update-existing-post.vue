<template>
  <div>
    <PostCreator class="opacity-loading" @save="savePost" />
  <ProgressSpinner
    class="loading-spinner"
    v-if="showLoading"
    style="width: 5vw; height: 50px"
    strokeWidth="8"
    fill="var(--surface-ground)"
    animationDuration=".5s"
  />
  <Toast  style="margin-top: 3%;"/>
  </div>

</template>

<script lang="ts" setup>
import publishingFacade from "@/publishing/model/publishing.facade";
import PostCreator from "@/publishing/components/post-creator.component.vue";
import type { Item } from "@/shared/models/entities/item.interface";
import { computed, ref } from "vue";
import { useToast } from "primevue/usetoast";
import router from "@/shared/plugins/router";
import { translate } from '../../shared/plugins/i18n/i18n';

const createdSuccesfully = ref(false);
const showLoading = ref(false);
const toast = useToast();
const showOpacity = computed(() => (showLoading.value ? 0.2 : 1));

const savePost = async (p_post: Item) => {
  showLoading.value = true;
  createdSuccesfully.value = await publishingFacade.updateSelectedPost(
    p_post,
    publishingFacade.selectedPost.id!
  );
  console.log(createdSuccesfully.value)
  createdSuccesfully.value
    ? toast.add({
        severity: "success",
        summary: translate('toast-post-updated'),
        detail: translate('toasr-description-post-updated'),
        life: 3000,
      })
    : toast.add({
        severity: "error",
        summary: translate('toast-post-updated-error'),
        detail: translate('toasr-description-post-updated-error'),
        life: 3000,
      });

  setTimeout(()=> {
    showLoading.value = false;
    createdSuccesfully.value ? router.push("/my-posts") : console.log("oh no");
  }, 3000)

};
</script>

<style scoped>
.loading-spinner {
  position: absolute;
  top: 15vh;
  left: 45vw;
}
.opacity-loading {
  opacity: v-bind(showOpacity);
}
</style>
