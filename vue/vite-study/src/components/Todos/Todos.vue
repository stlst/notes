<template>
  <div>
    <h3>{{ count }}</h3>
    <!-- 新增todo -->
    <EditTodo
      v-model="newTodo"
      autofocus
      placeholder="请输入今日待办"
      autocomplete="false"
      @keyup.enter.stop="addTodo"
    ></EditTodo>
    <ul>
      <li
        v-for="todo in filteredTodos"
        :key="todo.id"
        :class="{ completed: todo.completed, editing: todo === editedTodo }"
      >
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
import EditTodo from './EditTodo.vue';
import { useTodos } from './useTodos';

export default {
  components: { EditTodo },
  setup() {
    // const { newTodo, todos, addTodo, count, removeTodo } = useTodos();
    return useTodos();
  },
  methods: {
    listenKeyup(e) {
      console.log('=====e', e);
    },
    testFunc(event) {
      // test @update:modelValue
      console.log('@update', event);
      this.newTodo = event;
    },
  },
  directives: {
    'todo-focus': (el, { value }) => {
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
ul li .view {
  display: block;
}
ul li .edit {
  display: none;
}

.editing .view {
  display: none;
}
.editing .edit {
  display: block;
}
</style>
