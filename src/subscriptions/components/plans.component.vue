<template>
  <div class="surface-ground px-4 py-8 md:px-6 lg:px-8">
    <div class="text-900 font-bold text-6xl mb-4 text-center">Pricing Plans</div>
    <div class="text-700 text-xl mb-6 text-center line-height-3">Lorem ipsum dolor sit, amet consectetur adipisicing
      elit. Velit numquam eligendi quos.
    </div>
    <div class="grid">
      <single-plan v-for="plan in availablePlans" :key="plan.tittle" :detail="plan"/>
    </div>
  </div>
</template>


<script lang="ts" setup>
import type Plan from "@/subscriptions/models/entities/plan.interface";
import SinglePlan from "@/subscriptions/components/single-plan.component.vue";

const availablePlans: Array<Plan> = [{
  tittle: 'Monthly',
  description: 'Plan description',
  price: 0.0004,
  benefits: [{benefitDetail: 'Acceso a todas las funcionalidades'}, {benefitDetail: 'Compartir la publicacion por diversos medios'}]
},
  {
    tittle: 'Annually',
    description: 'Plan description',
    price: 0.00037,
    benefits: [{benefitDetail: 'Acceso a todas las funcionalidades'}, {benefitDetail: 'Compartir la publicacion por diversos medios'}, {benefitDetail: 'Congelamiento de cuenta'}, {benefitDetail: 'Sin pago extra pr cancelación'}]
  },
  {
    tittle: 'Enterprise',
    description: 'Plan description',
    price: 0.950,
    benefits: [{benefitDetail: 'Acceso a todas las funcionalidades'}, {benefitDetail: 'Compartir la publicacion por diversos medios'}, {benefitDetail: 'Congelamiento de cuenta'}, {benefitDetail: 'Sin pago extra pr cancelación'},
      {benefitDetail: 'Maximo de 20 cuentas'},
      {benefitDetail: 'Contenido Offline'}
    ]
  }
]
</script>

<script lang="ts">
export default {
  name: "plans"
}
</script>

<style scoped>

</style>
