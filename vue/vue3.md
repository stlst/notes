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
