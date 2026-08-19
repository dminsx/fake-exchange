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
              <button @click="sellShare">V</button>
              <button @click="cancelSoldShare">X</button>
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

.sell-container {
  display: flex;
  gap: 10px;
}

.sell-interface {
  display: flex;
  gap: 5px;
}

.input-quantity {
  width: 60px;
  height: 38px;
}

.active-share {
  background-color: #8a8a8a;
}

button {
  padding: 8px 16px;
  cursor: pointer;
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

button:disabled {
  opacity: 0.5;
  cursor: default;
}

button:not(:disabled):hover {
  opacity: 0.8;
}

button:not(:disabled):active {
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

.dialog-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #8a8a8a;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>
