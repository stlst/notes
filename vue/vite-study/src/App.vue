<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
  <Todos></Todos>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Todos from "./components/Todos/Todos.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    Todos,
  },
};
</script>
