### background 和 contentscript 的 localStorage 有所不同

background localStorage 访问的是插件自己 background 页面的 localStorage

contentscript 访问的是标签页里网站的 localStorage

如果是想存储一些插件相关的数据的话，应该统一在 background 里面去做，如果 contentscript 想访问 background 的 localStoarge 可以用 message passing 手动传递一下。

### Ref

[【干货】Chrome 插件(扩展)开发全攻略](https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html)

[MAC 上如何导出已安装的 chrome 插件 CRX 文件？](http://chromecj.com/utilities/2018-04/1379.html)

[Chrome 插件中 popup,background,contantscript 消息传递机制](https://blog.csdn.net/summerxiachen/article/details/78698878)

[Chrome Extensions 开发文档](https://developer.chrome.com/extensions/messaging)

[Chrome 浏览器扩展开发系列之十三：消息传递 Message](https://www.cnblogs.com/champagne/p/4848520.html)
