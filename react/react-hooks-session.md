## React-hooks Sharing

Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

If you want to learn about hooks, go to this site: https://reactjs.org/docs/hooks-intro.html

### About Hooks

**What is a Hook?** A Hook is a special function that lets you “hook into” React features. For example, useState is a Hook that lets you add React state to function components. We’ll learn other Hooks later.

**When would I use a Hook?** If you write a function component and realize you need to add some state to it, previously you had to convert it to a class. Now you can use a Hook inside the existing function component. We’re going to do that right now!

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

- hooks 用于函数型组件中，不适用于 class 中

### Basic Hooks

#### useState

- 相当于 this.state in class
- useState() 的初始值
- useState() 的返回值

```js
import React, { useState } from "react";

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

Equivalent Class Example
If you used classes in React before, this code should look familiar:

```js
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

Multiple states

```js
function Box() {
  const [state, setState] = useState({
    left: 0,
    top: 0,
    width: 100,
    height: 100
  });
  // ...
}
```

> This is because when we update a state variable, we replace its value. This is different from this.setState in a class, which merges the updated fields into the object.
> we recommend to split state into multiple state variables based on which values tend to change together.

#### useEffect

> The Effect Hook lets you perform side effects in function components:
> Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.
> If you’re familiar with React class lifecycle methods, you can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined.
> Effects Without Cleanup vs Effects with Cleanup
> 需要清理的 effects: set up a subscription
> have to duplicate the code between these two lifecycle methods in class: useEffect runs both after the first render and after every update

```js
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

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

```js
// ...
useEffect(() => {
  function handleWindowMouseMove(e) {
    // Spreading "...state" ensures we don't "lose" width and height
    setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
  }
  // Note: this implementation is a bit simplified
  window.addEventListener("mousemove", handleWindowMouseMove);
  return () => window.removeEventListener("mousemove", handleWindowMouseMove);
}, []);
// ...
```

#### useContext

### Additional Hooks

#### useReducer

#### useCallback

#### useMemo

#### useRef

How to get the previous props or state?
Currently, you can do it manually with a ref:

```js
function Counter() {
  const [count, setCount] = useState(0);

  const prevCountRef = useRef();
  useEffect(() => {
    prevCountRef.current = count;
  });
  const prevCount = prevCountRef.current;

  return (
    <h1>
      Now: {count}, before: {prevCount}
    </h1>
  );
}
```

#### useImperativeHandle

#### useLayoutEffect

#### useDebugValue

- simple useState example: todo list
- simple useContext example

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

> You can’t use Hooks inside of a class component.

### [Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html)

- Extracting a Custom Hook Sample : how to fetch data with react hooks?
  A custom Hook is a JavaScript function whose name starts with ”use” and that may call other Hooks. For example, useFriendStatus below is our first custom Hook:

### From Classes to Hooks

- How do lifecycle methods correspond to Hooks?

**constructor**: Function components don’t need a constructor. You can initialize the state in the useState call. If computing the initial state is expensive, you can pass a function to useState.

**getDerivedStateFromProps**: Schedule an update while rendering instead.

**shouldComponentUpdate**: See React.memo below.

**render**: This is the function component body itself.

**componentDidMount, componentDidUpdate, componentWillUnmount**: The useEffect Hook can express all combinations of these (including less common cases).

**componentDidCatch and getDerivedStateFromError**: There are no Hook equivalents for these methods yet, but they will be added soon.

### Ref

- [Hooks FAQ](https://reactjs.org/docs/hooks-faq.html#which-versions-of-react-include-hooks)
