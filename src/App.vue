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
  shares: [],
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

function buyShare(amount, purchasedShareData) {
  const existingShare = userData.shares.find((share) => {
    return share.stockTicker === purchasedShareData.stockTicker;
  });

  if (existingShare) {
    existingShare.quantity += purchasedShareData.quantity;
    existingShare.amountShares += purchasedShareData.amountShares;
  } else {
    userData.shares.push(purchasedShareData);
  }

  userData.balance -= amount;
}
</script>

<template>
  <UserDashboard :userData="userData" />
  <div class="shares-container">
    <SharesMarket
      @buyShare="buyShare"
      :historyPrice="historyPrice"
      :sharesData="sharesData"
      :userData="userData"
      action="Buy"
      class="shares-market"
    />
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 15px;
  padding: 15px;
}
</style>
