<template>
  <div class="col-12 lg:col-4" style="color: #0E0B16">
    <div class="p-3 h-full">
      <div class="shadow-2 p-3 h-full flex flex-column surface-card" style="border-radius: 6px">
        <div class="text-900 font-medium text-xl mb-2">{{ props.detail.tittle }}</div>
        <div class="text-600">{{ props.detail.description }}</div>
        <hr class="my-3 mx-0 border-top-1 border-none surface-border"/>
        <div class="flex align-items-center">
          <span class="font-bold text-2xl text-900">Ξ: {{ props.detail.price }}</span>
          <span class="ml-2 font-medium text-600">per month</span>
        </div>
        <hr class="my-3 mx-0 border-top-1 border-none surface-border"/>
        <ul class="list-none p-0 m-0 flex-grow-1">
          <li class="flex align-items-center mb-3" v-for="benefit in props.detail.benefits"
              :key="benefit.benefitDetail">
            <i class="pi pi-check-circle text-green-500 mr-2"></i>
            <span>{{ benefit.benefitDetail }}</span>
          </li>
        </ul>
        <hr class="mb-3 mx-0 border-top-1 border-none surface-border mt-auto"/>
        <Button v-if="props.detail.tittle !== 'Enterprise'" label="Buy Now" class="p-3 w-full mt-auto" @click="buyPlan"></Button>
        <Button v-else disabled label="Coming soon " class="p-3 w-full mt-auto"></Button>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import type Plan from "@/subscriptions/models/entities/plan.interface";

const props = defineProps<{
  detail: Plan
}>();

const emits = defineEmits<{
  (e:'buyPlan', plan: Plan): void;
}>();

const buyPlan = () =>{
  emits('buyPlan', props.detail);
}


</script>


<script lang="ts">
export default {
  name: "single-plan"
}
</script>

<style scoped>

</style>
