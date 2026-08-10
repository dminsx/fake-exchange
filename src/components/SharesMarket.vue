<script setup>
import SharesTemplate from "@/components/SharesTemplate.vue";

defineProps({
  sharesData: {
    type: Array,
    required: true,
  },
  action: {
        type: String,
        required: true
    }
});


</script>

<template>
    <div class="shares-market">
        <p class="market-title">Market</p>
        <SharesTemplate :sharesData="sharesData" action="Buy" />
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


</style>