<script setup>
import { computed } from "vue";

const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
});

const portfolioByPurchasePrice = computed(() => {
  return props.userData.shares.reduce((total, share) => {
    return total + share.amountShares;
  }, 0);
});

const portfolioValue = computed(() => {
  return props.userData.shares.reduce((total, share) => {
    return total + share.currentPrice * share.quantity;
  }, 0);
});

const totalPnL = computed(() => {
  return (portfolioValue.value - portfolioByPurchasePrice.value).toFixed(2);
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
      <p class="card-value">${{ portfolioValue?.toFixed(2) }}</p>
    </div>
    <div class="capital-card">
      <p class="card-title">Total Capital</p>
      <p class="card-value">
        ${{ (props.userData.balance + portfolioValue).toFixed(2) }}
      </p>
    </div>
    <div class="capital-card">
      <p class="card-title">Profit/Loss</p>
      <p class="card-value">${{ totalPnL }}</p>
    </div>
  </div>
</template>

<style scoped>
.capital-data {
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 16px;
  padding: 24px;
}

.capital-card {
  min-height: 120px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 20px;

  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);

  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
}

.card-title {
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
}

.card-value {
  margin-top: 18px;

  color: var(--text);
  font-size: 25px;
  font-weight: 600;
  letter-spacing: -0.5px;

  font-variant-numeric: tabular-nums;
}

@media (max-width: 900px) {
  .capital-data {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 500px) {
  .capital-data {
    grid-template-columns: 1fr;
    padding: 12px;
  }

  .capital-card {
    min-height: 100px;
  }
}
</style>
