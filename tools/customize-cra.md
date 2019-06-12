# Spike customize-cra

- 为了给 create-react-app 创建的项目提供方便的 customize 工具，与 react-app-rewired 配合使用

- 可以 override dev server configuration:

```js
const {
  override,
  disableEsLint,
  overrideDevServer,
  watchAll
} = require("customize-cra");

module.exports = {
  webpack: override(
    // usual webpack plugin
    disableEsLint()
  ),
  devServer: overrideDevServer(
    // dev server plugin
    watchAll()
  )
};
```

- 如添加 loaderOptions

```js
const { addTslintLoader } = require("customize-cra");

module.exports = override(addTslintLoader());
```
