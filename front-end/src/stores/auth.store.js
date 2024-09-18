import { defineStore } from "pinia";

import { fetchWrapper } from "../utils/fetchWrapper";
import { router } from "../main";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")),
    token: JSON.parse(localStorage.getItem("token")),
    returnUrl: null,
  }),
  actions: {
    async login(email, password) {
      const { data } = await fetchWrapper.post(
        "http://localhost:3000/api/auth/login",
        {
          email,
          password,
        }
      );

      // update pinia state
      this.user = data.user;
      this.token = data.token;

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));

      // redirect to previous url or default to home page
      router.push(this.returnUrl || "/");
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/login");
    },
  },
});
