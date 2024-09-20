<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import PasswordModal from '@/components/PassordModal.vue';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import { useAuthStore } from '@/stores/auth.store';
import { fetchWrapper } from '@/utils/fetchWrapper';
import { isEmail } from "@/utils/validator";

const storedUser = useAuthStore().user;

const userData = ref(storedUser);

const editedUserData = ref({
    name: storedUser.name,
    email: storedUser.email,
});

const showPasswordModal = ref(false);
const isLoading = ref(false);

async function submitProfile() {
    try {
        if (!isEmail(editedUserData.value.email, true)) {
            isLoading.value = false;
            toast.add({ severity: 'error', summary: "Invalid email", life: 3000 });
            return;
        }

        const user = await fetchWrapper.patch(`${import.meta.env.VITE_BASE_URL}/users/${storedUser.id}`, {
            name: editedUserData.value.name,
            email: editedUserData.value.email,
        });

        if (user) {

            userData.value = {
                ...userData.value,
                name: editedUserData.value.name,
                email: editedUserData.value.email,
            };

            localStorage.setItem('user', { ...userData.value })
            isLoading.value = false;
            toast.add({ severity: 'success', summary: "Profile updated!", life: 3000 });
        }
    } catch (e) {
        isLoading.value = false;
        toast.add({ severity: 'error', summary: e.message, life: 3000 });
    }
}

async function submitPassword(newPassword) {
    isLoading.value = true;
    try {
        const user = await fetchWrapper.patch(`${import.meta.env.VITE_BASE_URL}/users/${storedUser.id}`, {
            password: newPassword.value
        });

        if (user) {
            toast.add({ severity: 'success', summary: "Password updated", details: "you will be disconnected", life: 3000 });
            isLoading.value = false;
            showPasswordModal.value = false;
            setTimeout(() => useAuthStore().logout(), 1000)
        }

    } catch (e) {
        isLoading.value = false;
        toast.add({ severity: 'error', summary: e.message, life: 3000 });
        showPasswordModal.value = false;
    }

}

const toast = useToast();
</script>

<template>
    <Toast />
    <div class="p-6 max-w-2xl mx-auto">
        <div class="flex items-center mb-6 gap-4">
            <Avatar image="https://api.dicebear.com/9.x/lorelei/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=finso"
                shape="circle" size="large" />
            <div>
                <h1 class="text-2xl font-bold">{{ userData.name }}</h1>
                <p class="text-gray-600">{{ userData.email }}</p>
                <p class="text-sm text-gray-500">Joined: {{ userData.createdAt }}</p>
            </div>
        </div>

        <div>
            <h2 class="text-xl font-semibold mb-4">Edit Profile</h2>
            <div class="mb-4">
                <label class="block text-gray-700 mb-1">Name</label>
                <InputText v-model="editedUserData.name" :disabled="isLoading" class="w-full" />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 mb-1">Email</label>
                <InputText type="email" v-model="editedUserData.email" :invalid="!isEmail(editedUserData.email)"
                    :disabled="isLoading" class="w-full" />
            </div>
            <div class="mb-4">
                <Button label="Change Password" :disabled="isLoading" size="small" severity="secondary"
                    icon="pi pi-lock" @click="showPasswordModal = true" />
            </div>
            <div>
                <Button label="Save Changes" :loading="isLoading" icon="pi pi-save" class="w-full"
                    @click="submitProfile" />
            </div>
        </div>

        <PasswordModal :isLoading="isLoading" :showModal="showPasswordModal" @close="showPasswordModal = false"
            @submitPassword="submitPassword" />
    </div>
</template>