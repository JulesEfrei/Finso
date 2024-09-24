<script setup>
import { ref, onMounted } from 'vue';
import TransactionsTypeCard from '@/components/TransactionsTypeCard.vue';
import BalanceCard from '@/components/BalanceCard.vue';
import TransactionsCard from '@/components/TransactionsCard.vue';
import ExpensesByCategoryChart from '@/components/ExpensesByCategoryChart.vue';
import MonthlyStatsChart from '@/components/MonthlyStatsChart.vue';
import ComingSoonCard from '@/components/ComingSoonCard.vue';
import { useAuthStore } from '@/stores/auth.store';
import { fetchWrapper } from '@/utils/fetchWrapper';
import { monthlyDate } from '@/utils/date';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import RefreshCard from '../components/RefreshCard.vue';

const isLoading = ref({
    monthlyTransactions: true,
    latest: true,
    monthlyStats: true,
});
const transactions = ref({
    monthlyTransactions: [],
    latest: [],
    monthlyStats: [],
});
const [startMonthDate, endMonthDate] = monthlyDate();

async function fetchTransactions(url, key) {
    try {
        const res = await fetchWrapper.get(url);

        if (res) {
            isLoading.value[key] = false;
            transactions.value[key] = res.data.transactions;
        }
    } catch (e) {
        isLoading.value.key = false;
        toast.add({ severity: 'error', summary: e.message, details: 'Please try again.', life: 3000 });
    }
}

async function fetchAll() {
    isLoading.value = {
        monthlyTransactions: true,
        latest: true,
        monthlyStats: true,
    }

    await fetchTransactions(`${import.meta.env.VITE_BASE_URL}/users/${useAuthStore().user.id}/transactions?startDate=${startMonthDate}&endDate=${endMonthDate}`, 'monthlyTransactions');
    await fetchTransactions(`${import.meta.env.VITE_BASE_URL}/users/${useAuthStore().user.id}/transactions/insight/month`, 'monthlyStats');

    if (!transactions.value.monthlyTransactions) {
        await fetchTransactions(`${import.meta.env.VITE_BASE_URL}/users/${useAuthStore().user.id}/transactions?limit=3`, 'latest');
    } else {
        transactions.value.latest = transactions.value.monthlyTransactions.slice(0, 3);
        isLoading.value.latest = false;
    }
}

onMounted(async c => {
    await fetchAll()
})

const toast = useToast();
</script>

<template>
    <Toast />
    <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-12 md:grid-rows-[repeat(7,105px)] gap-6">
            <!-- Income Card -->
            <TransactionsTypeCard type="income" :transactions="transactions.monthlyTransactions"
                :isLoading="isLoading.monthlyTransactions" />

            <!-- Outcome Card -->
            <TransactionsTypeCard type="outcome" :transactions="transactions.monthlyTransactions"
                :isLoading="isLoading.monthlyTransactions" />

            <!-- Balance Card -->
            <BalanceCard :transactions="transactions.monthlyTransactions" :isLoading="isLoading.monthlyTransactions" />

            <RefreshCard :refresh="fetchAll" />

            <!-- Last Transactions Card -->
            <TransactionsCard :transactions="transactions.latest" :isLoading="isLoading.latest" />

            <!-- Coming Soon Card -->
            <ComingSoonCard />

            <!-- Expenses by Category Chart -->
            <ExpensesByCategoryChart
                :transactions="transactions.monthlyTransactions.filter(elm => elm.type === 'outcome')"
                :isLoading="isLoading.monthlyTransactions" />

            <!-- Monthly Stats Chart -->
            <MonthlyStatsChart :transactions="transactions.monthlyStats" :isLoading="isLoading.monthlyStats" />
        </div>
    </div>
</template>