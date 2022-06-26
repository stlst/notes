<template>
  <div class="hello">
    <h1 :ref="'rootRef'">{{ count }}</h1>
    <!-- <h1>{{ state.count }}</h1> -->
    <button @click="addCount">加</button>
    <div>{{ myStore.name }}</div>
    <button @click="myStore.setName('123')">set name</button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
} from "@vue/composition-api";
import { store } from "../store/index";
export default defineComponent({
  name: "counter-demo",
  // props:
  setup(props, context) {
    //     context.emit("children", "setup");
    const myStore = store();
    let rootRef;
    const state = reactive({
      count: 0,
    });
    const addCount = () => {
      state.count++;
      console.log(rootRef);
    };
    const refs = context.refs;
    onMounted(() => {
      // 在初次渲染后 DOM 元素会被赋值给 ref
      rootRef = refs.rootRef;
      console.log(refs.rootRef); // <div/>
    });
    return {
      ...toRefs(state),
      rootRef,
      myStore,
      //     state,
      addCount,
    };
  },
});
</script>
