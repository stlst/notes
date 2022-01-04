// 获取promise单例，返回resolve, reject, 以及promise本身

const runPromise = async ({ res, rej, p }) => {
  try {
    await p;
    // res("runPromise");
    return true;
  } catch (e) {
    console.log("=eee", e);
    return false;
  }
  // return "123";
};
let count = 0;
const myPromise = () => {
  let res, rej, p;
  p = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("==count", count);
      if (count === 0) {
        console.log("after timeout");
        resolve("after timeout");
      } else {
        count++;
        reject("reject");
      }
    }, 4000);
    res = resolve;
    rej = reject;
  });
  debugger;
  return { res, rej, p };
};

const func = async () => {
  let mp = myPromise();
  const a = await runPromise(mp);
  console.log("====a", a);
  if (!a) {
    mp = myPromise();
  }
  const b = await runPromise(mp);
  console.log("====b", b);
};

func();
