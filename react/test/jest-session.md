[Testing React with Jest and Enzyme](https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675)

Jest
Jest is a JavaScript unit testing framework, used by Facebook to test services and React applications.
Jest acts as a test runner, assertion library, and mocking library.

Snapshot testing

Enzyme
Enzyme is a JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components’ output.

Enzyme, created by Airbnb, adds some great additional utility methods for rendering a component (or multiple components), finding elements, and interacting with elements.
It must be installed in addition to tools already bundled with CRA.

Jest and Enzyme
Both Jest and Enzyme are specifically designed to test React applications, Jest can be used with any other Javascript app but Enzyme only works with React.
Jest can be used without Enzyme to render components and test with snapshots, Enzyme simply adds additional functionality.
Enzyme can be used without Jest, however Enzyme must be paired with another test runner if Jest is not used.

As described, we will use:
Jest as the test runner, assertion library, and mocking library
Enzyme to provide additional testing utilities to interact with elements

[React Testing Library](https://testing-library.com/docs/react-testing-library/api)

how to test react-hooks:
@testing-library/react-hooks
https://react-hooks-testing-library.com/usage/basic-hooks

### 几种测试库的比较

- @testing-library/react

  - render，会把所有子组件逻辑都执行并渲染

- @testing-library/react-hooks: renderHook

  - 对于没有 UI 的 customHook，可以拿到 return 的 state 和 setState; 通过 act 触发 setState

  - 对于 return UI 的函数组件，可以通过 result.current.props.children 拿到 React.Element obj（浅渲染，不会渲染子组件）；可以接着使用 shallow(result.current)（不过好像没啥用）

- enzyme

  - mount，会把所有子组件逻辑都执行并渲染

  - 不能用 render 渲染组件，因为 useEffect 里面触发如<p>{count}</p>的变化不会同步

  - 可以用 shallow，可以检测<p>{count}</p>中 state 的变化，可以 simulate click，但是不能获取函数组件内部的 state(除非在 UI 层显示)
