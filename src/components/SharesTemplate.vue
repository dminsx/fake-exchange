<script setup>
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
  <table>
    <thead>
      <tr>
        <th>Stock</th>
        <th>Price</th>
        <slot name="headers" />
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-if="props.action === 'Buy'"
        v-for="share in props.sharesData"
        :key="share.stockTicker"
        class="share-card"
      >
        <td>{{ share.stockTicker }}</td>
        <td>{{ share.currentPrice.toFixed(2) }}$</td>
        <slot name="columns" :share="share" />

        <td>
          <button
            :class="props.action === 'Buy' ? 'buy-button' : 'sell-button'"
          >
            {{ action }}
          </button>
        </td>
      </tr>
      <tr
        v-if="props.action === 'Sell'"
        v-for="share in props.userData.shares"
        :key="share.stockTicker"
        class="share-card"
      >
        <td>{{ share.stockTicker }}</td>
        <td>{{ share.currentPrice.toFixed(2) }}$</td>
        <slot name="columns" :share="share" />

        <td>
          <button
            :class="props.action === 'Buy' ? 'buy-button' : 'sell-button'"
          >
            {{ action }}
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
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

td {
  font-variant-numeric: tabular-nums;
  padding: 5px 10px;
  border-top: 1px solid black;
}

.buy-button {
  background-color: #0a0eec;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;

  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  opacity: 0.8;
}

button:active {
  transform: translate(1px, 1px);
}

.sell-button {
  background-color: #ec0a0a;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;

  cursor: pointer;
  border-radius: 5px;
}
</style>
