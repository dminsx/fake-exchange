<script setup>
import { ref, computed, reactive } from "vue";
import PurchaseDialogBox from "@/components/PurchaseDialogBox.vue";

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

const purchasedShare = ref("");

const quantityPurchasedShare = ref(0);

const getPricePurchasedShare = (purchasedShare) => {
  const foundShare = props.sharesData.find((shareData) => {
    return shareData.stockTicker === purchasedShare;
  });
  return foundShare ? foundShare.currentPrice : 0;
};

const purchaseAmount = computed(() => {
  const price = getPricePurchasedShare(purchasedShare.value);
  return price * quantityPurchasedShare.value;
});

function getPurchasedShare(stockTicker) {
  purchasedShare.value = stockTicker;
}

function cancelPurchasedShare() {
  purchasedShare.value = "";
  quantityPurchasedShare.value = 0;
}

const userPurchasedShare = ref({});

const emit = defineEmits(["buyShare", "sellShare"]);

function buyShare() {
  if (props.userData.balance < purchaseAmount.value) {
    return alert("Недостаточно средств!");
  }

  if (quantityPurchasedShare.value === 0) {
    return alert("Введите количество акций для покупки");
  }

  userPurchasedShare.value = {
    stockTicker: purchasedShare.value,
    currentPrice: getPricePurchasedShare(purchasedShare.value),
    purchasePrice: purchaseAmount.value / quantityPurchasedShare.value,
    quantity: quantityPurchasedShare.value,
    amountShares: purchaseAmount.value,
  };

  emit("buyShare", purchaseAmount.value, userPurchasedShare.value);

  purchasedShare.value = "";
  quantityPurchasedShare.value = 0;
  userPurchasedShare.value = {};
}

const soldShare = ref("");

const quantitySoldShare = ref(0);

function getSoldShare(stockTicker) {
  soldShare.value = stockTicker;
}

function sellShare() {
  emit("sellShare", soldShare.value, quantitySoldShare.value);
  soldShare.value = "";
  quantitySoldShare.value = 0;
}

function cancelSoldShare() {
  soldShare.value = "";
  quantitySoldShare.value = 0;
}
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
        :class="
          purchasedShare === share.stockTicker ? 'active-share' : 'share-card'
        "
      >
        <td>{{ share.stockTicker }}</td>
        <td>{{ share.currentPrice.toFixed(2) }}$</td>
        <slot name="columns" :share="share" />

        <td>
          <button
            :class="props.action === 'Buy' ? 'buy-button' : 'sell-button'"
            @click="getPurchasedShare(share.stockTicker)"
          >
            {{ props.action }}
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
          <div class="sell-container">
            <button
              :disabled="soldShare !== ''"
              @click="getSoldShare(share.stockTicker)"
              :class="props.action === 'Buy' ? 'buy-button' : 'sell-button'"
            >
              {{ action }}
            </button>

            <div v-if="soldShare === share.stockTicker" class="sell-interface">
              <input
                v-model.number="quantitySoldShare"
                class="input-quantity"
                type="number"
                min="0"
                placeholder="Кол-во"
              />
              <button @click="sellShare">v</button>
              <button @click="cancelSoldShare">x</button>
            </div>
          </div>
        </td>
        <td></td>
      </tr>
    </tbody>
  </table>
  <PurchaseDialogBox
    :getPricePurchasedShare="getPricePurchasedShare"
    :purchaseAmount="purchaseAmount"
    :quantityPurchasedShare="quantityPurchasedShare"
    :sharesData="sharesData"
    :purchasedShare="purchasedShare"
    @cancel="cancelPurchasedShare"
    @buyShare="buyShare"
    v-model.number="quantityPurchasedShare"
    class="dialog-box"
  />
</template>

<style scoped>
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

td {
  padding: 12px 10px;

  color: var(--text);
  font-size: 13px;

  background: #151820;

  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;

  font-variant-numeric: tabular-nums;
}

tbody tr {
  transition: transform 0.15s ease;
}

tbody tr:hover td {
  background: var(--surface-hover);
  border-top-color: var(--border);
  border-bottom-color: var(--border);
}

td:first-child {
  border-left: 1px solid transparent;
  border-radius: 8px 0 0 8px;

  font-weight: 600;
}

td:last-child {
  border-right: 1px solid transparent;
  border-radius: 0 8px 8px 0;
}

.active-share td {
  background: rgba(91, 124, 255, 0.12);
  border-top-color: rgba(91, 124, 255, 0.35);
  border-bottom-color: rgba(91, 124, 255, 0.35);
}

button {
  border: none;
  cursor: pointer;

  transition:
    background 0.15s ease,
    transform 0.1s ease,
    opacity 0.15s ease;
}

button:active {
  transform: scale(0.97);
}

.buy-button,
.sell-button {
  min-width: 72px;
  padding: 8px 14px;

  border-radius: 7px;

  color: white;
  font-size: 12px;
  font-weight: 600;
}

.buy-button {
  background: var(--blue);
}

.buy-button:hover {
  background: var(--blue-hover);
}

.sell-button {
  background: var(--red);
}

.sell-button:hover {
  background: #ff6d7b;
}

button:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.sell-container {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  width: 170px;
  height: 38px;
}

.sell-container > .sell-button {
  position: absolute;
  right: 0;

  width: 72px;
}

.sell-interface {
  position: absolute;
  right: 80px;

  display: flex;
  align-items: center;
  gap: 5px;

  animation: slideIn 0.15s ease;
}

.input-quantity {
  width: 65px;
  height: 34px;

  padding: 0 8px;

  color: var(--text);
  background: #0c0f15;

  border: 1px solid var(--border-light);
  border-radius: 6px;

  outline: none;
}

.input-quantity:focus {
  border-color: var(--blue);
}

.sell-interface button {
  width: 32px;
  height: 34px;

  padding: 0;

  border-radius: 6px;

  color: var(--text);
  background: #20242d;
}

.sell-interface button:hover {
  background: #2a303b;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(5px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.dialog-box {
  position: fixed;

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  z-index: 1000;

  width: min(420px, calc(100vw - 32px));

  padding: 24px;

  color: var(--text);

  background: #151820;

  border: 1px solid var(--border-light);
  border-radius: 16px;

  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 0 100vmax rgba(0, 0, 0, 0.55);
}

@media (max-width: 600px) {
  table {
    min-width: 560px;
  }
}
</style>
