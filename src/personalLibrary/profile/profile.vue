<template>
  <div class="card">
    <div class="card-container yellow-container">
      <div class="block font-bold text-center p-4 mb-3 top-color">
        <PersonalInformation />
      </div>
      <div class="block font-bold text-center p-4  mb-3 bottom-color">
        <ContinueReading />
        <About />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PersonalInformation from "@/personalLibrary/profile/components/personal-information.component.vue";
import About from "@/personalLibrary/profile/components/about.component.vue";
import ContinueReading from "@/personalLibrary/profile/components/continue-reading.component.vue";
</script>

<style scoped>
.card {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #191a23;
}

.top-color {
  min-width: 100vw;
  background-color: #343647;
  border-top-right-radius: 0 !important;
  border-top-left-radius: 0 !important;
  border-bottom-right-radius: 100px;
  border-bottom-left-radius: 100px;
  max-height: fit-content;
  min-height: 30vh;
}

.bottom-color {
  background-color: #191a23;
  min-height: 70vh;
  margin-top: -15px;
}


</style>
