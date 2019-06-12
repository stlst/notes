# Spike react-app-rewired

#### 可以根据.env 文件里变量的文件名为 development server 设置 HTTPS 证书

```js
module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function(config, env) {
    // ...add your webpack config
    return config;
  }
  //...
};
```

## Webpack Dev Server

- 如果在开发者模式时，`create-react-app`不会使用一般的`webpack config`。This means that you cannot use the normal webpack section of the config-overrides.js server to make changes to the Development Server settings as those changes won't be applied.
- 可以在`package.json`中定义`proxy`和`allowedHost`字段，给 webpack dev server 使用
- 可以在`config-overrides.js`的`module.exports`里面配置`devServer`。 原始的`react-scripts`函数会被传递到`config-overrides.js`的`devServer`函数里面，从而开发者可以获得初始的 devServer configuration

## Paths configuration - Development & Production

- `paths` 字段用来覆盖 create-react-app 里用来传给 webpack 和 jest 的 paths

## Provide rewired webpack config for 3rd party tools

- 有些第三方库，需要项目目录里有 webpack config 的，我们可以创建 webpack.config.js 文件，然后把它 export 到 rewired config 中

```js
const { paths } = require("react-app-rewired");
// require normalized overrides
const overrides = require("react-app-rewired/config-overrides");
const config = require(paths.scriptVersion + "/config/webpack.config.dev");

module.exports = overrides.webpack(config, process.env.NODE_ENV);
```

- React-app-rewired 中的 start 会 get scriptVersion， 通常这个 scriptVersion 是项目目录的 node_modules/react-scripts
  Custom scripts versions
- 可以设置给 react-scripts 加 custom version file

```js
{
  "scripts": {
    "start": "react-app-rewired start --scripts-version react-scripts-ts",
    "build": "react-app-rewired build --scripts-version react-scripts-ts",
    "test": "react-app-rewired test --scripts-version react-scripts-ts --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

- React-app-rewired 2.x requires a custom react-scripts package to provide the following files:

```js
config / env.js;
config / webpack.config.js;
config / webpackDevServer.config.js;
scripts / build.js;
scripts / start.js;
scripts / test.js;
scripts / utils / createJestConfig.js;
```
