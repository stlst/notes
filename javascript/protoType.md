### 原型与原型链

[Ref: 一篇文章理解 JS 继承——原型链/构造函数/组合/原型式/寄生式/寄生组合/Class extends](https://segmentfault.com/a/1190000015727237)

#### 继承

##### 原型链继承

> 借用父类的属性，其实子类没有该属性

- prototype & proto

* b
* proto

  - getSubValue
  - a
  - proto

    - getSuperValue

对子类的 prototype 进行改造，赋予父类的实例（覆盖子类的 prototype），使子类能拥有父类的方法。
缺点： 修改 b._proto_.a 会修改父类

##### 借用构造函数继承

> 拷贝父类的属性给子类

```js
function SubType() {
  SuperType.call(this);
  // 把SuperType的实例赋给this
  //  缺点：没有把SuperType的原型赋给SubType
}
```

###### 组合继承

打印这个，会发现所有 protoType 都有 constructor

> Object.protoType

###### 原型式继承

```js
var person = {
  name: "hello",
  fridnes: []
};

function obj(persion) {
  // 新生成一个Object
  object.propotype = persion;
  return new F();
}
// 会有问题
```

###### 寄生式继承

###### 寄生组合式继承
