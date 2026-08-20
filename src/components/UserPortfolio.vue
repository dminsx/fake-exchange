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

const emit = defineEmits(["sellShare"]);

function sellShare(soldShare, quantity) {
  emit("sellShare", soldShare, quantity);
}
</script>

<template>
  <div class="portfolio-container">
    <p class="portfolio-title">Your Portfolio</p>

    <SharesTemplate
      @sellShare="sellShare"
      :sharesData="sharesData"
      :userData="userData"
      action="Sell"
    >
      <template #headers>
        <th>Purchase Price</th>
        <th>Quantity</th>
        <th>Total Value</th>
        <th>Current Profit/Loss</th>
      </template>
      <template #columns="{ share }">
        <td>{{ (share.amountShares / share.quantity).toFixed(2) }}</td>
        <td>{{ share.quantity }} shares</td>
        <td>${{ (share.currentPrice * share.quantity).toFixed(2) }}</td>
        <td>
          ${{
            (
              share.currentPrice * share.quantity -
              (share.amountShares / share.quantity) * share.quantity
            ).toFixed(2)
          }}
        </td>
      </template>
    </SharesTemplate>
  </div>
</template>

<style scoped>
.portfolio-container {
  width: calc(100% - 48px);
  max-width: 1452px;

  margin: 0 auto 24px;
  padding: 20px;

  font-family: Inter, sans-serif;

  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}

.portfolio-title {
  margin-bottom: 18px;

  color: var(--text);
  font-size: 16px;
  font-weight: 600;
}

:deep(table) {
  width: 100%;

  border-collapse: separate;
  border-spacing: 0 6px;
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
  padding: 13px 10px;

  background: #151820;

  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;

  color: var(--text);

  font-size: 13px;
  font-variant-numeric: tabular-nums;
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
}

@media (max-width: 700px) {
  .portfolio-container {
    width: calc(100% - 24px);
    margin-bottom: 12px;
    padding: 14px;

    overflow-x: auto;
  }

  :deep(table) {
    min-width: 700px;
  }
}
</style>
