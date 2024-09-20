<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { defineProps } from 'vue';

const props = defineProps({
    transactions: Array,
    isLoading: Boolean
});

</script>

<template>

    <DataTable :value="transactions" :loading="isLoading" :rows="10" tableStyle="min-width: 50rem"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}">
        <Column field="name" header="Name" />
        <Column field="amount" header="Amount">
            <template #body="slotProps">
                <span v-if="slotProps.data.type === 'income'" class="text-green-500">+ {{ slotProps.data.amount
                    }}€</span>
                <span v-else class="text-red-500">- {{ slotProps.data.amount }}€</span>
            </template>
        </Column>
        <Column field="type" header="Type" />
        <Column field="date" header="Date" />
        <Column field="category" header="Category">
            <template #body="slotProps">
                <span v-if="slotProps.data.category">{{ slotProps.data.category }}</span>
                <span v-else>N/A</span>
            </template>
        </Column>
    </DataTable>
</template>