<script setup>
const props = defineProps({
  getPricePurchasedShare: {},
  quantityPurchasedShare: {
    type: Number,
    required: true,
  },
  purchasedShare: {
    type: String,
    required: true,
  },
  sharesData: {
    type: Object,
    required: true,
  },
  purchaseAmount: {
    type: Number,
    required: true,
  },
  modelValue: {
    type: Number,
  },
});

const emit = defineEmits(["cancel", "update:modelValue", "buyShare"]);

function cancelPurchasedShare() {
  emit("cancel");
}

function buyShare() {
  emit("buyShare");
}
</script>
<template>
  <div v-if="props.purchasedShare !== ''" class="dialog-box">
    <div class="share-info">
      <h2>Покупка {{ props.purchasedShare }}</h2>
      <p>
        Стоимость одной акции ${{
          props.getPricePurchasedShare(props.purchasedShare).toFixed(2)
        }}
      </p>
    </div>
    <div class="purchase-interface">
      <p>Введите количество акций:</p>
      <input
        type="number"
        min="0"
        placeholder="Количество"
        :value="props.modelValue"
        @input="emit('update:modelValue', $event.target.value)"
      />
      <p>Стоимость покупки:</p>
      <p>
        {{ props.purchaseAmount.toFixed(2) }}
      </p>
      <div class="button-box">
        <button @click="buyShare">Buy</button>
        <button @click="cancelPurchasedShare">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dialog-box {
  position: fixed;

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  z-index: 1000;

  width: min(440px, calc(100vw - 32px));

  display: flex;
  flex-direction: column;
  gap: 24px;

  padding: 24px;

  color: var(--text);

  background: #151820;

  border: 1px solid var(--border-light);
  border-radius: 16px;

  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.55),
    0 0 0 100vmax rgba(0, 0, 0, 0.6);

  animation: modalIn 0.18s ease;
}

.share-info {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.share-info h2 {
  color: var(--text);

  font-size: 20px;
  font-weight: 600;
}

.share-info p {
  color: var(--text-secondary);
  font-size: 13px;
}

.purchase-interface {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.purchase-interface > p {
  color: var(--text-secondary);
  font-size: 13px;
}

.purchase-interface > p:nth-of-type(2) {
  margin-top: 8px;
}

.purchase-interface > p:last-of-type {
  color: var(--text);
  font-size: 22px;
  font-weight: 600;
}

input {
  width: 100%;
  height: 42px;

  padding: 0 12px;

  color: var(--text);
  background: #0c0f15;

  border: 1px solid var(--border-light);
  border-radius: 8px;

  outline: none;

  font-variant-numeric: tabular-nums;
}

input:focus {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px rgba(91, 124, 255, 0.12);
}

.button-box {
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 10px;

  margin-top: 8px;
}

.button-box button {
  height: 40px;

  border-radius: 8px;

  color: white;
  background: var(--blue);

  font-size: 13px;
  font-weight: 600;

  cursor: pointer;

  transition: background 0.15s ease;
}

.button-box button:first-child:hover {
  background: var(--blue-hover);
}

.button-box button:last-child {
  color: var(--text-secondary);
  background: #20242d;
}

.button-box button:last-child:hover {
  background: #292e38;
  color: var(--text);
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: translate(-50%, calc(-50% + 8px));
  }

  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
</style>
