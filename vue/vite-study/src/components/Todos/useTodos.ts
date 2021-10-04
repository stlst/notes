import { computed, reactive, toRefs, watchEffect } from "vue";
interface ITodoItem {
  id: number;
  title: string;
  completed: boolean;
}
type IVisibility = "all" | "active" | "completed";
interface IState {
  newTodo: string;
  todos: ITodoItem[];
  count: number;
  beforeEditCache: string;
  editedTodo: ITodoItem;
  visibility: IVisibility;
  filteredTodos: ITodoItem[];
}
const todoStorage = {
  fetch: () => {
    let todos = JSON.parse(localStorage.getItem("vue3-todos") || "[]");
    todos.forEach((todo, index) => {
      todo.id = index + 1;
    });
    return todos;
  },
  save: (todos) => {
    localStorage.setItem("vue3-todos", JSON.stringify(todos));
  },
};
export const useTodos = () => {
  const state: IState = reactive({
    newTodo: "",
    todos: todoStorage.fetch() as ITodoItem[],
    count: computed(() => state.todos.length),
    beforeEditCache: "", // 缓存编辑前的title
    editedTodo: null,
    visibility: "all",
    filteredTodos: computed(() => filters[state.visibility](state.todos)),
  });
  watchEffect(() => {
    todoStorage.save(state.todos);
  });
  const addTodo = (e) => {
    state.todos.push({
      id: state.todos.length + 1,
      title: e.target.value,
      completed: false,
    });
    state.newTodo = "";
  };
  const removeTodo = (todoItem: ITodoItem) => {
    state.todos = state.todos.filter((item) => todoItem.id !== item.id);
  };
  const doneEdit = (todoItem: ITodoItem) => {
    console.log('done edit');
    // 不需要做其他处理，因为数据双向绑定，其他数据变更已经完成了
    state.editedTodo = null;
  };
  const cancelEdit = (todoItem: ITodoItem) => {
    console.log("cancelEdit");

    todoItem.title = state.beforeEditCache;
    state.editedTodo = null;
  };
  const setEditTodo = (todoItem: ITodoItem) => {
    console.log("setEditTodo");

    state.beforeEditCache = todoItem.title;
    state.editedTodo = todoItem;
  };
  const filters = {
    all: (todos: ITodoItem[]) => todos,
    active: (todos: ITodoItem[]) => todos.filter((item) => !item.completed),
    completed: (todos: ITodoItem[]) => todos.filter((item) => item.completed),
  };
  const updateVisibility = (type: IVisibility) => {
    state.visibility = type;
  };

  return {
    ...toRefs(state),
    addTodo,
    removeTodo,
    doneEdit,
    cancelEdit,
    setEditTodo,
    updateVisibility,
  };
};
