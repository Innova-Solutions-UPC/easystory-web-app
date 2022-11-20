<template>
  <Textarea v-model="comment" :autoResize="true" rows="5" cols="30" />
  <Button @click="createComment" :label="translate('bc-publishing-publish')" icon="pi pi-check"  />
  <Toast />
</template>


<script lang="ts" setup>
import {ref} from "vue";
import socialFacade from "@/social/model/social.facade";
import {useToast} from "primevue/usetoast";
import { translate } from '../../shared/plugins/i18n/i18n';
const toast = useToast();

const emits = defineEmits<{
  (e:'commentCreated'): void;
}>()

const props= defineProps<{
  slug: string;
}>();
const comment = ref('');
const createComment = async () => {
  const response = await socialFacade.createComment(props.slug, comment.value);
  if(response.toString().startsWith('2')){
    toast.add({
      severity: "success",
      summary: translate('toast-post-commented'),
      detail: translate('toasr-description-post-commented'),
      life: 5000,
    });
    await socialFacade.loadCommentsForSelectredPost(socialFacade.selectedPost?.slug!);
    emits('commentCreated');
  }
  else {
    toast.add({
      severity: "error",
      summary: translate('toast-post-commented-error'),
      detail: translate('toasr-description-post-commented-error'),
      life: 3000,
    })
  }
}
</script>
<script lang="ts">
export default {
  name: "new-comment"
}
</script>

<style scoped>

</style>
