# [React State with Hooks: useReducer, useState, useContext](https://www.robinwieruch.de/react-state-usereducer-usestate-usecontext/)

## useState for simple State

```js
const App = () => {
  const [task, setTask] = useState("");

  const handleChangeInput = event => {
    setTask(event.target.value);
  };

  const handleSubmit = event => {
    if (task) {
      // add new todo item
    }

    setTask("");

    event.preventDefault();
  };

  return (
    <div>
      <ul>
        {initialTodos.map(todo => (
          <li key={todo.id}>
            <label>{todo.task}</label>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input type="text" value={task} onChange={handleChangeInput} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};
```

- 现在`input`是一个`controlled input field`,因为`value={task}`设置了`input`的`value`来自`react`的`state`.

- `handleSubmit`中，添加完 new todo item 之后，调用`setTast('')`把 task 的值重置。

- [event.preventDefault()](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault)函数的作用：prevent the default behavior of the browser, because otherwise the browser would perform a refresh after the submit button has been clicked.

* add `uuid`: if you want to generate a unique identifier for your TODO list, you can install it using `npm install uuid`.

```js
import uuid from 'uuid/v4'
const initialTodo = {
    {
        id:uuid(),
        task:'task 1'
    },
    {
        id:uuid(),
        task:'task 2'
    }
}
```

## useReducer for complex State

- `useReducer`: better to keep states maintainable and predictable.
- it decides what task to perform in the switch case statement and then return a new state

```js
const filterReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_ALL":
      return "ALL";
    case "SHOW_COMPLETE":
      return "COMPLETE";
    case "SHOW_INCOMPLETE":
      return "INCOMPLETE";
    default:
      throw new Error();
  }
};

const App = () => {
    // useReducer(reducerFunc, initialState)
  const [filter, dispatchFilter] = useReducer(filterReducer, "ALL");
  ...
  const handleShowAll = () => {
      dispatchFilter({type:'SHOW_ALL'})
  }
  const handleShowComplete = () => {
      dispatchFilter({type:'SHOW_COMPLETE'})
  }
};
```

## useContext for "global" State

> "global" state in the whole component tree

```js
import React, { useState, useReducer, createContext } from "react";
...
const TodoContent = createContext(null);
```

- Then the App can use the context's Provider method to pass implicitly a value down the component tree:

```js
const App = () => {
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);

  const filteredTodos = todos.filter(todo => {
    ...
  });

  return (
    <TodoContext.Provider value={dispatchTodos}>
      <Filter dispatch={dispatchFilter} />
      <TodoList dispatch={dispatchTodos} todos={filteredTodos} />
      <AddTodo dispatch={dispatchTodos} />
    </TodoContext.Provider>
  );
};
```

- we don't need to pass down the dispatch function any more, because it's available in the context:

```js
return (
  <TodoContext.Provider value={dispatchTodos}>
    <Filter dispatch={dispatchFilter} />
    <TodoList todos={filteredTodos} />
    <AddTodo />
  </TodoContext.Provider>
);
```

- the useContext hook helps us to retrieve the value from the context in the AddTodo component:

```js
import React, ....., {useContext} from 'react'

const AddTodo = () => {
    const dispatch = useContext(TodoContext)
    ......
}
```

- [x] todoList Checkbox
