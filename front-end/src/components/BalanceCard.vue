<script setup>
import { ref, watch, defineProps } from 'vue';
import Card from "primevue/card";

const balance = ref(0);
const { isLoading, transactions } = defineProps({
    isLoading: Boolean,
    transactions: Array
})

const calculateBalance = async () => {
    balance.value = transactions.reduce((prev, curr) => curr.type === 'income' ? (prev + curr.amount) : (prev - curr.amount), 0)
};

watch(() => transactions, (curr, prev) => calculateBalance())
</script>

<template>
    <Card class="col-span-1 md:col-span-3">
        <template #title>Balance</template>
        <template #content>
            <i v-if="isLoading" class="pi pi-spin pi-spinner" style="font-size: 1rem"></i>
            <p v-else :class="'text-2xl ' + (balance >= 0 ? 'text-green-500' : 'text-red-500')">{{ balance >= 0 ? '+' :
                '' }}
                {{ balance }} € <small class="text-gray-400 text-sm">this
                    month</small></p>
        </template>
    </Card>
</template>