import { observable, action } from "mobx";
export default class ToDoStore {
  @observable list = ["121", "334"] as string[];
  @observable flag = false;
  @observable number = 0;
  @action
  public updateList = (item: string) => {
    this.list.push(item);
  };
}
