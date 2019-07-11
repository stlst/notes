import React from "react";
import { inject, observer } from "mobx-react";
import ListStoreAsDemo from "./listStoreAsDemo";

interface IProps {
  listStore?: ListStoreAsDemo;
  anotherProp: string;
}

@inject("listStore")
@observer
export class ListAsDemo extends React.Component<IProps> {
  // public componentDidMount = ()=> {
  //   console.log(
  //     "Component did mount",
  //     this.props.listStore!.list,
  //     this.props.anotherProp
  //   );
  // }

  // public componentWillReceiveProps = (nextProps: IProps) => {
  //   // Not called!
  //   console.log(
  //     "Component will receive props",
  //     nextProps.listStore!.list,
  //     nextProps.anotherProp
  //   );
  // }

  // public shouldComponentUpdate = (nextProps: IProps) => {
  //   console.log(
  //     "Should component update",
  //     this.props.listStore!.list,
  //     this.props.anotherProp
  //   );
  //   return true;
  // }

  // public componentWillUpdate = (nextProps: IProps) => {
  //   console.log(
  //     "Component will update",
  //     nextProps.listStore!.list,
  //     nextProps.anotherProp
  //   );
  // }

  // public componentWillReact() {
  //   console.log("in componentWillReact");
  // }

  public onDelete = (item: string) => () => {
    this.props.listStore!.deleteListItem(item);
  };

  public InnerList = observer(() => {
    return (
      <>
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
  });

  public render() {
    return (
      <>
        <p>total submit: {this.props.listStore!.listLength}</p>
        <this.InnerList />
      </>
    );
  }
}
