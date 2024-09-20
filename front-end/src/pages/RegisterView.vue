<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { router } from '@/main.js';
import { fetchWrapper } from '@/utils/fetchWrapper';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import { isEmail } from "../utils/validator.js"

const name = ref("");
const email = ref("");
const password = ref("");

const isLoading = ref(false);

async function register() {
    isLoading.value = true;

    try {
        const res = await fetchWrapper.post("http://localhost:3000/api/auth/register", {
            name: name.value,
            email: email.value,
            password: password.value
        });

        if (res) {
            isLoading.value = false;
            toast.add({ severity: 'success', summary: 'Your account has been successfuly created!', life: 3000 });
            router.push("/login");
        }
    } catch (e) {
        isLoading.value = false;
        toast.add({ severity: 'error', summary: e.message, details: 'Please try again.', life: 3000 });
    }
}

const toast = useToast();

</script>

<template>
    <Toast />
    <div class="flex justify-center items-center h-screen">
        <Card class="w-[50dvw]">
            <template #title>Create your account</template>
            <template #content class="flex items-center">
                <div class="flex flex-col gap-4 my-6 w-full">
                    <div class="flex flex-col gap-2">
                        <label for="name">Name</label>
                        <InputText id="name" v-model="name" placeholder="Name" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="email">Email</label>
                        <InputText type="email" id="email" v-model="email" placeholder="Email"
                            :invalid="!isEmail(email)" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="password">Password</label>
                        <Password id="password" v-model="password" placeholder="Password" toggleMask />
                    </div>
                    <div class="flex justify-center">
                        <Button type="button" size="small" label="Register" :loading="isLoading" @click="register" />
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="flex justify-center">
                    <Button as="router-link" size="small" severity="secondary" label="Login" to="/login" />
                </div>
            </template>
        </Card>
    </div>
</template>

<script scoped></script>