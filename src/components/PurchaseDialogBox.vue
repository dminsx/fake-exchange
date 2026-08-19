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
input {
  width: 100px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid black;
  padding: 5px;
}

.purchase-interface {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.dialog-box {
  display: flex;
  gap: 20px;
}
.button-box {
  display: flex;
  gap: 10px;
}
</style>
