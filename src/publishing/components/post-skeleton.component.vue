<template>
  <div class="grid formgrid">
    <div class="field col-12 md:col-6 md:pr-6 pr-0">
      <h5>Card</h5>
      <div class="custom-skeleton p-4">
        <div class="flex mb-3">
          <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
          <div>
            <Skeleton width="10rem" class="mb-2"></Skeleton>
            <Skeleton width="5rem" class="mb-2"></Skeleton>
            <Skeleton height=".5rem"></Skeleton>
          </div>
        </div>
        <Skeleton width="100%" height="150px"></Skeleton>
        <div class="flex justify-content-center mt-3">
          <Skeleton width="4rem" height="2rem"></Skeleton>
          <Skeleton width="4rem" height="2rem"></Skeleton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>
<script lang="ts">
export default {
  name: "PostSkeleton"
}
</script>

<style scoped>

</style>
