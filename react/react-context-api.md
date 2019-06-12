# [How is React’s context provided and consumed?](https://www.robinwieruch.de/react-context-api/)

1. create context

```js
import React from "react";
// pass an initial value to ThemeContext
const ThemeContext = React.createContext(null);

export default ThemeContext;
```

2. add provider

```js
// in this example, the value is provided in component A and consumed in comonent D.
import ThemeContext from "./ThemeContext";

class A extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value={"green"}>
        <D />
      </ThemeContext.Provider>
    );
  }
}
```

3. add consumer

```js
import ThemeContext from "./ThemeContext";

class C extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {coloredTheme => <div style={{ color: coloredTheme }}>Hello World</div>}
      </ThemeContext.Consumer>
    );
  }
}
```

4. use with High-Order-Component

```js
const getTheme = Component => {
  class ComponentWithTheme extends React.Component {
    render() {
      return (
        <ThemeContext.Consumer>
          {coloredTheme => {
            <Component {...this.props} colorTheme={coloredTheme} />;
          }}
        </ThemeContext.Consumer>
      );
    }
  }
};

// usage

class App extends React.Component {
  render() {
    return (
      <div>
        <HeadlineWithTheme>Hello React</HeadlineWithTheme>
      </div>
    );
  }
}

...

function Headline(props) {
  return (
    <h1 style={{ color: props.coloredTheme }}>
      {props.children}
    </h1>
  );
}

const HeadlineWithTheme = getTheme(Headline);

```

For example, in `redux`, it provides a high-order-component called `connect`.
