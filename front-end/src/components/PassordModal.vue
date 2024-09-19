<script setup>
import { ref, defineEmits, defineProps } from 'vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const emit = defineEmits(['submitPassword', 'close'])
const props = defineProps({
    showModal: Boolean,
    isLoading: Boolean,
});

const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');


function handleSubmit() {
    if (!password.value) {
        errorMessage.value = 'Passwords cannot be empty';
        return;
    }

    if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Passwords do not match.';
        return;
    }

    errorMessage.value = '';
    emit('submitPassword', password);
};

</script>

<template>
    <Dialog class="w-[30dvw]" :visible="props.showModal" :closable="false" modal header="Change Password">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
        <div class="mb-4 w-full">
            <label class="block text-gray-700 mb-1">New Password</label>
            <Password v-model="password" class="w-full" :disabled="isLoading" toggleMask />
        </div>

        <div class="mb-4">
            <label class="block text-gray-700 mb-1">Confirm Password</label>
            <InputText type="password" v-model="confirmPassword" :disabled="isLoading" :autocomplete="false"
                class="w-full" />
        </div>
        <div class="text-red-500 mb-4" v-if="errorMessage">
            {{ errorMessage }}
        </div>
        <div class="flex justify-between">
            <Button type="button" label="Cancel" severity="secondary" @click="emit('close')" />
            <Button type="button" label="Submit" :loading="isLoading" @click="handleSubmit" />
        </div>
    </Dialog>
</template>
