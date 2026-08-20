<script setup>
import LineChart from "@/components/LineChart.vue";
</script>

<template>
  <div class="shares-chart">
    <p class="chart-title">Shares Chart</p>
    <LineChart />
  </div>
</template>

<style scoped>
.shares-chart {
  position: relative;

  min-width: 0;
  min-height: 420px;

  padding: 20px;

  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);

  overflow: hidden;
}

.chart-title {
  position: relative;
  z-index: 2;

  margin-bottom: 18px;

  color: var(--text);
  font-size: 16px;
  font-weight: 600;
}

.chart-image {
  display: block;

  width: 100%;
  height: 350px;

  object-fit: cover;

  border-radius: 10px;

  opacity: 0.65;

  filter: brightness(0.7) contrast(1.1) saturate(0.7);

  transition: opacity 0.2s ease;
}

.chart-image:hover {
  opacity: 0.8;
}

@media (max-width: 1000px) {
  .shares-chart {
    min-height: 350px;
  }

  .chart-image {
    height: 280px;
  }
}

@media (max-width: 600px) {
  .shares-chart {
    min-height: 280px;
    padding: 14px;
  }

  .chart-image {
    height: 220px;
  }
}
</style>
