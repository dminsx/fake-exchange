<script setup>
import { getActualPrice } from "@/services/price.service";
import { reactive, onMounted, onUnmounted } from "vue";
import UserDashboard from "@/components/UserDashboard.vue";
import SharesMarket from "@/components/SharesMarket.vue";
import SharesChart from "@/components/SharesChart.vue";
import UserPortfolio from "@/components/UserPortfolio.vue";

const sharesData = reactive([
  {
    stockTicker: "AAPL",
    currentPrice: 300,
  },
  {
    stockTicker: "GOOG",
    currentPrice: 300,
  },
  {
    stockTicker: "TSLA",
    currentPrice: 300,
  },
]);

const historyPrice = reactive({
  AAPL: [],
  GOOG: [],
  TSLA: [],
});

const userData = reactive({
  balance: 75000.0,
  shares: [
    {
      stockTicker: "AAPL",
      currentPrice: 300,
      purchasePrice: 250,
      quantity: 10,
    },
    {
      stockTicker: "GOOG",
      currentPrice: 300,
      purchasePrice: 250,
      quantity: 10,
    },
  ],
});

let timerId = null;

onMounted(() => {
  timerId = setInterval(() => {
    const newPrices = getActualPrice(sharesData);

    sharesData.forEach((share) => {
      historyPrice[share.stockTicker].push(share.currentPrice);

      share.currentPrice = newPrices[share.stockTicker];
    });

    userData.shares.forEach((share) => {
      share.currentPrice = newPrices[share.stockTicker];
    });
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timerId);
});
</script>

<template>
  <UserDashboard :userData="userData" />
  <div class="shares-container">
    <SharesMarket :sharesData="sharesData" :userData="userData" action="Buy" />
    <SharesChart />
  </div>
  <UserPortfolio :sharesData="sharesData" :userData="userData" action="Sell" />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Inter, sans-serif;
}

.shares-container {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  padding: 15px;
}
</style>
