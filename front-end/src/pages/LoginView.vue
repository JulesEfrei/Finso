<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Card from 'primevue/card';
import { useAuthStore } from '../stores/auth.store.js';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
import Divider from 'primevue/divider';

const email = ref("");
const password = ref("");

const isLoading = ref(false);

async function login() {
    isLoading.value = true;
    try {
        const res = await useAuthStore().login(email.value, password.value)
        console.log(res);

        if (res) {
            isLoading.value = false
            toast.add({ severity: 'success', summary: 'Your account has been successfuly created!', life: 3000 });
        }



    } catch (e) {
        isLoading.value = false;
        toast.add({ severity: 'error', summary: e.message, details: 'Please try again.', life: 3000 });
    }
}

function isEmail(email) {
    return email === "" || email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

const toast = useToast();
</script>

<template>
    <div class="flex justify-center items-center h-screen">
        <Card class="w-[50dvw]">
            <template #title>Login to your account</template>
            <template #content class="flex items-center">
                <div class="flex flex-col gap-4 my-6 w-full">
                    <div class="flex flex-col gap-2">
                        <label for="email">Email</label>
                        <InputText id="email" v-model="email" placeholder="Email" :invalid="!isEmail(email)" />

                    </div>
                    <div class="flex flex-col gap-2">
                        <label for="password">Password</label>
                        <Password id="password" :feedback="false" v-model="password" placeholder="Password"
                            toggleMask />
                    </div>
                </div>
                <div class="flex justify-center">
                    <Button type="button" size="small" label="Login" :loading="isLoading" @click="login" />
                </div>
            </template>
            <template #footer>
                <div class="flex justify-center">
                    <Button as="router-link" size="small" severity="secondary" label="Register" to="/register" />
                </div>
            </template>
        </Card>
    </div>
</template>

<script scoped></script>