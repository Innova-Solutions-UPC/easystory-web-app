<template>
  <Textarea v-model="comment" :autoResize="true" rows="5" cols="30" />
  <Button @click="createComment" label="Save" icon="pi pi-check"  />
  <Toast />
</template>


<script lang="ts" setup>
import {ref} from "vue";
import socialFacade from "@/social/model/social.facade";
import {useToast} from "primevue/usetoast";
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
      summary: "Comment created",
      detail: "Comment created successfully",
      life: 5000,
    });
    await socialFacade.loadCommentsForSelectredPost(socialFacade.selectedPost?.slug!);
    emits('commentCreated');
  }
  else {
    toast.add({
      severity: "error",
      summary: "There was an error",
      detail: "An error occurred while creating commnet",
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
