import { createApp, h } from "vue";
import App from "./App.vue";
import "./index.css";
import EditTodo from './components/Todos/EditTodo.vue'

createApp(App)
  .component("comp", {
    render() {
      return h("div", "I am comp");
    },
  })
  // .component('EditTodo', EditTodo)
  .directive("highlight", {
    // 自定义指令
    beforeMount(el, binding, vnode) {
      el.style.background = binding.value;
    },
  })
  .mount("#app");
