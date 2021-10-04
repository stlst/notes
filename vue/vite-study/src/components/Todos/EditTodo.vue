<template>
  <input
    type="text"
    :value="modelValue"
    @input="onInputChange"
    v-bind="$attrs"
  />
  <!-- v-model="newTodo" -->
  <!-- 注意要把@keyup.enter阻止冒泡 -->
  <!-- 用v-bind="$attrs"展开：
    autofocus
    placeholder="请输入今日待办"
    autocomplete="false" -->
  <!-- @keyup.enter.stop="addTodo" -->
</template>
<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  methods: {
    onInputChange(e) {
      console.log('onInputChange', e.target.value);
      this.$emit('update:modelValue', e.target.value);
    },
  },
};
</script>

<style scoped></style>
