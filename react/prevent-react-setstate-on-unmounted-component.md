# [Prevent React setState on unmounted Component](https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component/)

### 经常会遇到一些报错：

> Warning: Can only update a mounted or mounting component. This usually means you called setState, replaceState, or forceUpdate on an unmounted component. This is a no-op.

### The following cases are the most common causes:

1. 异步请求。如 API 请求还没有被 resolve，但此时组件被 unmount 了；然后 API 请求被 resolve 了，然后触发了`this.setState()`
2. 监听器(listener)。listener 没有在`componentWillUnmount`的时候删掉，那么这 listener 有可能在组件 unmount 的时候被触发
3. interval。假设把`this.setState()`放在了`setInterval`中，并且没有在`componentWillUnmount`里删掉

### Worse Situation

- 导致应用运行时发生 memory leaks。如果发生这种情况的组件过多，会导致应用运行变慢。
- 忘记删除`listener`和`intervals`的情况会更严重

## How to prevent setState for intervals/listeners on unmounted Components?

- provide a mechanism in the unmounting lifecycle of a React component. For instance, we should remove `listeners` and `intervals`.

## How to prevent setState for asyncchronous requests on unmounted Components?

```js
class News extends Component {
  _isMounted = false;
  // introducing a class field that holds the lifecycle state of your component
// so that you can keep track of your component's life cycle
  constructor(props) {
    super(props);

    this.state = {
      news: [],
    };
  }

  componentDidMount() {
    this._isMounted = true;

    axios
      .get('https://hn.algolia.com/api/v1/search?query=react')
      .then(result =>{
          if(this.__isMounted){
        this.setState({
          news: result.data.hits,
        })
          }
      },
      );
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    ...
  }
}
```
