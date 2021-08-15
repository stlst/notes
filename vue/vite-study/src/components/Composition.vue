<template>
  <p>{{ counter }}</p>
  <p>{{ doubleCounter }}</p>

  <p ref="desc"></p>
</template>

<script>
import {
  computed,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
export default {
  name: "Composition",
  setup() {
    const { counter, doubleCounter } = useCounter();
    // other, 单值响应式
    const msg2 = ref("some msg");

    // 使用元素引用
    const desc = ref(null); // 初始值为null，与dom中的ref关联使用

    // 侦听器
    watch(
      // () => data.counter,
      counter, // 如果使用toRef进行了转换,则可以直接counter
      (val, oldValue) => {
        const p = desc.value;
        p.textContent = `counter change from ${oldValue} to ${val}`;
      }
    );
    return { counter, doubleCounter, msg2, desc };
  },
};
function useCounter() {
  const data = reactive({
    // 创建响应式对象
    counter: 1,
    doubleCounter: computed(() => data.counter * 2),
  });

  let timer;

  onMounted(() => {
    timer = setInterval(() => {
      data.counter++;
    }, 1000);
  });

  onUnmounted(() => {
    clearInterval(timer);
  });
  return toRefs(data); // 要加上toRefs，否则上面展开data就不会是响应式的了
}
</script>

<style></style>
