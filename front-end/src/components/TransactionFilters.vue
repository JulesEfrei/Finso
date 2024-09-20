<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker';
import Select from 'primevue/select';

const props = defineProps({
    categories: Array
});

const emit = defineEmits('filter');

const filters = ref({
    category: null,
    type: null,
    startDate: null,
    endDate: null,
    amount: '',
    search: ''
});

const applyFilters = () => {
    emit('filter', { ...filters.value });
};
</script>

<template>
    <div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

            <!-- Category Filter -->
            <div class="flex flex-col gap-2">
                <label for="category" class="text-sm">Category</label>
                <Select id="category" v-model="filters.category" :options="categories" placeholder="Select a category"
                    class="w-full" />
            </div>

            <!-- Transaction Type Filter -->
            <div class="flex flex-col gap-2">
                <label for="type" class="text-sm">Transaction Type</label>
                <Select id="type" v-model="filters.type"
                    :options="[{ name: 'All', code: '' }, { name: 'Income', code: 'income' }, { name: 'Expenses', code: 'outcome' }]"
                    optionLabel="name" placeholder="Select type" class="w-full" />
            </div class="flex flex-col gap-2">

            <!-- Amount Filter (text input for expressions) -->
            <div class="flex flex-col gap-2">
                <label for="amount" class="text-sm">Amount Filter</label>
                <InputText id="amount" v-model="filters.amount" placeholder="e.g., > 100, <= 500" class="w-full" />
            </div>
        </div>

        <!-- Date Range Filter -->
        <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="flex flex-col gap-2">
                <label for="startDate" class="text-sm">Start Date</label>
                <DatePicker id="startDate" v-model="filters.startDate" dateFormat="yy-mm-dd"
                    placeholder="Select start date" class="w-full" />
            </div>
            <div class="flex flex-col gap-2">
                <label for="endDate" class="text-sm">End Date</label>
                <DatePicker id="endDate" v-model="filters.endDate" dateFormat="yy-mm-dd" placeholder="Select end date"
                    class="w-full" />
            </div>
        </div>

        <!-- Search Bar -->
        <div class="mt-4 flex flex-col gap-2">
            <label for="search" class="text-sm">Search by Name</label>
            <InputText id="search" v-model="filters.search" placeholder="Search transactions" class="w-full" />
        </div>

        <!-- Apply Filter Button -->
        <div class="mt-4 text-right">
            <Button label="Apply Filters" @click="applyFilters" />
        </div>
    </div>
</template>