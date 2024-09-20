<script setup>
import { ref, watch, defineProps } from 'vue';
import Chart from 'primevue/chart';
import Card from 'primevue/card';

const chartData = ref({});
const { isLoading, transactions } = defineProps({
  isLoading: Boolean,
  transactions: Array
})

const generateGraphData = async () => {
  const monthlyIncome = transactions.reduce((prev, curr) => {
    const newMonth = {};
    newMonth[curr.month] = Math.round(curr.averageIncome * 100) / 100
    return { ...prev, ...newMonth }
  }, {});
  const monthlyOutcome = transactions.reduce((prev, curr) => {
    const newMonth = {};
    newMonth[curr.month] = Math.round(curr.averageOutcome * 100) / 100
    return { ...prev, ...newMonth }
  }, {});

  // Fill chartData here...
  chartData.value = {
    labels: Object.keys(monthlyIncome),
    datasets: [
      {
        label: 'Income',
        data: Object.values(monthlyIncome),
        borderColor: 'rgb(34, 197, 94)',
        fill: false
      },
      {
        label: 'Expenses',
        data: Object.values(monthlyOutcome),
        borderColor: 'rgb(239, 68, 68)',
        fill: false
      }
    ]
  };

};

watch(() => transactions, (curr, prev) => generateGraphData())
</script>

<template>
  <Card class="md:col-span-6 md:row-span-4">
    <template #title>
      Monthly Stats (Income vs Expenses)
    </template>
    <template #content>
      <i v-if="isLoading" class="pi pi-spin pi-spinner" style="font-size: 1rem"></i>
      <Chart v-else type="line" :data="chartData" class="min-h-[120px]" />
    </template>
  </Card>
</template>