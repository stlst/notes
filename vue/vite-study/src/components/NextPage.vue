<template>
  <div>next page</div>
</template>

<script>
import { emitter } from "./HelloWorld.vue";
export default {
  mounted() {
    emitter.on("someEvent", (msg) => {
      console.log("someEvent", msg);
    });
  },
};
</script>

<style></style>
