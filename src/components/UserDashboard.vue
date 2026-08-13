<script setup>
import { computed } from "vue";

const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
});

const getPortfolioByPurchasePrice = computed(() => {
  return props.userData.shares.reduce((total, share) => {
    return total + share.purchasePrice * share.quantity;
  }, 0);
});

const getPortfolioValue = computed(() => {
  return props.userData.shares.reduce((total, share) => {
    return total + share.currentPrice * share.quantity;
  }, 0);
});

const getTotalPnL = computed(() => {
  return (getPortfolioValue.value - getPortfolioByPurchasePrice.value).toFixed(
    2,
  );
});
</script>

<template>
  <div class="capital-data">
    <div class="capital-card">
      <p class="card-title">Balance</p>
      <p class="card-value">${{ props.userData.balance.toFixed(2) }}</p>
    </div>
    <div class="capital-card">
      <p class="card-title">Portfolio Value</p>
      <p class="card-value">${{ getPortfolioValue?.toFixed(2) }}</p>
    </div>
    <div class="capital-card">
      <p class="card-title">Total Capital</p>
      <p class="card-value">
        ${{ (props.userData.balance + getPortfolioValue).toFixed(2) }}
      </p>
    </div>
    <div class="capital-card">
      <p class="card-title">Profit/Loss</p>
      <p class="card-value">${{ getTotalPnL }}</p>
    </div>
  </div>
</template>

<style scoped>
.capital-data {
  display: flex;
  justify-content: space-around;
  font-family: Inter, sans-serif;
  padding: 15px;
  gap: 15px;
}

.capital-card {
  flex: 0.75;
  border: 1px solid black;
  border-radius: 10px;
  padding: 15px;
}

.card-title {
  color: #888;
}

.card-value {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
