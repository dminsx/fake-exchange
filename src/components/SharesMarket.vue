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

  historyPrice: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["buyShare"]);

function buyShare(amount, purchasedShareData) {
  emit("buyShare", amount, purchasedShareData);
}
</script>

<template>
  <div class="shares-market">
    <p class="market-title">Market</p>
    <SharesTemplate
      @buyShare="buyShare"
      :sharesData="sharesData"
      :userData="userData"
      action="Buy"
    >
      <template #headers>
        <th>Change</th>
      </template>
      <template #columns="{ share }">
        <td>
          {{
            (
              (share.currentPrice / props.historyPrice[share.stockTicker][0] -
                1) *
              100
            ).toFixed(1)
          }}%
        </td>
      </template>
    </SharesTemplate>
  </div>
</template>

<style scoped>
.shares-market {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-family: Inter, sans-serif;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
}
.market-title {
  font-family: Inter, sans-serif;
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 10px;
  margin-bottom: 10px;
}

table {
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
  border-bottom: 1px solid black;
  padding: 5px 10px;
}

:deep(tbody tr:hover) {
  background-color: #c4c4c4;
  cursor: pointer;
}

:deep(td:first-child) {
  border-left: 1px solid black;
  border-radius: 10px 0 0 10px;
}

:deep(td:last-child) {
  border-right: 1px solid black;
  border-radius: 0 10px 10px 0;
  text-align: center;
}
</style>
