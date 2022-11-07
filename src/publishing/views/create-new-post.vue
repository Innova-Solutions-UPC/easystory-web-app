<template>
  <div class="bg-post">
    <PostCreator class="opacity-loading" @save="savePost" />
  <ProgressSpinner
    class="loading-spinner"
    v-if="showLoading"
    style="width: 5vw; height: 50px"
    strokeWidth="8"
    fill="var(--surface-ground)"
    animationDuration=".5s"
  />
  <Toast />
  </div>
  
</template>

<script lang="ts" setup>
import publishingFacade from "@/publishing/model/publishing.facade";
import PostCreator from "@/publishing/components/post-creator.component.vue";
import type { Item } from "@/shared/models/entities/item.interface";
import { computed, ref } from "vue";
import { useToast } from "primevue/usetoast";
import router from "@/shared/router";

Object.assign(publishingFacade.selectedPost, {});
const createdSuccesfully = ref(false);
const showLoading = ref(false);
const toast = useToast();
const showOpacity = computed(() => (showLoading.value ? 0.2 : 1));

const savePost = async (p_post: Item) => {
  showLoading.value = true;
  Object.assign(publishingFacade.selectedPost, p_post);
  createdSuccesfully.value = await publishingFacade.createNewPost(p_post);
  console.log(createdSuccesfully.value)
  createdSuccesfully.value
    ? toast.add({
        severity: "success",
        summary: "Success Message",
        detail: "Message Content",
        life: 3000,
      })
    : toast.add({
        severity: "error",
        summary: "Error Message",
        detail: "Message Content",
        life: 3000,
      });

  setTimeout(()=> {
    showLoading.value = false;
    createdSuccesfully.value ? router.push("/my-posts") : console.log("oh no");
  }, 3000)
};
</script>

<style scoped>
.card-container {
  margin-top: 2%;
}

.loading-spinner {
  position: absolute;
  top: 15vh;
  left: 45vw;
}
.opacity-loading {
  opacity: v-bind(showOpacity);
}
.bg-post{
  
  background: #bdc3c7;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #272b2e, #474b4e);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #232527, #383a3b);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
