# Multiple Language HTML Solution

> 同一份 html 模板生成多语言 html 的打包方案。

## 需求背景

> 生成一个静态页面之后，需要将文本翻译成其他语言，如果同时维护多个文本不同的页面，难免会出现错漏翻译文本、需要同步页面结构等诸多麻烦。因此希望在完成一个静态页面之后，可以使用工具自动生成对应的翻译页面。

- html 静态网页，基本由样式组成，还有少量的 js 逻辑
- 需要用同一份样式支持多种语言
- 为了有利于 SEO，不采用`i18n`这种运行时翻译多语言的方式
- 不同语言的网页会有样式的微调
- 不同语言的网页会有特有的 js 逻辑

## 方案

> [HTML 多语言 Webpack 插件 gettext-html-plugin](https://mufeng.me/post/html-i18n-webpack-plugin-gettext-html-plugin) > [静态页面多语言的实现](https://mufeng.me/post/the-realization-of-the-static-page-more-than-language)

### `gettext-html-plugin`实现思路

- 使用正则提取静态页面中的文本，按照 [Gettext](https://zh.wikipedia.org/zh-hans/Gettext) 标准生成翻译文件，随后在打包时，自动生成对应的翻译页面。

- Hook `html-webpack-plugin` 插件，在插件处理 HTML 之前，将对应的文本替换成翻译后的文本即可。

```js
compiler.hooks.compilation.tap("GettextHtmlPlugin", (compilation) => {
  compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(
    "GettextHtmlPlugin",
    (data) => {
      data.html = data.html.replace(/{{*}}/, "<*>");
    }
  );
});
```

## 功能

### 支持其他标签

除了能支持从标签`<p>{{简体权益}}</p>`打包出以下这种三语 html 之外，还可以支持其他形式的替换。

```html
<p>简体权益</p>
<p>繁體權益</p>
<p>rights</p>
```

比如这里，可以针对不同语言配置不同的`<a href="{{zh-cn.website.com}}" />`

```html
<a href="zh-cn.website.com" />
<a href="zh-hk.website.com" />
<a href="en.website.com" />
```

### 根据不同语言打包该语言独有的 css 和 js

先把对应 chunk 作为 entry 读取进来(如`zh-cn`)，在 chunk 中 import 对应 css，然后参考以下解决方案即可。css 可以做到同名样式覆盖。

```js
new HtmlWebpackPlugin({
  filename: "zh-cn.html",
  template: path.resolve(__dirname, "/../src/index.html"),
  chunks: ["index", "zh-cn"],
});
```

### 在`html`头部加上根据不同语言的页面跳转

需要注意，配置根据不同`navigator.language`跳转到不同语言 html 的逻辑。

## 坑

- `gettext-html-plugin`适用的`html-webpack-plugin`版本是@3.\*，与目前的最新版本相比有点落后，适用起来具有版本局限性
- 如果想要针对不同语言配置不同图片，可以参考前面提到的配置不同 url 的方式。但如果是本地打包的图片，则需要特殊处理了。（因为本地打包时，`html-withimg-loader`、`url-loader`或者其他插件会同时读取并打包本地图像文件）


### Ohter Reference

- [webpack i18n国际化配置](https://blog.csdn.net/hsl0530hsl/article/details/78765996)
- [通用的静态资源国际化方案](https://github.com/OneWayTech/i18n-static)
- i18n-webpack-plugin
- i18n-loader 
- babel-plugin-i18n
