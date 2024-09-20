<script setup>
import { defineProps } from 'vue';
import Card from "primevue/card";
import Button from "primevue/button";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const { isLoading, transactions } = defineProps({
    isLoading: Boolean,
    transactions: Array
})

</script>

<template>
    <Card class="md:col-span-4 md:row-span-3">
        <template #title>
            <div class="flex w-full justify-between">
                <p>Transactions</p>
                <Button as="router-link" size="small" to="/transactions" text severity="info" icon="pi pi-angle-right"
                    iconPos="right" label="View all" />
            </div>
        </template>
        <template #content>
            <i v-if="isLoading" class="pi pi-spin pi-spinner" style="font-size: 1rem"></i>
            <DataTable v-else :value="transactions" size="large">
                <Column field="name"></Column>
                <Column field="amount">
                    <template #body="{ data }">
                        {{ data.amount >= 0 ? '+' : '-' }} {{ data.amount }} €
                    </template>
                </Column>
            </DataTable>

        </template>
    </Card>
</template>