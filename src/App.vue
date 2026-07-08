<script setup>
import { ref } from "vue";
const price = ref(500);

setInterval(() => {
  price.value +=
    Math.random() * (price.value * 1.5 + price.value) - price.value;
}, 2000);
</script>

<template>
  <div>Price: ${{ price }}</div>
</template>

<style scoped></style>
