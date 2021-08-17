<template>
  <div>
    <h1>{{ msg }}</h1>
    <!-- <button @click="count++">count is: {{ count }}</button> -->
    <p>
      Edit <code>components/HelloWorld.vue</code> to test hot module
      replacement.
    </p>
    <!-- composition -->
    <Composition />
    <!-- Teleport: ModalButton -->
    <ModalButton />
    <!-- Emits选项 -->
    <Emits @click="onClick" />
    <!-- 实例方法定义组件 -->
    <comp />
    <!-- v-model的使用 -->
    <VmodelTest v-model:counter="counter"></VmodelTest>
    <!-- 等效于 -->
    <!-- <VmodelTest :counter="counter" @update:counter="counter=$event" /> -->

    <!-- render api -->
    <RenderTest v-model:counter="counter">
      <template v-slot:default> title </template>
      <template v-slot:content> content </template>
    </RenderTest>

    <!-- 函数式组件 -->
    <Functional level="1">一个动态h元素</Functional>

    <!-- 异步组件 -->
    <AsyncComp></AsyncComp>

    <!-- 自定义指令 -->
    <p v-if="true" v-highlight="'green'">highlight this text</p>
    <!-- 动画 -->
    <TransitionTest></TransitionTest>
    <!-- 发送和监听事件 -->
    <button @click="sendMsg">emit event</button>
  </div>
</template>

<script>
import Composition from "./Composition.vue";
import Emits from "./Emits.vue";
import ModalButton from "./ModalButton.vue";
import VmodelTest from "./VmodelTest.vue";
import RenderTest from "./RenderTest.vue";
import Functional from "./Functional.vue";
import TransitionTest from "./TransitionTest.vue";
import { defineAsyncComponent } from "vue";

// 事件派发和监听
import mitt from "mitt";
export const emitter = mitt();

export default {
  components: {
    Composition,
    ModalButton,
    Emits,
    VmodelTest,
    RenderTest,
    Functional,
    // AsyncComp: () => import("./NextPage.vue"), // 以前的写法，但是vue3没法和函数式组件区分
    AsyncComp: defineAsyncComponent({
      loader: () => import("./NextPage.vue"), // 这样不会被打入主chunk中
      // errorComponent:xxx,
      // loadingComponent:xxx,
      // timeout:300,
      // delay:200,
    }),
    TransitionTest,
  },
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      counter: 1,
    };
  },
  methods: {
    onClick() {
      console.log("click me!", this.counter);
    },
    sendMsg() {
      emitter.emit("someEvent", "foooo");
    },
  },
};
</script>
