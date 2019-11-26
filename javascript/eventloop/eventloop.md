## Event Loop

> 为什么 JavaScript 是单线程的？

> JavaScript 的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作 DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定 JavaScript 同时有两个线程，一个线程在某个 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

### Event Loop

Event Loop 即事件循环，是指浏览器或 Node 的一种解决 javaScript 单线程运行时不会阻塞的一种机制，也就是我们经常使用异步的原理。

### 浏览器中的 Event Loop

![img_introduction](https://user-gold-cdn.xitu.io/2019/1/18/1685f037d48da0de?imageslim)

Javascript 有一个 main thread 主线程和 call-stack 执行栈，所有的任务都会被放到执行栈等待主线程执行。

1. 所有同步任务都在主线程上执行，形成一个执行栈 (Execution Context Stack)。
2. 而异步任务会被放置到 Event Table, 当异步任务有了运行结果, 就将该函数移入任务队列(Event Queue)。
3. 一旦执行栈中的所有同步任务执行完毕，引擎就会读取任务队列，然后将任务队列中的第一个任务压入执行栈中运行。
4. 主线程不断重复第三步，也就是"只要主线程空了，就会去读取任务队列"。该过程不断重复，这就是所谓的 **事件循环**。

### 先看看以下代码

```js
setTimeout(() => {
  console.log("1");
}, 0);
var obj = {
  func: function() {
    setTimeout(function() {
      console.log("2");
    }, 0);
    return new Promise(function(resolve) {
      console.log("3");
      resolve();
    });
  }
};
obj.func().then(function() {
  console.log("4");
});
console.log("5");
```

输出结果： `3 5 4 1 2`

脚本执行完毕之后，微任务队列和宏任务队列的状态如下：

```js
Task: 1 2
MicroTask: 4
Log: 3 5
```

然后先后执行微任务和宏任务，得出输出结果`3 5 4 1 2`

> 在 JavaScript 中， 任务被分为两种， 一种**宏任务（ MacroTask）** 也叫 Task， 一种叫**微任务（ MicroTask）**。

### MacroTask（宏任务）- tasks

script 全部代码、 setTimeout、 setInterval、 setImmediate（ 浏览器暂时不支持， 只有 IE10 支持， 具体可见 MDN）、 I / O、 UI Rendering。

### MicroTask（微任务）- jobs

Process.nextTick（ Node 独有）、 Promise、 Object.observe(废弃)、 MutationObserver

##### 微任务的执行优先级比宏任务高，当微任务全部执行完毕之后（微任务队列为空），才执行宏任务。

再看一下这段代码

```js
async function async1() {
  await async2();
  console.log("1");
}
async function async2() {
  console.log("2");
}
console.log("3");
async1();
new Promise(resolve => {
  console.log("4");
  resolve();
})
  .then(function() {
    console.log("5");
    setTimeout(function() {
      console.log("6");
    }, 0);
  })
  .then(function() {
    console.log("7");
  });
setTimeout(function() {
  console.log("8");
}, 0);
console.log("9");
```

脚本执行完毕之后，微任务队列和宏任务队列的状态如下：

```js
Log: 3 2 4 9
MicroTask: 1 firstThen
Task: 8
```

这时候，微任务队列不为空，按顺序执行微任务：

```js
Log: 3 2 4 9 1 5
MicroTask: secondThen
Task: 8 6
```

执行完 firstThen 之后，微任务队列又增加了一个微任务 secondThen，所以继续执行微任务：

```js
Log: 3 2 4 9 1 5 7
MicroTask:
Task: 8 6
```

这时候微任务队列已经为空，所以开始执行宏任务：

```js
Log: 3 2 4 9 1 5 7 8 6
MicroTask:
Task:
```

因此输出结果是：`3 2 4 9 1 5 7 8 6`

### Ref

- [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
- [一次弄懂 Event Loop](https://juejin.im/post/5c3d8956e51d4511dc72c200)
- [带你彻底弄懂 Event Loop](https://segmentfault.com/a/1190000016278115?utm_source=tag-newest)
- [浏览器与 Node 的事件循环(Event Loop)有何区别?](https://blog.csdn.net/Fundebug/article/details/86487117)
- [最后一次搞懂 Event Loop](https://mp.weixin.qq.com/s/MXq8jSPj_Zn7DfRNyR-13g)
