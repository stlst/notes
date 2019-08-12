## React-hooks Sharing

Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

If you want to learn about hooks, go to this site: https://reactjs.org/docs/hooks-intro.html

### Motivation

#### It’s hard to reuse stateful logic between components

衍生了很多抽象层，如： layers of providers, consumers, higher-order components, render props, and other abstractions.
React needs a better primitive for sharing stateful logic.
React 需要一个更好的简单方法来共享状态化逻辑。？

> 构建你自己的 custom hooks， 通常以 use 开头，如 useFriendStatus, 如果不以 use 开头，不好检查 react hooks 的规则。因为看到 use--我们就能知道该里面使用了 hooks
> With Hooks, you can extract stateful logic from a component so it can be tested independently and reused. Hooks allow you to reuse stateful logic without changing your component hierarchy. This makes it easy to share Hooks among many components or with the community.

#### Complex components become hard to understand

To solve this, Hooks let you split one component into smaller functions based on what pieces are related (such as setting up a subscription or fetching data), rather than forcing a split based on lifecycle methods. You may also opt into managing the component’s local state with a reducer to make it more predictable.

#### Classes confuse both people and machines

To solve these problems, Hooks let you use more of React’s features without classes. Conceptually, React components have always been closer to functions. Hooks embrace functions, but without sacrificing the practical spirit of React. Hooks provide access to imperative escape hatches and don’t require you to learn complex functional or reactive programming techniques.

### Gradual Adoption Strategy

> hooks 可以与原来的 react class 风格的代码共存，因此，我们可以逐步变成 hooks 风格的代码。

- 「No rush to migrate to Hooks」
- 不建议对原有代码进行大规模的重构
- 开始使用 hooks 之后需要有思维上的转变 「mindshift to start “thinking in Hooks”」
- 建议：在新的、不太重要的组件上先尝试使用 hooks

### 简单计时器例子

### 介绍

#### useState

#### useEffect

```js
useEffect(() => {
  // useEffect相当于componentDidMount和componentWillUpdate?时的调用
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    // 这里相当于componentWillUnmount时触发的函数
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
});
```

#### useCallback

#### useReducer

#### useContext

#### useLayoutUpdate...

- simple useState example: todo list
- simple useContext example
- Extracting a Custom Hook Sample : how to fetch data with react hooks?
  A custom Hook is a JavaScript function whose name starts with ”use” and that may call other Hooks. For example, useFriendStatus below is our first custom Hook:

```js
import React, { useState, useEffect } from "react";

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

### [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html)

- Only Call Hooks at the Top Level
  Don’t call Hooks inside loops, conditions, or nested functions.
  不要在循环，条件，嵌套函数中使用 hooks,确保 hooks 在每次组件渲染的时候都能以正确的次序正常调用。
  例子：

```js
function Form() {
  // 1. Use the name state variable
  const [name, setName] = useState("Mary");

  // 2. Use an effect for persisting the form
  useEffect(function persistForm() {
    localStorage.setItem("formData", name);
  });

  // 3. Use the surname state variable
  const [surname, setSurname] = useState("Poppins");

  // 4. Use an effect for updating the title
  useEffect(function updateTitle() {
    document.title = name + " " + surname;
  });

  // ...
}
```

```js
// ------------
// First render
// ------------
useState("Mary"); // 1. Initialize the name state variable with 'Mary'
useEffect(persistForm); // 2. Add an effect for persisting the form
useState("Poppins"); // 3. Initialize the surname state variable with 'Poppins'
useEffect(updateTitle); // 4. Add an effect for updating the title

// -------------
// Second render
// -------------
useState("Mary"); // 1. Read the name state variable (argument is ignored)
useEffect(persistForm); // 2. Replace the effect for persisting the form
useState("Poppins"); // 3. Read the surname state variable (argument is ignored)
useEffect(updateTitle); // 4. Replace the effect for updating the title

// ...
```

As long as the order of the Hook calls is the same between renders, React can associate some local state with each of them. But what happens if we put a Hook call (for example, the persistForm effect) inside a condition?

```js
// 🔴 We're breaking the first rule by using a Hook in a condition
if (name !== "") {
  useEffect(function persistForm() {
    localStorage.setItem("formData", name);
  });
}
```

This is why Hooks must be called on the top level of our components. If we want to run an effect conditionally, we can put that condition inside our Hook

- Only Call Hooks from React Functions
  不要在普通的 JavaScript 函数里面用 hooks
  Don’t call Hooks from regular JavaScript functions. Instead, you can:
  ✅ Call Hooks from React function components. 在 React 函数型组件内调用 hooks.
  ✅ Call Hooks from custom Hooks (we’ll learn about them on the next page). 在自己定义的 custom hooks 中调用 hooks.

### [Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html)
