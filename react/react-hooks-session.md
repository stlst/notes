## React-hooks Sharing

Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.

If you want to learn about hooks, go to this site: https://reactjs.org/docs/hooks-intro.html

### About Hooks

**What is a Hook?** A Hook is a special function that lets you “hook into” React features. For example, useState is a Hook that lets you add React state to function components. We’ll learn other Hooks later.
hooks 是⼀些让你可以在函数组件中注入 state 和生命周期等 react 特性的函数

**When would I use a Hook?** If you write a function component and realize you need to add some state to it, previously you had to convert it to a class. Now you can use a Hook inside the existing function component. We’re going to do that right now!

### Motivation

#### It’s hard to reuse stateful logic between components

在不同的组件之间很难重用状态逻辑

react 不会提供一个重用组件的功能，（比如连接到 store）。如果你用 react 有一段时间了，你会熟悉 render props 和 高阶组件这些模式去解决这个问题。 但是使用这些模式需要你重构代码，会很麻烦而且代码很难追踪。 如果看了经典的 React 应用在 react DevTools 里面，你会找到组件的 “wrapper 黑洞” 。这衍生了很多抽象层，如： layers of providers, consumers, higher-order components, render props, and other abstractions.

> React needs a better primitive for sharing stateful logic. React 需要一个更原生的写法去共享状态逻辑。

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
const Box = () => {
  const [state, setState] = useState({
    left: 0,
    top: 0,
    width: 100,
    height: 100
  });
  // ...
};
```

change into

```js
const Box = () => {
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
};
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

[在 unmount 中需要依赖 props 的 useEffect 使用方法](https://stackoverflow.com/questions/55139386/componentwillunmount-with-react-useeffect)

```js
const val = React.useRef();
React.useEffect(() => {
  val.current = props;
}, [props]);
React.useEffect(() => {
  console.log("MOUNT", props);
  return () => console.log("UNMOUNT", val.current);
}, [val]);
```

#### useContext

Accepts a context object (the value returned from React.createContext) and returns the current context value for that context. The current context value is determined by the value prop of the nearest <MyContext.Provider> above the calling component in the tree.

### Additional Hooks

#### useReducer

#### useCallback

##### useCallback 与 useMemo 与 react 性能优化有关

react 中，性能的优化点在于：

1. 调用 setState，就会触发组件的重新渲染，无论前后的 state 是否不同
2. 父组件更新，子组件也会自动的更新

基于上面的两点，我们通常的解决方案是：使用 immutable 进行比较，在不相等的时候调用 setState；在 shouldComponentUpdate 中判断前后的 props 和 state，如果没有变化，则返回 false 来阻止更新。

在 hooks 出来之后，我们能够使用 function 的形式来创建包含内部 state 的组件。但是，使用 function 的形式，失去了上面的 shouldComponentUpdate，我们无法通过判断前后状态来决定是否更新。而且，在函数组件中，react 不再区分 mount 和 update 两个状态，这意味着函数组件的每一次调用都会执行其内部的所有逻辑，那么会带来较大的性能损耗。因此 useMemo 和 useCallback 就是解决性能问题的杀手锏。

> useCallback 使用场景是：有一个父组件，其中包含子组件，子组件接收一个函数作为 props；通常而言，如果父组件更新了，子组件也会执行更新；但是大多数场景下，更新是没有必要的，我们可以借助 useCallback 来返回函数，然后把这个函数作为 props 传递给子组件；这样，子组件就能避免不必要的更新。

既然返回的是函数，我们无法很好的判断返回的函数是否变更，所以我们可以借助 ES6 新增的数据类型 Set 来判断，具体如下：

```js
import React, { useState, useCallback } from "react";

const set = new Set();

export default function Callback() {
  const [count, setCount] = useState(1);
  const [val, setVal] = useState("");

  const callback = useCallback(() => {
    console.log(count);
  }, [count]);
  set.add(callback);

  return (
    <div>
      <h4>{count}</h4>
      <h4>{set.size}</h4>
      <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        <input value={val} onChange={event => setVal(event.target.value)} />
      </div>
    </div>
  );
}
```

我们可以看到，每次修改 count，set.size 就会+1，这说明 useCallback 依赖变量 count，count 变更时会返回新的函数；而 val 变更时，set.size 不会变，说明返回的是缓存的旧版本函数。

#### useMemo

```js
export default function WithMemo() {
  const [count, setCount] = useState(1);
  const [val, setValue] = useState("");
  const expensive = useMemo(() => {
    console.log("compute");
    let sum = 0;
    for (let i = 0; i < count * 100; i++) {
      sum += i;
    }
    return sum;
  }, [count]);

  return (
    <div>
      <h4>
        {count}-{expensive}
      </h4>
      {val}
      <div>
        <button onClick={() => setCount(count + 1)}>+c1</button>
        <input value={val} onChange={event => setValue(event.target.value)} />
      </div>
    </div>
  );
}
```

上面我们可以看到，使用 useMemo 来执行昂贵的计算，然后将计算值返回，并且将 count 作为依赖值传递进去。这样，就只会在 count 改变的时候触发 expensive 执行，在修改 val 的时候，返回上一次缓存的值。

> useMemo 和 useCallback 都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；并且这两个 hooks 都返回缓存的值，useMemo 返回缓存的变量，useCallback 返回缓存的函数。

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

### [Rules of Hooks - 两条原则](https://reactjs.org/docs/hooks-rules.html)

- Only Call Hooks at the Top Level
  Don’t call Hooks inside loops, conditions, or nested functions.
  只在函数的作用于顶层使用 hooks，不要在循环，条件，嵌套函数中使用 hooks。
  目的：确保 hooks 在每次组件渲染的时候都能以正确的次序正常调用。
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

- Only Call Hooks from React Functions(只在 React 组件中使用 hooks)
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

### hooks 的原理及实现

### hooks 的测试

### Ref

- [Hooks FAQ](https://reactjs.org/docs/hooks-faq.html#which-versions-of-react-include-hooks)
- [理解 React Hooks](https://juejin.im/post/5be98a87f265da616e4bf8a4)
- [useMemo 与 useCallback 使用指南](https://blog.csdn.net/sinat_17775997/article/details/94453167)
- [](https://blog.csdn.net/duola8789/article/details/88851990)
