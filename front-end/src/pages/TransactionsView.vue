<script setup>
import { ref, onMounted } from 'vue';
import TransactionFilters from '@/components/TransactionFilters.vue';
import TransactionList from '@/components/TransactionList.vue';
import Panel from 'primevue/panel';
import Paginator from 'primevue/paginator';
import { useAuthStore } from '@/stores/auth.store';
import { fetchWrapper } from '@/utils/fetchWrapper';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import { formatDateToDMY } from "@/utils/date.js";
import Button from 'primevue/button';

const transactions = ref([]);
const categories = ref([]);
const maxTransactions = ref(0);

const currentFilters = ref({ limit: 10, offset: 0 });

const isLoading = ref(true);


async function getCategories() {
    try {
        const res = await fetchWrapper.get(`${import.meta.env.VITE_BASE_URL}/users/${useAuthStore().user.id}/transactions/categories`)

        if (res) {
            categories.value = res.data ? ["All", ...res.data.filter(elm => elm)] : [];
        }
    } catch (e) {
        toast.add({ severity: 'error', summary: e.message, details: 'Please try again.', life: 3000 });
    }
}

async function getTransactions(filtersOptions = {}) {
    isLoading.value = true;
    try {
        const filters = Object.keys(filtersOptions).reduce((prev, curr, index) => [...prev, curr + "=" + filtersOptions[curr]], []).join("&");

        const res = await fetchWrapper.get(`${import.meta.env.VITE_BASE_URL}/users/${useAuthStore().user.id}/transactions?${filters}`)

        if (res) {
            transactions.value = res.data.transactions || [];
            maxTransactions.value = res.data.maxTransactions;
            isLoading.value = false;
        }
    } catch (e) {
        toast.add({ severity: 'error', summary: e.message, details: 'Please try again.', life: 3000 });
        isLoading.value = false;
    }
}

//init categories & first transactions
onMounted(async () => {
    await getCategories();
    await getTransactions(currentFilters);
    isLoading.value = false;
})

const handleFilter = async (filters) => {
    const newFilters = Object.fromEntries(Object.entries(filters).filter(([key, v]) => v));

    if (filters.startDate) {
        newFilters.startDate = formatDateToDMY(filters.startDate)
    }

    if (filters.endDate) {
        newFilters.endDate = formatDateToDMY(filters.endDate)
    }

    if (filters.type) {
        newFilters.type = filters.type.code;
    }

    if (filters.amount) {
        newFilters.value = {
            ...newFilters.value,
            ...checkAmountFilter(filters.amount)
        };
    }

    if (filters.category === "All") {
        delete newFilters.category
    }

    newFilters.offset = 0;

    currentFilters.value = newFilters;
    await getTransactions(newFilters);
};

const checkAmountFilter = (filterText) => {
    // Handle range expression (e.g., ">= 100 && <= 200")
    if (filterText.includes("&&")) {
        const [left, right] = filterText.split("&&").map(expr => expr.trim());
        return { ...evalAmountExpression(left), ...evalAmountExpression(right) };
    }

    // Handle single expressions (e.g., "> 100", "<= 200")
    return evalAmountExpression(filterText);
};

const evalAmountExpression = (expression, amount) => {
    const [operator, value] = expression.match(/(<=|>=|>|<)\s*(-?\d+)/).slice(1);
    switch (operator) {
        case '>': return { minAmount: value + 1 };
        case '>=': return { minAmount: value };
        case '<': return { maxAmount: value - 1 };
        case '<=': return { maxAmount: value };
        default: return { maxAmount: value };
    }
};

const changePage = async (e) => {
    await getTransactions({ ...currentFilters.value, offset: (e.page + 1) * currentFilters.value.limit })
}

const updateTransactions = async () => {
    await getTransactions(currentFilters.value);
}

const toast = useToast();
</script>

<template>
    <Toast />
    <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Transaction List</h1>

        <!-- Filters Section (collapsible) -->
        <Panel header="Filters" toggleable :collapsed="true">
            <TransactionFilters :categories="categories" @filter="handleFilter" />
        </Panel>

        <!-- Transaction List -->
        <TransactionList :transactions="transactions" :isLoading="isLoading" class="my-4" />

        <Paginator :rows="10" :totalRecords="maxTransactions" @page="changePage">
            <template #start>
                <Button type="button" icon="pi pi-refresh" text @click="updateTransactions" />
            </template>
        </Paginator>
    </div>
</template>