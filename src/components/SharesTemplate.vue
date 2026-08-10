<script setup>
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
   
    <table>
        <thead>
            <tr>
                <th>Stock</th>
                <th>Price</th>
                <th>Change</th>
                <slot name="headers" />
                <th ></th>

                
            </tr>
        </thead>

        <tbody>
            <tr v-for="share in sharesData" :key="share.stockTicker" class="share-card">
                <td>{{ share.stockTicker }}</td>
                <td>{{ share.currentPrice.toFixed(2) }}$</td>
                <slot name="columns" :share="share" />
                <td>+1%</td>
                
                <td>
                    <button :class=" action === 'Buy' ? 'buy-button' : 'sell-button'">{{ action }}</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
        
<style scoped>
table {

    width: 100%;
    border-collapse: separate;
    border-spacing: 0 8px;
}

th {
    text-align: left;
    font-weight: normal;
    font-size: 0.9rem;
    color: #888;
    line-height: 0.5;

}

tbody tr:hover {
    background-color: #f5f5f5;
    cursor: pointer;
}

td {
    font-variant-numeric: tabular-nums;
    padding: 12px;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
}

td:first-child {
    border-left: 1px solid black;
    border-radius: 10px 0 0 10px;
}

td:last-child {
    border-right: 1px solid black;
    border-radius: 0 10px 10px 0;
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