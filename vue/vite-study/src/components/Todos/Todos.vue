<template>
  <div>
    <h3>{{ count }}</h3>
    <!-- 新增todo -->
    <EditTodo
      autofocus
      placeholder="请输入今日待办"
      autocomplete="false"
      :modelValue="newTodo"
      @keyup.enter.stop="addTodo"
    ></EditTodo>
    <ul>
      <li
        v-for="todo in filteredTodos"
        :key="todo.id"
        :class="{ completed: todo.completed, editing: todo === editedTodo }"
      >
        <div class="view" v-show="todo !== editedTodo">
          <input type="checkbox" v-model="todo.completed" />
          <label @dblclick="setEditTodo(todo)"
            >{{ todo.id }} - {{ todo.title }}</label
          >
          <button @click="removeTodo(todo)">X</button>
        </div>
        <!-- 编辑待办 -->
        <input
          v-show="todo === editedTodo"
          type="text"
          class="edit"
          v-model="todo.title"
          v-todo-focus="todo === editedTodo"
          @keyup.enter="doneEdit(todo)"
          @keyup.escape="cancelEdit(todo)"
          @blur="cancelEdit(todo)"
        />
        <!-- @keyup.escape无法被触发 -->
        <!-- v-todo-focus 自定义指令 -->
      </li>
    </ul>
    <p class="filter" :class="visibility">
      <span @click="updateVisibility('all')" class="all">All</span>
      <span @click="updateVisibility('active')" class="active">Active</span>
      <span @click="updateVisibility('completed')" class="completed"
        >Completed</span
      >
    </p>
  </div>
</template>

<script>
import EditTodo from "./EditTodo.vue";
import { useTodos } from "./useTodos";

export default {
  components: { EditTodo },
  setup() {
    // const { newTodo, todos, addTodo, count, removeTodo } = useTodos();
    return useTodos();
  },
  directives: {
    "todo-focus": (el, { value }) => {
      if (value) {
        el.focus();
      }
    },
  },
};
</script>

<style scoped>
.completed label {
  text-decoration: line-through;
}
.filter > span {
  padding: 2px 4px;
  margin-right: 4px;
  border: 1px solid transparent;
}
.filter.active > .active,
.filter.completed > .completed,
.filter.all > .all {
  border-color: #666;
}
/* .editing .view {
  display: none;
} */
</style>
