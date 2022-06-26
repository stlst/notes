<template>
  <div class="about">
    <div class="arrow"></div>
    <counter @children="handleChildren" />
    <h1>This is an about page</h1>
    <h1>percentage :{{ percentage }}</h1>
    <h1>initY :{{ initY }}</h1>
    <h1>y: {{ y }}</h1>
    <h1>direction :{{ direction }}</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from "@vue/composition-api";
import Counter from "../components/Counter.vue";
import { useScroll } from "../hooks/useScroll";

export default defineComponent({
  components: { Counter },
  setup() {
    const { percentage, initY, y, direction } = useScroll();
    const handleChildren = (arg) => {
      alert(arg);
    };
    return {
      c: 1,
      handleChildren,
      percentage,
      initY,
      y,
      direction,
    };
  },
});
</script>

<style scoped>
.about {
  height: 1000px;
  background: red;
}
.arrow {
  width: 20px;
  height: 20px;
  border: 20px solid transparent;
  border-top: 20px solid yellow;
}
</style>
