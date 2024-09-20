<script setup>
import Button from 'primevue/button';
import Card from 'primevue/card';
import { defineProps } from 'vue';

const { refresh } = defineProps({
    refresh: Function
})
</script>

<template>
    <Card class="md:col-span-2">
        <template #title>Refresh</template>
        <template #content>
            <div class="flex justify-center">
                <Button icon="pi pi-refresh" size="small" @click="refresh" severity="success"
                    aria-label="Refresh data" />
            </div>
        </template>
    </Card>
</template>