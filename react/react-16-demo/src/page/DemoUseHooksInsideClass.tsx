import React, { useCallback, useState } from "react";
// export const DemoUseCallback = () => {
//   return (
//     <>
//       <p>hello</p>
//     </>
//   );
// };
interface ICompProps {
  // list: Array<Pick<ICSFCProps, "label" | "value">>;
  // onSelectChange(idx: number, value: any): void;
}
interface ICSFCProps {
  idx: number;
  value: any;
  label: any;
}

interface IState {
  index: number;
  label: number;
}

export class DemoUseHooksInsideClass extends React.Component<
  ICompProps,
  IState
> {
  public state: IState = { index: 0, label: 0 };
  SFC = ({ idx, value, label }: ICSFCProps) => {
    // const { onSelectChange } = this.props;
    // 通过hooks去缓存函数，而非每次都去创建一个新的函数
    const onChange = useCallback(() => {
      // 直接调用class接收到的props；
      // onSelectChange(idx, value);

      this.setState({ index: idx }, () => {
        console.log("log", idx, this.state.index);
      });
    }, [idx, value]);
    return <input onChange={onChange} />;
  };
  render() {
    const list = [{ label: "1", value: "11" }, { label: "2", value: "22" }];
    return (
      <div>
        {list.map((it, idx) => {
          return <this.SFC key={idx} idx={idx} {...it} />;
        })}
      </div>
    );
  }
}
