import React from "react";

interface IState {
  isVisible: boolean;
}

class Counter extends React.Component {
  public componentDidMount() {
    console.log("in cdm");
  }
  public componentWillUnmount() {
    console.log("in will um");
  }
  public render() {
    return <p>counter</p>;
  }
}

export default class UseEffectClassDemo extends React.Component<any, IState> {
  public state: IState = { isVisible: true };
  public componentDidMount() {
    console.log("in componentDidMount");
  }

  public componentWillUnmount() {
    console.log("in  componentWillUnmount");
  }

  public render() {
    return (
      <>
        {this.state.isVisible && <Counter />}
        <button
          onClick={() => {
            this.setState({ isVisible: !this.state.isVisible });
          }}
        >
          button
        </button>
      </>
    );
  }
}
