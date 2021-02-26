import ToDoStore from "./TodoStore";

const createStores = () => ({
  todoStore: new ToDoStore()
});

export default createStores;

export type TStore = ReturnType<typeof createStores>;
