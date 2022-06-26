import VueCompositionAPI from "@vue/composition-api";
import { createPinia, PiniaVuePlugin } from "pinia"; // 根据pinia版本 版本1 使用PiniaPlugin 版本2 使用 PiniaVuePlugin
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.use(VueCompositionAPI);
Vue.use(PiniaVuePlugin);
Vue.config.productionTip = false;
const pinia = createPinia();

new Vue({
  pinia,
  router,
  render: (h) => h(App),
}).$mount("#app");
