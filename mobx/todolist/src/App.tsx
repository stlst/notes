import { Provider } from "mobx-react";
import React from "react";
import "./App.css";
import Input from "./Input";
import { ListAsDemo } from "./ListAsDemo";
import ListStore from "./listStore";
const listStore = new ListStore();
const App: React.FC = () => {
  return (
    <Provider listStore={listStore}>
      <div className="App">
        <Input />
        <ul>
          <ListAsDemo anotherProp="hello" />
        </ul>
      </div>
    </Provider>
  );
};

export default App;
