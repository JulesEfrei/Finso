<script setup>
import { ref, watch, defineProps } from 'vue';
import Card from "primevue/card";

const { type, isLoading, transactions } = defineProps({
    type: String,
    isLoading: Boolean,
    transactions: Array
})

const number = ref(0);

const calculateNumber = async () => {
    number.value = transactions.reduce((sum, transaction) => sum + (transaction.type === type ? transaction.amount : 0), 0);
};

watch(() => transactions, (curr, prev) => calculateNumber())

</script>

<template>
    <Card class="col-span-1 md:col-span-3 row-span-1">
        <template #title>{{ type.charAt(0).toUpperCase() + type.slice(1) }}</template>
        <template #content>
            <i v-if="isLoading" class="pi pi-spin pi-spinner" style="font-size: 1rem"></i>
            <p v-else :class="'text-2xl ' + (type === 'income' ? 'text-green-500' : 'text-red-500')">{{ type ===
                'income' ? '+'
                : '-' }} {{ number }} € <small class="text-gray-400 text-sm">this
                    month</small></p>
        </template>
    </Card>
</template>