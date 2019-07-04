import React from "react";
import { Provider } from "mobx-react";
import "./App.css";
import ListStore from "./listStore";
import Input from "./Input";
import ListWithExtendProps from "./ListWithExtendProps";
const listStore = new ListStore();
const App: React.FC = () => {
  return (
    <Provider listStore={listStore}>
      <div className="App">
        <Input />
        <ul>
          <ListWithExtendProps anotherProp="hello" />
        </ul>
      </div>
    </Provider>
  );
};

export default App;
