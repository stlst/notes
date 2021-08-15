module.exports = {
  vueCompilerOptions: {
    // 自定义组件白名单
    // 跳过warning : vue.js:1236 [Vue warn]: Failed to resolve component: p-button
    isCustomElement: (tag) => tag === "p-button",
  },
};
