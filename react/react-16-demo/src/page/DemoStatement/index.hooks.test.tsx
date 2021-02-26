// import { renderHook, act } from "@testing-library/react-hooks";
import { DemoStatement } from ".";
import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import ToDoStore from "../../stores/TodoStore";
import { shallow } from "enzyme";
import { renderHook } from "@testing-library/react-hooks";
import { render, fireEvent } from "@testing-library/react";
let container: any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("should test DemoStatement using @testing-library/react-hooks", async () => {
  const mockStoreUpdateList = jest.fn();
  const mockToDoStore = new ToDoStore();
  (mockToDoStore as any).updateList = mockStoreUpdateList;
  const getMockStore = () => {
    return { todoStore: mockToDoStore };
  };
  const storeHooks = require("../../storeHooks/useTodoList");
  storeHooks.useStore = getMockStore;

  // const { result, rerender, waitForNextUpdate } = renderHook(DemoStatement);
  const obj = renderHook(() => DemoStatement());
  // you can shallow what DemoStatement returns if it returns tsx
  // or get values and functions if it returns values and functions
  const wrapper = shallow(obj.result.current);
  wrapper.find(".test-button").simulate("click");
  // when using renderHook, it will run useEffect when componentDidMount once
  // so 1212110 is called below.
  expect(wrapper.find(".test-button").text()).toBe("button");
  // in some cases, we need to use waitForNextUpdate()
  // obj.waitForNextUpdate();
  expect(mockStoreUpdateList).toHaveBeenCalledWith("1212110");
});

it.skip("use act in react-dom/test-utils", () => {
  //   act(() => {
  //     ReactDOM.render(<DemoStatement />, container);
  //   });
  //   const button = container.querySelector("button");
  //   expect(wrapper.find("button").text()).toBe("button");
});

it("use enzyme shallow", () => {
  const mockStoreUpdateList = jest.fn();
  const mockToDoStore = new ToDoStore();
  (mockToDoStore as any).updateList = mockStoreUpdateList;
  const getMockStore = () => {
    return { todoStore: mockToDoStore };
  };
  const storeHooks = require("../../storeHooks/useTodoList");
  storeHooks.useStore = getMockStore;

  const wrapper = shallow(<DemoStatement />);

  wrapper.find(".test-button").simulate("click");
  expect(wrapper.find(".test-button").text()).toBe("button");
  // if using shallow directly(rather than use renderHook then shallow),
  // useEffect as componentDidMount will not run,
  // so it is called with 121210, not 1212110.
  expect(mockStoreUpdateList).toHaveBeenCalledWith("121210");
});
