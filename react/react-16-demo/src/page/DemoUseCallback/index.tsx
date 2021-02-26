import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import { ChildComponent } from "./ChildComponent";

let callbackSet = new Set();
let notCallbackSet = new Set();

const Counter = ({ initialCount }: { initialCount: number }) => {
  const [count, setCount] = useState(initialCount);
  const [name, setName] = useState("oldName");

  const callbackFunc = useCallback(() => {
    console.log("useCallback", name);
    return name;
    // try to remove count and name in []
  }, [name]);
  callbackSet.add(callbackFunc);
  console.log("callbackSet", callbackSet.size);

  const notCallbackFunc = () => {
    console.log("notCallbackFunc", count, name);
  };
  notCallbackSet.add(notCallbackFunc);
  console.log("notCallbackSet", notCallbackSet.size);

  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setName("newName-" + count)}>setName</button>
      <button onClick={callbackFunc}>callback</button>
      {/* <ChildComponent propsFunc={callbackFunc} /> */}
    </>
  );
};

export const DemoUseCallback = () => {
  return (
    <>
      <Counter initialCount={0} />
    </>
  );
};
