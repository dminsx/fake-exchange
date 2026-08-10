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
<div class="portfolio-container">
   <p class="portfolio-title">
       Your Portfolio
   </p>

    <SharesTemplate :sharesData="sharesData" action="Sell"/>
    
</div>
</template>

<style scooped>
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
</style>