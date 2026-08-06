<script setup>
import { getActualPrice } from "@/services/price.service";
import { reactive, onMounted, onUnmounted } from "vue";

const sharesData = reactive([
  {
    stockTicker: "AAPL",
    currentPrice: 300,
  },
  {
    stockTicker: "GOOG",
    currentPrice: 300,
  },
]);

const historyPrice = reactive({
  AAPL: [],
  GOOG: [],
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
  <div v-for="item in sharesData">
    {{ item.stockTicker }}: {{ item.currentPrice.toFixed(2) }}$
  </div>
</template>

<style scoped></style>
