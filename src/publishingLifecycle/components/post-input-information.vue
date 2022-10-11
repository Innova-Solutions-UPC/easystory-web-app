<template>
  <div class="card">
    <div class="gallery" >
      <div >
        <span class="p-float-label">
            <InputText id="Tittle" type="text" v-model="tittle"/>
            <label for="username">Tittle</label>
        </span>
      </div>
      <div >
        <span class="p-float-label">
            <InputText id="Description" type="text" v-model="description"/>
            <label for="username">Description</label>
        </span>
      </div>
      <div>
        <span class="p-float-label">
            <InputText id="Image URL" type="text" v-model="image"/>
            <label for="username">Image URL</label>
        </span>
      </div>
      <div>
        <span class="p-float-label">
        <label for="username">Status</label>
        <Dropdown v-model="status" :options="statusOptions"  placeholder="Select status" />
        </span>
      </div>
      <div>
        <span class="p-float-label">
        <label for="username">Hashtags</label>
        <Chips style="max-width:250px; max-height: 50px" v-model="hashtags" />
        </span>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {EPostStatus, ICreatePost} from "@/publishingLifecycle/model/IPublishing";


const props = defineProps<{
  inputInformation: ICreatePost;
}>()

const statusOptions = Object.keys(EPostStatus).filter((v) => isNaN(Number(v)));

const tittle = ref(props.inputInformation.title);
const description = ref(props.inputInformation.description);
const image = ref(props.inputInformation.image);
const status = ref(props.inputInformation.status);
const hashtags = ref(props.inputInformation.hashtags)

defineExpose({
  tittle,
  description,
  image,
  status,
  hashtags
})

</script>

<style scoped>
.gallery{
  display: grid;
  gap: 1rem;
  grid-auto-rows: 5rem;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 25rem), 1fr));
  box-shadow: 0 5px 10px 0 rgba(72, 83, 83, 0.7);
  border-radius: 20px;
  align-items: center;
}
</style>
