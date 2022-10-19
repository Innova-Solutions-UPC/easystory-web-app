<template>
  <FileUpload name="demo[]" url="./upload" :customUpload="true" @uploader="myUploader">
    <template #content>
      <p>Additional content.</p>
    </template>
    <template #empty>
      <p>Drag and drop files to here to upload.</p>
    </template>
  </FileUpload>

</template>

<script lang="ts" setup>
import {defineEmits} from "vue";

const emits = defineEmits<{
  (e: 'uploadImage', data: FormData, bloblUrl: string): void;
}>();

const myUploader =(event: any) => {
  const formdata = new FormData();
  const selectedFile = event.files[0];
  formdata.append('image', selectedFile);
  emits('uploadImage', formdata, selectedFile.objectURL);
}
</script>

<style scoped>

</style>
