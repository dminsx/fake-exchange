<script setup>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
);

const chartData = {
  labels: [
    "10 Авг",
    "11 Авг",
    "12 Авг",
    "13 Авг",
    "14 Авг",
    "15 Авг",
    "15 Авг",
  ],
  datasets: [
    {
      label: "AAPL",

      backgroundColor: "rgba(38, 166, 154, 0.2)",
      borderColor: "#26a69a",
      data: [103.5, 102.0, 108.3, 105.1, 111.0, 113.8, 650],
      tension: 0.2,
      fill: true,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>

<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  height: 350px;
  background-color: #131722;
  padding: 20px;
  border-radius: 8px;
}
</style>
