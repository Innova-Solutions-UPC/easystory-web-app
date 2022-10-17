<template>
  <div class="card">
    <div class="gallery">
      <div>
        <span class="p-float-label">
            <InputText id="Tittle" type="text" v-model="tittle"/>
            <label for="username">Tittle</label>
        </span>
      </div>
      <div>
        <span class="p-float-label">
            <InputText id="Description" type="text" v-model="description"/>
            <label for="username">Description</label>
        </span>
      </div>
      <div v-if="inputInformation.image.length > 1 "  style="margin-top: 20%">
         <span class="p-float-label">
           <code class="image-edit">Edit</code>
             <Image class="post-image" :src="imageToShow" alt="Image" width="150" height="150" @click="openModal" />
           <Dialog header="Upload Image" v-model:visible="showImageModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}">
            <ImageModal @upload-image="myUploader"  />
        </Dialog>
            <label for="username">Image</label>
        </span>
      </div>
      <div v-else >
        <span class="p-float-label">
        <label for="username">Image</label>
        <Button label="Upload" @click="openModal"  />
          <Dialog header="Upload Image" v-model:visible="showImageModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}">
            <ImageModal @upload-image="myUploader"  />
        </Dialog>

        </span>
      </div>
      <div>
        <span class="p-float-label">
        <label for="username">Status</label>
        <Dropdown v-model="status" :options="statusOptions" placeholder="Select status"/>
        </span>
      </div>
      <div>
        <span class="p-float-label">
        <label for="username">Hashtags</label>
        <Chips style="max-width:250px; max-height: 50px" v-model="hashtags"/>
        </span>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref} from "vue";
import {EPostStatus, ICreatePost} from "@/publishingLifecycle/model/IPublishing";
import ImageModal from "@/publishingLifecycle/components/imageModal.vue";


const props = defineProps<{
  inputInformation: ICreatePost;
}>()

const statusOptions = Object.keys(EPostStatus).filter((v) => isNaN(Number(v)));

const tittle = ref(props.inputInformation.title);
const description = ref(props.inputInformation.description);
const image: Ref<string | FormData |undefined>  = ref(props.inputInformation.image);
const status = ref(props.inputInformation.status);
const hashtags = ref(props.inputInformation.hashtags);



const imageToShow = ref(props.inputInformation.image);


const myUploader = (data: FormData, blobUrl: string) => {
  showImageModal.value =false;
  image.value = data;
  imageToShow.value = blobUrl;
}

const showImageModal = ref(false);
const openModal=()=>{
  showImageModal.value = true;
}



defineExpose({
  tittle,
  description,
  image,
  status,
  hashtags
})
</script>

<style scoped>
.gallery {
  display: grid;
  gap: 1rem;
  grid-auto-rows: 5rem;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 25rem), 1fr));
  box-shadow: 0 5px 10px 0 rgba(72, 83, 83, 0.7);
  border-radius: 20px;
  align-items: center;
  min-height: 210px;
}

.post-image:hover{
  cursor: pointer;
opacity: .5;
}
.image-edit{
  position: absolute;
  left:200px;
  top:60px;
  font-size: large;
}
.image-edit:hover{
  z-index: 99999999;
}
</style>
