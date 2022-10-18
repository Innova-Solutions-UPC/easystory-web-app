<template>
  <div class="AppTopbar">
    <div class="container">
      <div class="logo">
        <router-link class="topbar-logo" to="/">
          <icon-community class="color-blue" />
          <span class="color-white font-bold mr-3">EasyStory</span>
        </router-link>
        <button class="topbar-btn blue-btn square-btn" @click="onMenuToggle">
          <i class="pi pi-bars"></i>
        </button>

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
          <li>
            <button class="square-btn blue-btn mr-2">
              <i class="pi pi-calendar"></i>
              <span>Events</span>
            </button>
          </li>
          <li>
            <button class="square-btn blue-btn mr-2">
              <i class="pi pi-cog"></i>
              <span>Settings</span>
            </button>
          </li>
          <li>
            <button class="square-btn blue-btn mr-2">
              <i class="pi pi-user"></i>
              <span>Profile</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconCommunity from "../icons/IconCommunity.vue";
const onMenuToggle = () => {
  console.log("onMenuToggle");
};
</script>
