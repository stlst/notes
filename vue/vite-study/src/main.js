import { createApp, h } from "vue";
import App from "./App.vue";
import "./index.css";

createApp(App)
  .component("comp", {
    render() {
      return h("div", "I am comp");
    },
  })
  .mount("#app");
