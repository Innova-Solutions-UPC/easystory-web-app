<template>
 <div :id="divId" style="height:100%; width:100%;"></div>
</template>

<script lang="ts" setup>
import Spline, { type ICardTimeSeries } from '@/shared/models/Spineline.facade';
import { watch, onMounted } from 'vue';

const props = defineProps<{
  cardTimeSeries: ICardTimeSeries;
}>();

const divId: string = '_' + Math.random().toString(36).substring(2, 9);
const m_timeSeries: Spline = new Spline (divId);


watch(
    () => props.cardTimeSeries.series,
    () => {
      m_timeSeries.m_series = props.cardTimeSeries.series
    },
    { immediate: true, deep: true },
);
onMounted(()=> {
  m_timeSeries.createChart();
});

defineExpose({
  m_timeSeries
})
</script>
<script lang="ts">
export default {
  name: "SpilineGraph"
}
</script>