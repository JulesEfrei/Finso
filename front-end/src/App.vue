<script setup>
import Navbar from "./components/Navbar.vue"
import { useAuthStore } from "./stores/auth.store.js"

const authStore = useAuthStore();
</script>

<template>
  <div v-if="authStore.user">
    <Navbar />
  </div>
  <main class="min-h-screen">
    <router-view></router-view>
  </main>
</template>

<style scoped></style>
