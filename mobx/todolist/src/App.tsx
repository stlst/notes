import { Provider } from "mobx-react";
import React from "react";
import "./App.css";
import Input from "./Input";
import { ListAsDemo } from "./ListAsDemo";
import ListStoreAsDemo from "./listStoreAsDemo";
const listStore = new ListStoreAsDemo();
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
