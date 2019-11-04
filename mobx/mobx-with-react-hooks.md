Ref:
[Migration Guide](https://mobx-react.js.org/recipes-migration)
[With React Context](https://mobx-react.js.org/recipes-context)

### Migrate Mobx from React Component to React Hooks

> First and foremost: if you are happy with the current Provider/inject pattern, there is nothing you need to change in your application. This guide is intended as the path to the future of React and tools that might provide you with more comfort.

> Gradual migration is absolutely possible. Don't rewrite your whole app at once.

#### Prerequisite: Upgrade to mobx-react 6.x

**Hooks to the rescue**

React Hooks are most likely the easiest way to consume MobX store. They give you a freedom in how to do things instead of heavily opinionated inject. Consider the following example.

```js
import { observer } from "mobx-react";
const UserOrderInfo = observer(() => {
  const { user, order } = useStores();
  return (
    <div>
      {user.name} has order {order.id}
    </div>
  );
});
```

> mixing state with a component UI is bad practice, right? Well, nobody is forcing you to do that. If accessing context in a UI component bothers you, just pass it through the props from a parent component. Or make your own HOC or render prop component if you must.

The mobx-react@6 exposes a Context object as MobXProviderContext for the purposes of gradual migration. You can make a simple hook like this.

```js
import { MobXProviderContext } from "mobx-react";
function useStores() {
  return React.useContext(MobXProviderContext);
}
```

#### What about mapper function?

With the original `inject` you were able to do something like the following.

```js
@inject(stores => ({
  username: stores.user.name,
  orderId: stores.order.id
}))
@observer
class UserOrderInfo extends React.Component {
  render() {
    return (
      <div>
        {this.props.username} has order {this.props.orderId}
      </div>
    );
  }
}
```

It's important to realize here, that with hooks, such a mapping utility is probably redundant. You can do this directly within the component as shown in the first example on this page.

Alternatively, you can make a custom hook that takes care of mapping only. It may prove useful for reusability purposes or simply a separation of concerns.

```js
function useUserData() {
  const { user, order } = useStores();
  return {
    username: user.name,
    orderId: order.id
  };
}

const UserOrderInfo = observer(() => {
  // Do not destructure data!
  const data = useUserData();
  return (
    <div>
      {data.username} has order {data.orderId}
    </div>
  );
});
```

However, be warned. If you would attempt to destructure data, you will lose the reactivity. This is a general problem with MobX and many get burned by it. An alternative and safer approach might look like following.

```js
// use mobx-react@6.1.2 or `mobx-react-lite`
import { useObserver } from "mobx-react";
function useUserData() {
  const { user, order } = useStores();
  return useObserver(() => ({
    username: user.name,
    orderId: order.id
  }));
}

const UserOrderInfo = () => {
  // this works now just fine
  const { username, orderId } = useUserData();
  return (
    <div>
      {username} has order {orderId}
    </div>
  );
};
```

#### Why Store injecting is Out-of-Date

[Ref: Store injecting](https://mobx-react.js.org/recipes-inject)

The store injection pattern was popularized by the mobx-react library. It refers to a now obsolete way of accessing the MobX stores across the component tree. It was introduced because the React legacy context was rather awkward to use.

We are in 2019 now and we don't need injections anymore (kids, don't do drugs).

Continue reading the Migration guide to learn more about how to abandon the inject paradigm.
