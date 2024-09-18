import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import "primeicons/primeicons.css";
import DashboardView from "./pages/DashboardView.vue";
import ProfileView from "./pages/ProfileView.vue";
import TransactionsView from "./pages/TransactionsView.vue";
import LoginView from "./pages/LoginView.vue";
import RegisterView from "./pages/RegisterView.vue";
import { createRouter, createMemoryHistory } from "vue-router";
import { useAuthStore } from "./stores/auth.store";
import { createPinia } from "pinia";
import ToastService from "primevue/toastservice";

const routes = [
  { path: "/", component: DashboardView },
  { path: "/profile", component: ProfileView },
  { path: "/transactions", component: TransactionsView },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return "/login";
  }
});

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      cssLayer: {
        name: "primevue",
        order: "tailwind-base, primevue, tailwind-utilities",
      },
    },
  },
});

app.use(router);
app.use(createPinia());
app.use(ToastService);

app.mount("#app");
