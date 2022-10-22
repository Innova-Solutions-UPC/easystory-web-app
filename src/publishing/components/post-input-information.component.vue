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
      <div v-if="image.length > 1 "  style="margin-top: 20%">
         <span class="p-float-label">
           <code class="image-edit">Edit</code>
             <Image class="post-image" :src="imageToShow" alt="Image" width="150" height="150" @click="showImageModalForEditing = true" />
           <Dialog header="Upload Image" v-model:visible="showImageModalForEditing" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}">
            <ImageModal @upload-image="myUploader"  />
        </Dialog>
            <label for="username">Image</label>
        </span>
      </div>
      <div v-else >
        <span class="p-float-label">
        <label for="username">Image</label>
        <Button label="Upload" @click="showImageModalForCreating = true"  />
          <Dialog header="Uploasasaasad Image" v-model:visible="showImageModalForCreating" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}">
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
import { ref} from "vue";
import type { Ref} from "vue";
import ImageModal from "@/publishing/components/image-modal.component.vue";
import type {CreatePostInterface} from "@/publishing/model/entities/create-post.interface";
import {EPostStatus} from "@/publishing/model/entities/post-status.enum";
import type {Item} from "@/publishing/model/entities/item.interface";
import publishingFacade from "@/publishing/model/publishing.facade";



const statusOptions = Object.keys(EPostStatus).filter((v) => isNaN(Number(v)));

const tittle = ref(publishingFacade.selectedPost.title);
const description = ref(publishingFacade.selectedPost.description);
const image: Ref<string | FormData |undefined>  = ref(publishingFacade.selectedPost.image);
const status = ref(publishingFacade.selectedPost.status);
const hashtags = ref(publishingFacade.selectedPost.hashtags);



const imageToShow = ref(publishingFacade.selectedPost.image);


const myUploader = (data: FormData, blobUrl: string) => {
  showImageModalForEditing.value =false;
  showImageModalForCreating.value = false;
  image.value = data;
  imageToShow.value = blobUrl;
}

const showImageModalForEditing = ref(false);
const showImageModalForCreating = ref(false);




defineExpose({
  tittle,
  description,
  image,
  status,
  hashtags
})
</script>
<script lang="ts">
export default {
  name: "PostInputInformation"
}
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
