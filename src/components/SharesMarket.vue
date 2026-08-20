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

function changePrice(share) {
  const change =
    (share.currentPrice / props.historyPrice[share.stockTicker][0] - 1) * 100;

  if (isNaN(change)) {
    return 0;
  } else {
    return change.toFixed(1);
  }
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
        <td>{{ changePrice(share) }}%</td>
      </template>
    </SharesTemplate>
  </div>
</template>

<style scoped>
.shares-market {
  display: flex;
  flex-direction: column;

  min-width: 0;
  padding: 20px;

  font-family: Inter, sans-serif;

  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.market-title {
  margin-bottom: 18px;

  color: var(--text);
  font-size: 16px;
  font-weight: 600;
}

table {
  width: 100%;

  border-collapse: separate;
  border-spacing: 0 6px;
  table-layout: fixed;
}

th {
  padding: 4px 10px 8px;

  color: var(--text-muted);
  font-size: 11px;
  font-weight: 500;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

:deep(td) {
  padding: 12px 10px;

  color: var(--text);
  font-size: 13px;

  background: #151820;

  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;

  font-variant-numeric: tabular-nums;

  transition:
    background 0.15s ease,
    border-color 0.15s ease;
}

:deep(.active-share td) {
  background: rgba(91, 124, 255, 0.12);
  border-top-color: rgba(91, 124, 255, 0.35);
  border-bottom-color: rgba(91, 124, 255, 0.35);
}

:deep(tbody tr:hover td) {
  background: var(--surface-hover);
  border-top-color: var(--border);
  border-bottom-color: var(--border);
}

:deep(td:first-child) {
  border-left: 1px solid transparent;
  border-radius: 8px 0 0 8px;

  font-weight: 600;
}

:deep(td:last-child) {
  border-right: 1px solid transparent;
  border-radius: 0 8px 8px 0;

  text-align: right;
}

:deep(td:nth-child(2)) {
  color: #cbd0da;
}

@media (max-width: 600px) {
  .shares-market {
    padding: 14px;
    overflow-x: auto;
  }

  table {
    min-width: 500px;
  }
}
</style>
