<template>
  <PostCreator @save="savePost" />
  <ProgressSpinner v-if="showLoading" style="width:50px;height:50px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>
  <Toast />
</template>

<script lang="ts" setup>
import publishingFacade from "@/publishing/model/publishing.facade";
import PostCreator from "@/publishing/components/post-creator.component.vue";
import type {Item} from "@/publishing/model/entities/item.interface";
import {ref} from "vue";
import {useToast} from "primevue/usetoast";
import router from "@/shared/router";

const createdSuccesfully = ref(false);
const showLoading = ref(false);
const toast = useToast();

const savePost =async (p_post: Item) => {
  showLoading.value = true;
  console.log('before save: ', publishingFacade.selectedPost);
  Object.assign(publishingFacade.selectedPost, p_post)
  createdSuccesfully.value = await publishingFacade.createNewPost(p_post);
  createdSuccesfully.value ? toast.add({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000}) :  toast.add({severity:'error', summary: 'Error Message', detail:'Message Content', life: 3000});
  showLoading.value = false;
  createdSuccesfully.value ? router.push('/my-posts') : console.log('oh no');
}

</script>

<style scoped>
.card-container{
  margin-top: 2%;
}
</style>
