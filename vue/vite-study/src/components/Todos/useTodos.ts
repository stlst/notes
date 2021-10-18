import { computed, reactive, toRefs, watchEffect } from "vue";
export interface ITodoItem {
  id: number;
  title: string;
  completed: boolean;
}
type IVisibility = "all" | "active" | "completed";
interface IState {
  newTodo: string;
  todos: ITodoItem[];
  count: number;
  // beforeEditCache: string;
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
