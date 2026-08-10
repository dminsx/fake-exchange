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

let timerId = null;

onMounted(() => {
  timerId = setInterval(() => {
    const newPrices = getActualPrice(sharesData);

    sharesData.forEach((item) => {
      historyPrice[item.stockTicker].push(item.currentPrice);

      item.currentPrice = newPrices[item.stockTicker];
    });
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timerId);
});

//
// TODO:
// После инициализации приложения запустить механизм "биржевых тиков".
// Через фиксированный интервал (например, раз в 1-2 секунды)
// вызывать getActualPrice() из price.service.js.
//
// TODO:
// После получения новых цен:
// - обновить текущую цену каждой акции;
// - добавить новую запись в историю;
// - ограничить размер истории (например, хранить только последние 100 изменений).
//
// TODO:
// При размонтировании компонента остановить механизм тиков
// (очистить setInterval).
</script>

<template>
  <UserDashboard/>
  <div class="shares-container">
    <SharesMarket :sharesData="sharesData" />
<SharesChart/>
  </div>
  <UserPortfolio :sharesData="sharesData" />
  <!-- <div v-for="item in sharesData">
    {{ item.stockTicker }}: {{ item.currentPrice.toFixed(2) }}$
  </div> -->
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