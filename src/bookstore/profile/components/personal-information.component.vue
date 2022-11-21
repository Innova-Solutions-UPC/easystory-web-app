<template>
  <Card
      class="z-5  flex align-items-center justify-content-center p-4  font-bold text-white border-round shadow-1 personal-information">
    <template #header>
      <img @click="vivibleDialog = true"  style="clip-path: circle(); max-width: 200px" alt="user header"
           :src="user.image">
      <Dialog header="Upload Image" v-model:visible="vivibleDialog" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}">
        <ImageModal base-folder="/Profile/" @upload-image="myUploader" @start-uploading="startUploadingImage = true" />
      </Dialog>
    </template>
    <template #title>
      <h4 style="color: #fff">@{{user.username}}</h4>
    </template>
    <template #content>
      <div class="chips-container ">
        <Chip :label="user.email" icon="pi pi-google"/>
        <Chip label="Lima, Peru" icon="pi pi-map-marker"/>
        <Chip label="+51 998 554 525" icon="pi pi-phone"/>
        <Dropdown v-model="selectedLanguage" :options="languageOptions" optionLabel="label" option-value="value" :editable="true" class="language-dpd"/>
      </div>

    </template>

  </Card>
  <Toast />
</template>

<script lang="ts" setup>
import type {Controller} from "@/shared/models/Controller";
import {injectStrict} from "@/shared/utils/Injections";
import {computed, ComputedRef, onMounted, ref, watch} from 'vue';
import type {UserInterface} from "@/shared/models/entities/autenticated-user.interface";
import type {ComputedVariable} from "vue/macros";
import profileFacade from "@/bookstore/profile/domain/service/profile.facade";
import ImageModal from "@/publishing/components/image-modal.component.vue";
import {useToast} from "primevue/usetoast";
const selectedLanguage = ref(localStorage.getItem('language') ?? 'fr');
const languageOptions = [{label: 'English', value: 'en'}, {label: 'Africano', value: 'af'}, {label: 'Español', value: 'es'}, {label: 'Frances', value: 'fr'}, {label: 'Portugues', value:'pt'}]
const startUploadingImage = ref(false)
const vivibleDialog = ref(false)
const props = defineProps<{
  user: UserInterface
}>();
console.log({props})

const toast = useToast();

const myUploader = async (blobUrl: string) => {
  startUploadingImage.value = false;
  console.log({blobUrl})
  const changedSuccesfully = await profileFacade.updateUserPhoto(blobUrl);
  changedSuccesfully ? toast.add({severity: 'success' , summary: 'Updated successfully' }) : toast.add({severity: 'error' , summary: 'An error occurred' })
  vivibleDialog.value = false;
}

watch(selectedLanguage,(act) => {
  localStorage.setItem('language', act);
  window.location.reload();
})

</script>
<script lang="ts">
export default {
  name: "PersonalInformation"
}
</script>
<style scoped>
.chips-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.personal-information {
  position: absolute;

  max-height: fit-content;
  color: #faf5f5;
  display: flex;
  flex-direction: column;

}
.personal-information{
background: rgba(114, 117, 124, 0.37);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(8.2px);
-webkit-backdrop-filter: blur(8.2px);
}

@media screen and (min-width: 800px) {
  .personal-information {
    margin-left: 5%;
    margin-top: 5%;
    max-width: fit-content;
  }
}

@media screen and (max-width: 799px) {
  .personal-information {
    width: 80vw;
    margin-left: 10vw;
    margin-right: 10vw;
  }
}

.language-dpd{
  height: 36px;
  border-radius: 20px;
}
</style>
