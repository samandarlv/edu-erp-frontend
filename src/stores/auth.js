import { defineStore } from "pinia";
import authApi from "../api/authApi";
import router from "../router/index";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: null,
    image: "",
    roles: [],
  }),
  actions: {
    async authLogin(payload) {
      try {
        let res = await authApi.login(payload);
        this.user = res?.user;
        if (res?.tokens?.access_token) {
          localStorage.setItem("role", res?.role);
          localStorage.setItem("token", res?.tokens?.access_token);
          if (res?.user?.role === "admin") {
            await router.push({ name: "admin" });
          } else if (res?.user?.role === "teacher") {
            await router.push({ name: "teacher" });
          }
        }
      } catch (err) {
        console.log(err);
      }
    },

    async getProfile() {
      try {
        this.user = await authApi.getProfile();
        this.image = this.user?.image;
      } catch (err) {
        console.log(err);
      }
    },

    async updateImage(payload) {
      try {
        let res = await authApi.updateImage(payload);
        this.image = res?.image;
      } catch (err) {
        console.log(err);
      }
    },

    async updateProfile(payload) {
      try {
        let res = await authApi.updateProfile(payload);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
