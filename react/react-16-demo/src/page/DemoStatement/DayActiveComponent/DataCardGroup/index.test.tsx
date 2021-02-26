import { shallow, mount } from "enzyme";
import React from "react";
import { DataCardGroup } from ".";
import { USER_TYPE } from "../..";
import ToDoStore from "../../../../stores/TodoStore";

it("should render DataCardGroup", () => {
  const mockStoreUpdateList = jest.fn();
  const mockToDoStore = new ToDoStore();
  (mockToDoStore as any).updateList = mockStoreUpdateList;
  const getMockStore = () => {
    return { todoStore: mockToDoStore };
  };
  const storeHooks = require("../../../../storeHooks/useTodoList");
  storeHooks.useStore = getMockStore;

  // errors occur when using "mount" below,
  // because "mount" will run useFetchData.
  // "shallow" will not run useFetchData,
  // it only get the initial data from useFetchData.
  const wrapper = shallow(
    <DataCardGroup
      selectedDate={"2019-12-12"}
      selectedUser={USER_TYPE.ADMIN}
    ></DataCardGroup>
  );

  expect(
    wrapper
      .find("p")
      .at(0)
      .text()
  ).toBe("暂无内容");
});
