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
  </div>
</template>

<script>
import Composition from "./Composition.vue";
import ModalButton from "./ModalButton.vue";
export default {
  components: { Composition, ModalButton },
  name: "HelloWorld",
  props: {
    msg: String,
  },
};
</script>
