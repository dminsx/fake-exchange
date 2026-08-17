<script setup>
import SharesTemplate from "@/components/SharesTemplate.vue";

const props = defineProps({
  sharesData: {
    type: Array,
    required: true,
  },
  userData: {
    type: Object,
    required: true,
  },

  action: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="portfolio-container">
    <p class="portfolio-title">Your Portfolio</p>

    <SharesTemplate :sharesData="sharesData" :userData="userData" action="Sell">
      <template #headers>
        <th>Purchase Price</th>
        <th>Quantity</th>
        <th>Total Value</th>
        <th>Current Profit/Loss</th>
      </template>
      <template #columns="{ share }">
        <td>{{ share.purchasePrice }}</td>
        <td>{{ share.quantity }} shares</td>
        <td>${{ (share.currentPrice * share.quantity).toFixed(2) }}</td>
        <td>
          ${{
            (
              share.currentPrice * share.quantity -
              share.purchasePrice * share.quantity
            ).toFixed(2)
          }}
        </td>
      </template>
    </SharesTemplate>
  </div>
</template>

<style scoped>
.portfolio-container {
  font-family: Inter, sans-serif;
  font-weight: normal;
  font-size: 1.2rem;
  border: 1px solid black;
  border-radius: 10px;
  margin: 15px;
  padding: 10px;
}

.portfolio-title {
  font-family: Inter, sans-serif;
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 10px;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 3px;
  table-layout: fixed;
}

th {
  text-align: left;
  font-weight: normal;
  font-size: 0.9rem;
  color: #888;
  line-height: 0.5;
  padding: 5px 10px;
}

:deep(td) {
  border-top: 1px solid black;
  padding: 10px;
}
</style>
