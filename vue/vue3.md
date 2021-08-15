# Vue3

### 升级 vue-cli v4.5

### vite

```
npm init vite-app <project-name>
```

### 新特性

#### Composition api

- toRefs
- ref
- reactive

#### Teleport

- 简洁的方式可以指定他里面内容的父元素

#### Fragments

- vue3 中组件可以拥有多个根

#### Emits Component Option

- vue3 中组件发送的自定义事件需要定义在 emits 选项中：
  - 原生事件会出发两次，比如 click
  - 更好的指示组件工作方式
  - 对象形式事件校验，从而决定该事件是否要派发出去

```vue
<template>
  <div @click="$emit('click')">
    <h3>自定义事件</h3>
  </div>
</template>
<script>
export default {
  // 这里声明自定义事件名称，比如这里设置成‘click’，那么就会和原生事件冲突，因此原生事件触发两次
  emits: ["click"],
};
</script>
```

#### 自定义渲染器 custom renderer

- createRenderer

#### Global API 改为应用程序实例调用

- vue3 使用 createApp 返回 app 实例，由它暴露一系列全局 api，如：
  - Vue.use -> app.use
  - Vue.filter -> removed
  - Vue.component -> app.component (这个还挺好用的)
  - Vue.mixin -> app.mixin

#### Global and internal APIs 重构为可做 tree shaking 优化

- 如`Vue.nextTick`，`Vue.observable`

#### model 选项和 v-bind 的 sync 修饰符被移除，统一为 v-model 参数形式

#### 异步组件要求使用`defineAsyncComponent`方法创建

> 由于 vue3 中函数式组件必须定义为纯函数，异步组件定义时有如下变化：

- 必须明确使用`defineAsyncComponent`包裹
- 待配置的异步组件，`loader`选项是以前的`component`

#### 组件 data 选项应该总是声明为函数

```js
createApp({
	data(){
		return {
			key:'123
		}
	}
}).mount('#app)
```

#### `is`属性仅限于用在`component`标签上

> 动态组件的设置

```js
<component is="comp"></component>
```

#### `$scopedSlots`属性被移除，都用`$slots`代替

#### 自定义指令 API 和组件保持一致

- bind -> beforeMount
- inserted -> mounted
- 增加 beforeUpdate
- 删除 update
- componentUpdated -> updated
- 增加 beforeUnmount
- unbind -> unmounted
