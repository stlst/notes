// ref: https://cloud.tencent.com/developer/article/1780993
// 高级异步模式 - Promise 单例

/**
 * 获取promise单例
 * @returns resolve, reject句柄, 以及promise本身
 */
const myPromise = () => {
  let res, rej, p;
  p = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  return { res, rej, p };
};

let count = 0;
const sleep = () => {
  const { rej, res, p } = myPromise();
  setTimeout(() => {
    console.log("==count", count);
    if (count === 0) {
      count++;
      console.log("after timeout");
      res("after timeout");
    } else {
      count++;
      rej("reject");
    }
  }, 4000);
  return p;
  // 上面的代码equals to belows:
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     console.log("==count", count);
  //     if (count === 0) {
  //       count++;
  //       console.log("after timeout");
  //       resolve("after timeout");
  //     } else {
  //       count++;
  //       reject("reject");
  //     }
  //   }, 4000);
  // });
};

const func = async () => {
  const p = sleep(); // Note we don't `await` yet.

  // promise只能被res或者rej一次;
  console.time("first await");
  await p; // 而不是 await sleep()
  console.timeEnd("first await");

  console.time("second await");
  await p; // 而不是await sleep()
  console.timeEnd("second await");
};

func();
