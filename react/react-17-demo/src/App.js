import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "React 17";
    document.addEventListener("click", function (e) {
      // 在调用了 e.stopPropagation() 的 React 中
      // 这个自定义处理器将不会再接受 click 事件
      console.log("document click", e);
    });
  }, []);
  return (
    <div className="App">
      <header
        className="App-header"
        onClick={(e) => console.log("onclick header", e)}
      >
        <img src={logo} className="App-logo" alt="logo" />
        <p
          onClick={(e) => {
            console.log("onclick p");
            e.stopPropagation();
          }}
        >
          <span>This is React 17.</span>
          <br></br>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
