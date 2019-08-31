import React, { useEffect, useCallback } from "react";
import { useState } from "react";

const Counter = ({ initialCount }: { initialCount: number }) => {
  const [count, setCount] = useState(initialCount);
  const [name, setName] = useState("");
  const callbackFunc = useCallback(() => {
    console.log("useCallback", count, name);
  }, []);

  useEffect(() => {
    console.log("your name is ", name, count);
    return () => {
      console.log("clear function", name, count);
    };
  }, [name, count]);

  useEffect(() => {
    document.title = String(count);
  });

  useEffect(() => {
    console.log("componentDidMount");
    return () => {
      console.log("componentWillUnmount");
    };
  }, []);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setName("newName")}>setName</button>
      <button onClick={callbackFunc}>callback</button>
    </>
  );
};

export const DemoUseEffect = () => {
  const [isCounterVisible, setVisible] = useState(true);
  return (
    <>
      {isCounterVisible && <Counter initialCount={0} />}
      <button onClick={() => setVisible(!isCounterVisible)}>setVisible</button>
    </>
  );
};
