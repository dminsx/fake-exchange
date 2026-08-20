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

function sellShare(soldShare, quantity) {
  const shareIndex = userData.shares.findIndex((share) => {
    return share.stockTicker === soldShare;
  });

  const existingShare = userData.shares[shareIndex];

  if (existingShare.quantity < quantity) {
    alert("Ты столько не купил еще!");
    return;
  } else if (quantity === 0) {
    alert("Введи количество акций для продажи");
    return;
  } else {
    userData.balance += quantity * existingShare.currentPrice;
    existingShare.amountShares -= quantity * existingShare.purchasePrice;
    existingShare.quantity -= quantity;
  }

  if (existingShare.quantity === 0) {
    userData.shares.splice(shareIndex, 1);
  }
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
  <UserPortfolio
    @sellShare="sellShare"
    :sharesData="sharesData"
    :userData="userData"
    action="Sell"
  />
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
  max-width: 1500px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: minmax(380px, 0.9fr) minmax(500px, 1.6fr);

  gap: 16px;
  padding: 0 24px 16px;
}

.shares-market,
.shares-chart,
.portfolio-container,
.capital-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

@media (max-width: 1000px) {
  .shares-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .shares-container {
    padding: 0 12px 12px;
  }
}
</style>
