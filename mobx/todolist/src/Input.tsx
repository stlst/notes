import React from "react";
import { inject } from "mobx-react";
import ListStoreAsDemo from "./listStoreAsDemo";

interface IProps {
  listStore?: ListStoreAsDemo;
}
interface IState {
  inputValue: string;
}
@inject("listStore")
export default class Input extends React.Component<IProps, IState> {
  public state = { inputValue: "" };

  public onSubmit = () => {
    // this.props.listStore!.list.push(
    //   `${this.state.inputValue} (without enforceAction)`
    // );
    this.props.listStore!.addListItemWithAction(this.state.inputValue);
    // this.props.listStore!.addListItemWithAsyncAction(this.state.inputValue);
    // this.props.listStore!.addListItemWithGenerator(this.state.inputValue);
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
