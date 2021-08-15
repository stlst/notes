import { createApp, h } from "vue";
import App from "./App.vue";
import "./index.css";

createApp(App)
  .component("comp", {
    render() {
      return h("div", "I am comp");
    },
  })
  .directive("highlight", {
    // 自定义指令
    beforeMount(el, binding, vnode) {
      el.style.background = binding.value;
    },
  })
  .mount("#app");
