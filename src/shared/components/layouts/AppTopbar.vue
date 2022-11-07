<template>
  <div class="AppTopbar">
    <div class="container">
      <div class="logo">
        <router-link class="topbar-logo" to="/">
          <icon-community class="color-blue" />
          <span class="color-white font-bold mr-3">EasyStory</span>
        </router-link>
        

        <button
          class="btn-mobile circular-btn"
          v-styleclass="{
            selector: '@next',
            enterClass: 'hidden',
            enterActiveClass: 'scalein',
            leaveToClass: 'hidden',
            leaveActiveClass: 'fadeout',
            hideOnOutsideClick: true,
          }"
        >
          <i class="pi pi-ellipsis-v"></i>
        </button>
      </div>
      <div class="nav-buttons">
        <ul>
          <li v-for="route in visibleRroutes" :key="route.name" >
            <router-link :to="route.path">
            <button class="square-btn blue-btn mr-2">
              <i :class="route.meta.icon"></i>
              <span style="margin-left: 5px;">{{route.name}}</span>
            </button>
          </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconCommunity from "../icons/IconCommunity.vue";
import { useRouter } from 'vue-router';

const visibleRroutes = useRouter().getRoutes().filter(e => e.meta.visible);
console.log({visibleRroutes})
</script>
<style scoped>
.AppTopbar{
  z-index: 9999999999999;
}
</style>
