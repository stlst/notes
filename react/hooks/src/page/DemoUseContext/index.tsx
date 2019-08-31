import React, { useContext, useState } from "react";
import { ContextProvider, MyContext } from "./MyContext";

const EditToken = () => {
  const { token, setToken } = useContext(MyContext);
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <input
        value={inputValue}
        onChange={(e: any) => setInputValue(e.target.value)}
      />
      <button
        onClick={() => {
          // alert("Old token is " + token);
          setToken(inputValue);
          setInputValue("");
        }}
      >
        submit
      </button>
    </>
  );
};

const ShowToken = () => {
  const { token } = useContext(MyContext);
  return <p>{`token: ${token}`}</p>;
};

export const DemoUseContext = () => {
  return (
    <ContextProvider>
      <EditToken />
      <ShowToken />
    </ContextProvider>
  );
};
