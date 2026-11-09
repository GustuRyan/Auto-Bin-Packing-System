<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'

// Register only the Chart.js primitives required by this line chart.
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

const props = defineProps<{
  data: number[]
}>()

const chartData = computed(() => ({
  // Use the array position as a simple prediction-step label.
  labels: props.data.map((_, i) => i + 1),
  datasets: [
    {
      label: 'Cumulative Reward',
      data: props.data,
      fill: false,
    }
  ]
}))
</script>

<template>
  <Line :data="chartData" />
</template>
