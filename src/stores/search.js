import { defineStore } from "pinia";
import search from "../api/search";

export const useSearchStore = defineStore({
  id: "search",
  state: () => ({
    result: [],
  }),
  actions: {
    async search(payload) {
      try {
        let res = await search.searchByPhone(payload);
        this.result = res?.student;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
