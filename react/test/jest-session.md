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
