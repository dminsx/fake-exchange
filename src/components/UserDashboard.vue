<script setup>

</script>

<template>
    <div class="capital-data">
        <div class="capital-card">
            <p class="card-title">Balance</p>
            <p class="card-value">$87,500</p>
        </div>
        <div class="capital-card">
            <p class="card-title">Portfolio Value</p>
            <p class="card-value">$15,420</p></div>
        <div class="capital-card">
            <p class="card-title">Total Capital</p>
            <p class="card-value">$102,770</p></div>
        <div class="capital-card">
            <p class="card-title">Profit/Loss</p>
            <p class="card-value">+$2,770</p></div>
    </div>
</template>

<style scoped>
.capital-data {
    display: flex;
    justify-content: space-around;
    font-family: Inter, sans-serif;
 padding: 15px;
 gap: 15px;
}

.capital-card {
    flex: 0.75;
    border: 1px solid black;
    border-radius: 10px;
    padding: 15px;
}

.card-title {
    color: #888;
}

.card-value {
    font-size: 1.5rem;
    font-weight: bold;
}
</style>