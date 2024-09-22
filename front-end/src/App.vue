<script setup>
import Navbar from "./components/Navbar.vue"
import { useAuthStore } from "./stores/auth.store.js"

const authStore = useAuthStore();
</script>

<template>
  <div class="min-h-screen">
    <div v-if="authStore.user">
      <Navbar />
    </div>
    <main>
      <router-view :key="$route.path"></router-view>
    </main>
  </div>
</template>

<style scoped></style>
