<template>
  <Card style="width: 25rem; margin-bottom: 2em">
    <template #title>
      Edit user information
    </template>
    <template #content>
      <InputText type="text" v-model="editableInformation.username" />
      <InputText type="text" v-model="editableInformation.email" />
      <InputText type="text" v-model="value1" />
      <ImageModal base-folder="Profile" @upload-image="imageUploaded" />
      <Button @click="uploadInformation">Save changes</Button>
    </template>
  </Card>
</template>


<script lang="ts" setup>
import type {UserInterface} from "@/shared/models/entities/autenticated-user.interface";
import {reactive} from "vue";
import ImageModal from "@/publishing/components/image-modal.component.vue";
import profileFacade from "@/bookstore/profile/domain/service/profile.facade";

const imageUploaded = (url: string) => {
  console.log({url})
}
const props = defineProps<{
  userInfo: UserInterface
}>()
const editableInformation:UserInterface = reactive(props.userInfo);
const uploadInformation =async () => {
  await profileFacade.updateUserInformation(editableInformation);
}
</script>

<script lang="ts">
export default {
  name: "edit-information"
}
</script>

<style scoped>

</style>
