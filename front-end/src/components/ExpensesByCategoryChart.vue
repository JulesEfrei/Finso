<script setup>
import { ref, watch, defineProps } from 'vue';
import Chart from 'primevue/chart';
import Card from "primevue/card";

const chartData = ref({});
const { isLoading, transactions } = defineProps({
    isLoading: Boolean,
    transactions: Array
})

const generateChartData = async () => {
    const categories = {};
    transactions.forEach(transaction => {
        const category = transaction.category || 'N/A';
        if (!categories[category]) {
            categories[category] = 0;
        }
        categories[category] += transaction.amount;
    });

    chartData.value = {
        labels: Object.keys(categories),
        datasets: [
            {
                data: Object.values(categories),
                backgroundColor: ['#5F5D9C', '#6196A6', '#A4CE95', '#F4EDCC', '#7695FF', , '#9DBDFF', , '#FFD7C4', '#FF9874', '#A594F9', '#91DDCF']
            }
        ]
    };
};

watch(() => transactions, (curr, prev) => generateChartData())
</script>

<template>
    <Card class="md:col-span-5 md:row-span-3">
        <template #title>
            Expenses by Category <small class="text-gray-400 text-sm">this
                month</small>
        </template>
        <template #content>
            <div class="flex justify-center">
                <i v-if="isLoading" class="pi pi-spin pi-spinner" style="font-size: 1rem"></i>
                <Chart v-else type="doughnut" :data="chartData" class="h-[260px]" />
            </div>
        </template>
    </Card>
</template>