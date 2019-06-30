import React from "react";
import { inject } from "mobx-react";
import ListStore from "./listStore";

interface IProps {
  listStore?: ListStore;
}
interface IState {
  inputValue: string;
}
@inject("listStore")
export default class Input extends React.Component<IProps, IState> {
  public state = { inputValue: "" };

  public onSubmit = () => {
    // this.props.listStore!.list.push("without enforce action");
    // this.props.listStore!.addListItem(this.state.inputValue);
    this.props.listStore!.addListItemWithGenerator(this.state.inputValue);
    console.log("after generator: ", this.props.listStore!.list);
    this.setState({ inputValue: "" });
  };

  public onChange = (event: any) => {
    this.setState({ inputValue: event.target.value });
  };

  public render() {
    return (
      <>
        <input
          value={this.state.inputValue}
          onChange={this.onChange}
          style={{ marginRight: "10px" }}
        />
        <button type="button" onClick={this.onSubmit}>
          提交
        </button>
      </>
    );
  }
}
