import React from "react";
import { inject, observer } from "mobx-react";
import ListStore from "./listStore";

// export type ListStoreProps = { listStore: ListStore };
export type ListStoreProps = {
  list: string[];
  listLength: number;
  deleteListItem: (item: string) => void;
};
export const listStoreDefaultProps = {
  list: (null as unknown) as string[],
  listLength: (null as unknown) as number,
  deleteListItem: (null as unknown) as (item: string) => void
};

interface Props extends ListStoreProps {
  anotherProp: string;
}

@inject((listStore: ListStore) => ({
  list: listStore.list,
  listLength: listStore.listLength,
  deleteListItem: listStore.deleteListItem
}))
@observer
export default class ListWithExtendProps extends React.Component<Props> {
  static defaultProps = listStoreDefaultProps;

  public onDelete = (item: string) => () => {
    this.props.deleteListItem(item);
  };

  public render() {
    console.log("list", this.props.list, this.props.listLength);
    return (
      <>
        <p>total submit: {this.props.listLength}</p>
        {(this.props.list || []).map((item: string, index: number) => (
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
        ))}
      </>
    );
  }
}
