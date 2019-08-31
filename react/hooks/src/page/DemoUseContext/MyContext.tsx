import React, { Dispatch, useState } from "react";

interface TokenContext {
  token: string;
  setToken: Dispatch<any>;
}

const initTokenContext: TokenContext = {
  token: "",
  setToken: (() => null) as Dispatch<any>
};

const MyContext = React.createContext(initTokenContext);

const ContextProvider = ({ children }: { children: any }) => {
  const [token, setToken] = useState("init-context-token");
  return (
    <MyContext.Provider value={{ token, setToken }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, ContextProvider };
