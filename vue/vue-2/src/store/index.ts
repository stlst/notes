import { defineStore } from "pinia";
export const store = defineStore({
  id: "xxx", // 必填

  state: () => {
    return {
      name: "",
    };
  },

  getters: {}, // 非必要转换别填

  actions: {
    setName(a: any) {
      this.name = a;
    },
  },
});
