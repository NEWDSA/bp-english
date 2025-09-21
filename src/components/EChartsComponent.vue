<template>
  <component
    :is="chartComponent"
    :is-detailed="isDetailed"
    :selected-city="selectedCity"
    @chart-click="$emit('chart-click', $event)"
  />
</template>

<script setup>
import { computed } from 'vue'
import BarChart from './charts/BarChart.vue'
import PieChart from './charts/PieChart.vue'
import AreaChart from './charts/AreaChart.vue'
import ScatterChart from './charts/ScatterChart.vue'
import RadarChart from './charts/RadarChart.vue'
import LineChart from './charts/LineChart.vue'
import GradientBarChart from './charts/GradientBarChart.vue'

const props = defineProps({
  chartType: {
    type: String,
    default: 'line'
  },
  isDetailed: {
    type: Boolean,
    default: false
  },
  selectedCity: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['chart-click'])

const chartComponent = computed(() => {
  const componentMap = {
    bar: BarChart,
    pie: PieChart,
    area: AreaChart,
    scatter: ScatterChart,
    radar: RadarChart,
    line: LineChart,
    gradientBar: GradientBarChart
  }
  return componentMap[props.chartType] || LineChart
})
</script>

