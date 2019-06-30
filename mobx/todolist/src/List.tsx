import React from "react";
import { inject, observer } from "mobx-react";
import ListStore from "./listStore";

interface IProps {
  listStore?: ListStore;
}

@inject("listStore")
@observer
export class List extends React.Component<IProps> {
  public onDelete = (item: string) => () => {
    this.props.listStore!.deleteListItem(item);
  };

  public render() {
    console.log("list", this.props.listStore!.list);
    return (
      <>
        <p>total submit: {this.props.listStore!.listLength}</p>
        {(this.props.listStore!.list || []).map(
          (item: string, index: number) => (
            <li key={item + index}>
              <button
                type="button"
                onClick={this.onDelete(item)}
                style={{ marginRight: "10px" }}
              >
                删除
              </button>
              {item}
            </li>
          )
        )}
      </>
    );
  }
}
