import React, { useEffect } from "react";

export const ChildComponent = (props: any) => {
  const { propsFunc } = props;
  useEffect(() => {
    console.log("useEffect in ChildComponent");
    propsFunc();
  }, [propsFunc]);
  return <button onClick={propsFunc}>ChildButton</button>;
};
