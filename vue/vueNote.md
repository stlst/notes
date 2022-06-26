## Learn Vue

### 双向数据绑定与单项数据流并不冲突

```html
<input v-model="message" />
equals to
<input :value="message" @input="handleChange" />
```

> 你可以用 v-model 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但 v-model 本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

v-model 会忽略所有表单元素的 value、checked、selected attribute 的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 data 选项中声明初始值。

v-model 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：

- text 和 textarea 元素使用 value property 和 input 事件；
- checkbox 和 radio 使用 checked property 和 change 事件；
- select 字段将 value 作为 prop 并将 change 作为事件。

### vue dev-tools

### 测试工具

- jest
- @vue/test-utils
- sinon

## about vue 源码

createApp 打断点，可以进去，知道 new Vue 的时候做了些什么事情？

vue:

- complier dom -- complier core
- reactivity
- runtime-dom -- runtime-core

rollup

umd/cjs/esm

1. renderer.createApp() => app runtime-core/renderer

```
// 这就是返回的渲染器
return {
    render, // vnode=>dom
    hydrate,
    //获取app实例创建工厂函数
    createApp: createAppAPI(render,hydrate) // 工厂函数
}
```

2. runtime-core/src/apiCreateApp.ts, line 129-150

```
// 2.0: vue.use(router)
// 3.0: app.use(router) 不再是静态方法，而是实例方法
```

新的优势：

- 以前的静态方法，全局配置会污染
- 便于 tree-shaking 优化
- 语义

研究如何 render：

1. line 218：获取整棵树的 vnode
2. 渲染器传入的 render 方法将 vnode 转换 -> 看 render 方法如何工作
3. 在 renderer.ts 里面有 render 方法。line2202。最终转换方法还是 patch（把虚拟 dom 变成真实 dom）
4. 研究 patch 方法：有一个 switch-case，调用 processComponent 函数
5. in processComponent func： 第一次初始化挂在组件 mountComponent
6. in mountComponent: 创建组件，安装组件 setupComponent(组件初始化)，setupRenderEffect（安装渲染函数）
7. 添加副作用函数 effect 的作用：把组件的更新函数添加为副作用函数，将来如果数据发生变化，重新执行组件更新函数...将根组件 vnode 转换为 dom

---

### 2021.3.11

两种更新方式：
响应式主动通知
虚拟 dom 是被动计算

#### vue

vue 两个是如何配合的？
根据组件划分，组件之间通过响应式通知，组件内部，通过 vdom 计算 diff

vdom： 用 js 的 object 来描述你的 dom 节点，跨端(eg: react/react native)。

vue2 引入了 vdom，使用的是 snabbdom 的代码，双端预判，减少循环的次数。

vue3 增加了静态标记。

**传统 vdom 的性能瓶颈**：传统的 vdom 的性能与 template 的规模有关，与动态内容的数量无关。

> idea from `prepack.io`: 编译时优化。（eg： tree-shaking 也是这种理念）

vue3：最长递增子序列

**vue3**block tree"区块树"：只 diff 动态变化的内容（使用 block 划分范围）

#### react

fiber 也就是时间切片。

1. 任务可以切开，利用空闲时间计算
2. diff 可以中断

做法：树结构变成链表。
idleCallback。

#### 新框架 - svelet: 没有 vdom，编译成 js。
