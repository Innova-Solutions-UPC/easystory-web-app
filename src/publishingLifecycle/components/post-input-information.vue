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

    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";

const tittle = ref('');
const description = ref('');
const image = ref('');

defineExpose({
  tittle,
  description,
  image
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
