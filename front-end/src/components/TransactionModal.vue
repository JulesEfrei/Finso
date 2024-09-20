<script setup>
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import SelectButton from 'primevue/selectbutton';
import DatePicker from 'primevue/datepicker';
import { ref, defineProps } from "vue";
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import { fetchWrapper } from '@/utils/fetchWrapper';
import { formatDateToDMY } from '@/utils/date.js';
import { useAuthStore } from '@/stores/auth.store.js';

const props = defineProps({ visible: Boolean, closeModal: Function });

const name = ref("");
const amount = ref(0);
const type = ref("");
const date = ref();
const category = ref("");
const options = ref(["income", "outcome"]);

const isLoading = ref(false);

async function newTransaction() {
    isLoading.value = true;

    if (!name.value || !amount.value || !type.value || !date.value) {
        isLoading.value = false;
        toast.add({ severity: 'error', summary: "Required fields cannot be empty", life: 3000 });
    }

    try {
        const transaction = await fetchWrapper.post(`${import.meta.env.VITE_BASE_URL}/users/${useAuthStore().user.id}/transactions`, {
            name: name.value,
            amount: amount.value,
            type: type.value,
            date: formatDateToDMY(date.value),
            category: category.value || null,
        });

        if (transaction) {
            isLoading.value = false;
            toast.add({ severity: 'success', summary: transaction.message, life: 3000 });
            props.closeModal();
        }

    } catch (e) {
        isLoading.value = false;
        toast.add({ severity: 'error', summary: e.message, life: 3000 });
    }
}

const toast = useToast();
</script>

<template>
    <Toast />
    <Dialog :visible="props.visible" modal :closable="false" header="New transaction" :style="{ width: '25rem' }">
        <span class="text-surface-500 dark:text-surface-400 block">Add new transaction to your account.</span>
        <span class="text-surface-500 text-sm dark:text-surface-400 block mb-8"><span
                class="text-red-500 font-bold">*</span>
            Required fields.</span>
        <div class="flex items-center gap-4 mb-4">
            <label for="name" class="font-semibold w-24">Name<span class="text-red-500 font-bold">*</span></label>
            <InputText id="name" :disabled="isLoading" v-model="name" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label for="amount" class="font-semibold w-24">Amount<span class="text-red-500 font-bold">*</span></label>
            <InputNumber id="amount" :disabled="isLoading" v-model="amount" inputId="amount" mode="currency"
                currency="EUR" locale="de-DE" />
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label for="type" class="font-semibold w-24">Type<span class="text-red-500 font-bold">*</span></label>
            <SelectButton id="type" :disabled="isLoading" v-model="type" :options="options" aria-labelledby="basic" />
        </div>
        <div class="flex items-center gap-4 mb-8">
            <label for="date" class="font-semibold w-24">Date<span class="text-red-500 font-bold">*</span></label>
            <DatePicker id="date" :disabled="isLoading" show-icon iconDisplay="input" v-model="date"
                dateFormat="mm/dd/yy" />
        </div>
        <div class="flex items-center gap-4 mb-4">
            <label for="category" class="font-semibold w-24">Category</label>
            <InputText id="category" :disabled="isLoading" v-model="category" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="props.closeModal()"></Button>
            <Button type="button" label="Save" :loading="isLoading" @click="newTransaction"></Button>
        </div>
    </Dialog>
</template>