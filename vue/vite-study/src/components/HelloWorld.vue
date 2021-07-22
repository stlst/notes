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
  </div>
</template>

<script>
import Composition from "./Composition.vue";
import Emits from "./Emits.vue";
import ModalButton from "./ModalButton.vue";
export default {
  components: { Composition, ModalButton, Emits },
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    onClick() {
      console.log("click me!");
    },
  },
};
</script>
