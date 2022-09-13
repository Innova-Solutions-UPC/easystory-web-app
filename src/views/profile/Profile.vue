<template>
  <div class="card">
    <div class="card-container yellow-container">
      <div class="block font-bold text-center p-4 mb-3 top-color">
        <PersonalInformation />
      </div>
      <div class="block font-bold text-center p-4  mb-3 bottom-color">
        <About />
        <ContinueReading />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>


import PersonalInformation from "@/views/profile/components/PersonalInformation.vue";
import About from "@/views/profile/components/About.vue";
import ContinueReading from "@/views/profile/components/ContinueReading.vue";
</script>

<style scoped>
.card {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #e2e2e3;
}

.top-color {
  min-width: 100vw;
  background-color: #193f6c;
  border-top-right-radius: 0 !important;
  border-top-left-radius: 0 !important;
  border-bottom-right-radius: 100px;
  border-bottom-left-radius: 100px;
  max-height: fit-content;
  min-height: 30vh;
}

.bottom-color {
  background-color: #e2e2e3;
  min-height: 70vh;
  margin-top: -15px;
}


</style>
