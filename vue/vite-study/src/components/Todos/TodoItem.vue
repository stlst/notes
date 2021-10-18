<template>
  <li :class="{ completed: todo.completed, editing: todo === editedTodo }">
    <div class="view">
      <input type="checkbox" v-model="todo.completed" />
      <label @dblclick="setEditTodo(todo)"
        >{{ todo.id }} - {{ todo.title }}</label
      >
      <button @click="removeTodo(todo)">X</button>
    </div>
    <!-- 编辑待办 -->
    <!-- v-todo-focus 自定义指令 -->
    <!--相当于 v-model="todo.title" -->
    <!-- 问题 -->
    <!-- @keyup.escape无法被触发 -->
    <!-- @keyup="listenKeyup" -->
    <EditTodo
      class="edit"
      :modelValue="todo.title"
      @update:modelValue="todo.title = $event"
      v-todo-focus="todo === editedTodo"
      @blur="doneEdit(todo)"
      @keyup.enter="doneEdit(todo)"
      @keyup.escape="cancelEdit(todo)"
    ></EditTodo>
  </li>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { ITodoItem } from './useTodos';

export default {
	// 声明组件的输入
  props: {
    todo: {
      type: Object,
      required: true, // 必填项
    },
		// 为什么editedTodo要从父组件传进来？
		editedTodo: Object
  },
	// 声明组件的输出
	emits:{},
  setup(props, { emit }) {
    // editedTodo 是父组件状态
    // beforeEditCache 变成内部变量

    const state = reactive({
      beforeEditCache: '', // 缓存编辑前的title
    });
    const removeTodo = (todoItem: ITodoItem) => {
      // 这里不直接处理removeTodo操作，而是emit一个事件，让父级进行删除
      // setup中没有this，因此要通过setup()的传参进来
      emit('remove-todo', todoItem);
      state.todos = state.todos.filter((item) => todoItem.id !== item.id);
    };
    const doneEdit = (todoItem: ITodoItem) => {
      console.log('done edit');
      // 不需要做其他处理，因为数据双向绑定，其他数据变更已经完成了
      state.editedTodo = null;
    };
    const cancelEdit = (todoItem: ITodoItem) => {
      console.log('cancelEdit');

      todoItem.title = state.beforeEditCache;
      state.editedTodo = null;
    };
    const setEditTodo = (todoItem: ITodoItem) => {
      console.log('setEditTodo');

      state.beforeEditCache = todoItem.title;
      // 使用v-model修改父组件的editedTodo

      // state.editedTodo = todoItem;
    };
    return {
      ...toRefs(state),
      removeTodo,
      doneEdit,
      cancelEdit,
      setEditTodo,
    };
  },
};
</script>

<style lang="scss" scoped></style>
