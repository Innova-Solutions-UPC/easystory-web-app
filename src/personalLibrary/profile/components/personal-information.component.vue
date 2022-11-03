<template>
  <Card
      class="z-5  flex align-items-center justify-content-center p-4  font-bold text-white border-round shadow-1 personal-information">
    <template #header>
      <img style="clip-path: circle(); max-width: 200px" alt="user header"
           src="https://media.istockphoto.com/photos/portrait-of-successful-black-male-modern-day-student-holding-picture-id1311634222?k=20&m=1311634222&s=612x612&w=0&h=1a0XDWnZNPjk_5n7maZdzowaDfBcBohwoiZZF69qS9A=">
    </template>
    <template #title>
      <h4 style="color: #fff">{{userName}}</h4>
    </template>
    <template #content>
      <div class="chips-container ">
        <Chip :label="email" icon="pi pi-google"/>
        <Chip label="Lima, Peru" icon="pi pi-map-marker"/>
        <Chip label="+51 998 554 525" icon="pi pi-phone"/>
      </div>

    </template>
  </Card>
</template>

<script lang="ts" setup>
import type {Controller} from "@/shared/models/Controller";
import {injectStrict} from "@/shared/utils/Injections";
import {computed} from "vue";
const app: Controller = injectStrict('appController');
const userName = computed(()=> app.user.m_profile?.authenticatedUser.username);
const email = computed(()=> app.user.m_profile?.authenticatedUser.email);
console.log(userName)
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
</style>
