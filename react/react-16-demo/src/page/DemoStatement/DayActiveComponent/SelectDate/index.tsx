import React, { useEffect } from "react";
import { useState } from "react";
export const SelectDate = ({ onChange }: { onChange: (e: any) => void }) => {
  const [count, setCount] = useState(0);
  console.log("count", count);
  useEffect(() => {
    if (count === 1) {
      console.log("in useEffect");
      onChange(count);
      setCount(10);
    }
  }, [count]);
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>今日</button>
    </div>
  );
};
