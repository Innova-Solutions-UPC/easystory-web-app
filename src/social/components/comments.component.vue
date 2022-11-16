<template>
  <div class="">
    <div class="surface-card shadow-2 p-3 border-round">
      <div class="flex justify-content-between mb-3">
        <div>
          <span class="block text-500 font-medium mb-3">Comments</span>
          <div class="text-900 font-light text-0">{{props.comment.content}}</div>
        </div>
        <div class="flex align-items-center justify-content-center bg-purple-100 border-round" style="width:2.5rem;height:2.5rem">
          <i class="pi pi-comment text-purple-500 text-xl"></i>
        </div>
      </div>
      <span class="text-green-500 font-medium">@ </span>
      <span class="text-500">{{ props.comment.user.username }}</span>
    </div>
  </div>
</template>


<script lang="ts" setup>
const props = defineProps<{
  comment: any
}>();
</script>

<script lang="ts">
export default {
  name: "comments"
}
</script>

<style scoped>

</style>
