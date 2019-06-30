import React from "react";
import { Provider } from "mobx-react";
import "./App.css";
import ListStore from "./listStore";
import { List } from "./List";
import Input from "./Input";
const listStore = new ListStore();
const App: React.FC = () => {
  return (
    <Provider listStore={listStore}>
      <div className="App">
        <Input />
        <ul>
          <List />
        </ul>
      </div>
    </Provider>
  );
};

export default App;
