## Event Loop

Event Loop 即事件循环，是指浏览器或 Node 的一种解决 javaScript 单线程运行时不会阻塞的一种机制，也就是我们经常使用异步的原理。

在 JavaScript 中， 任务被分为两种， 一种宏任务（ MacroTask） 也叫 Task， 一种叫微任务（ MicroTask）。

### MacroTask（ 宏任务）- tasks

script 全部代码、 setTimeout、 setInterval、 setImmediate（ 浏览器暂时不支持， 只有 IE10 支持， 具体可见 MDN）、 I / O、 UI Rendering。

### MicroTask（ 微任务）- jobs

Process.nextTick（ Node 独有）、 Promise、 Object.observe(废弃)、 MutationObserver（ 具体使用方式查看这里）

### 浏览器中的 Event Loop

Javascript 有一个 main thread 主线程和 call-stack 调用栈(执行栈)，所有的任务都会被放到调用栈等待主线程执行。

#### JS 调用栈

JS 调用栈采用的是后进先出的规则，当函数执行的时候，会被添加到栈的顶部，当执行栈执行完成后，就会从栈顶移出，直到栈内被清空。

#### 同步任务和异步任务

Javascript 单线程任务被分为同步任务和异步任务，同步任务会在调用栈中按照顺序等待主线程依次执行，异步任务会在异步任务有了结果后，将注册的回调函数放入任务队列中等待主线程空闲的时候（调用栈被清空），被读取到栈内等待主线程的执行。

- microtasks are processed after callbacks if the stack is empty. (at the end of a task, we process microtasks)
- JS 执行栈为空的时候，就会去检查一遍 microtask stack 是否为空，若不为空则执行 microtask，使得它为空为止。

- microtasks don't interrupt JavaScript that's mid-execution. This means we don't process the microtask queue between listener callbacks, they're processed after both listeners.

In summary:

- Tasks execute in order, and the browser may render between them
- Microtasks execute in order, and are executed:
  - after every callback, as long as no other JavaScript is mid-execution
  - at the end of each task

UI rendering，它的节点是在执行完所有的 microtask 之后，下一个 macrotask 之前，紧跟着执行 UI render。

### Ref

- [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
- [一次弄懂 Event Loop](https://juejin.im/post/5c3d8956e51d4511dc72c200)
- [带你彻底弄懂 Event Loop](https://segmentfault.com/a/1190000016278115?utm_source=tag-newest)
- [浏览器与 Node 的事件循环(Event Loop)有何区别?](https://blog.csdn.net/Fundebug/article/details/86487117)
