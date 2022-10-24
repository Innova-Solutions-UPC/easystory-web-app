<template>
    <div class="flex align-items-center flex-column pt-6 px-3">
      <i class="pi pi-check-circle" :style="{fontSize: '5rem', color: 'var(--green-500)' }"></i>
      <h5>Registration Successful!</h5>
    </div>

</template>

<script lang="ts" setup>
import {defineProps, toRef} from "vue";

</script>
<script lang="ts">
export default {
  name: "AccountCreated"
}
</script>

<style scoped>

</style>
