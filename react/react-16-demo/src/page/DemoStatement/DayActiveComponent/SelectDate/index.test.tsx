import { mount, render } from "enzyme";
import React from "react";
import { SelectDate } from ".";

it("should render SelectDate, using mount", () => {
  const onChange = jest.fn();
  // useEffect will work if we use mount
  const wrapper = mount(<SelectDate onChange={onChange}></SelectDate>);
  const button0 = wrapper.find("button").at(0);

  expect(
    wrapper
      .find("span")
      .at(0)
      .text()
  ).toBe("0");
  expect(button0.text()).toBe("今日");

  button0.simulate("click");

  expect(onChange).toHaveBeenCalledWith(1);
  expect(
    wrapper
      .find("span")
      .at(0)
      .text()
  ).toBe("10");

  button0.simulate("click");

  expect(
    wrapper
      .find("span")
      .at(0)
      .text()
  ).toBe("11");
});
