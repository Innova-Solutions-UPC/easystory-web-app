<template>
  <Suspense>
    <template #default>
      <div class="card">
        <div class="card-container yellow-container">
          <div class="block font-bold text-center p-4 mb-3 top-color">
            <PersonalInformation :user="profileFacade.selectedUser"/>
          </div>
          <div class="block font-bold text-center p-4  mb-3 bottom-color">
            <ContinueReading />
            <!--<About /> -->
          </div>
        </div>
      </div>
    </template>
    <template #fallback>loading</template>
  </Suspense>

</template>

<script lang="ts" setup>
import PersonalInformation from "@/personalLibrary/profile/components/personal-information.component.vue";
import About from "@/personalLibrary/profile/components/about.component.vue";
import ContinueReading from "@/personalLibrary/profile/components/continue-reading.component.vue";
import type {Controller} from "@/shared/models/Controller";
import {injectStrict} from "@/shared/utils/Injections";
import {computed, onMounted} from "vue";
import profileFacade from "@/personalLibrary/profile/models/profile.facade";
const app: Controller = injectStrict('appController');

const userInformation = computed(() => profileFacade.selectedUser);
onMounted(async () => {
  if (profileFacade.isForOwnUser) {
    await profileFacade.setUserByUsername((await app.user.getUserProfile()).username)
  }
  else {
    await profileFacade.setUserByUsername(profileFacade.username!);
  }
})
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
