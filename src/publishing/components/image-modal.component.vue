<template>
  <div>
    <div v-if="transactionInProgress" class="loading-status">
      <ProgressSpinner
          style="width: 5vw; height: 50px; opacity: 1 !important;"
          strokeWidth="8"
          fill="var(--surface-ground)"
          animationDuration=".5s"
      />
    </div>

    <FileUpload v-else name="demo[]" url="./upload" :customUpload="true" @uploader="myUploader">
      <template #content>
        <p>Additional content.</p>
      </template>
      <template #empty>
        <p>Drag and drop files to here to upload.</p>
      </template>
    </FileUpload>

    </div>
</template>

<script lang="ts" setup>
import {defineEmits, ref, watch} from "vue";
import firebase from "firebase/compat";

const  props = defineProps<{
  baseFolder: string
}>();

const transactionInProgress = ref(false);

const emits = defineEmits<{
  (e: 'uploadImage', bloblUrl: string): void;
  (e: 'startUploading'): void;
}>();
const imageFirebaseUrlUploaded = ref('');

const myUploader = (event: any) => {

  const selectedFile = event.files[0];
  uploadToFirebase(selectedFile);
  //emits('uploadImage', imageFirebaseUrlUploaded.value);
}
const uploadValue = ref(0);

const uploadToFirebase = (selectedFile: any) => {
  emits('startUploading');
  transactionInProgress.value = true;
  const storageRef = firebase.storage().ref(props.baseFolder + selectedFile.name).put(selectedFile);
  storageRef.on('state_changed', snapshot => {
        let percantaje = (snapshot.bytesTransferred / snapshot.totalBytes);
        uploadValue.value = percantaje;
      }, error => {
        console.log(error);
      },
      () => {
        uploadValue.value = 100;
        storageRef.snapshot.ref.getDownloadURL().then((url) => {
          imageFirebaseUrlUploaded.value = url
          emits('uploadImage', url);
          transactionInProgress.value = false;
        });
      }
  )
}


</script>
<script lang="ts">
export default {
  name: "ImageModal"
}
</script>

<style scoped>

</style>
