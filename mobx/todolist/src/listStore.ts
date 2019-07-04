import { observable, action, computed, autorun, runInAction, flow } from "mobx";
import { configure } from "mobx";

configure({
  enforceActions: "always"
});

const fetchItemDetail = async (item: string) => {
  return await `${item} detail`;
};

export default class ListStore {
  @observable list: string[] = [];
  @computed
  get listLength() {
    return this.list.length;
  }

  constructor() {
    autorun(() => console.log("msg", this.listLength));
  }

  @action
  public addListItem = async (item: string) => {
    try {
      const itemDetail = await fetchItemDetail(item);
      // need to add runInAction after async actions
      runInAction(() => this.list.push(itemDetail));
      // this.list.push(itemDetail);
    } catch (error) {
      console.log("error", error);
    }
  };

  public addListItemWithGenerator = flow(function* addListItemWithGenerator(
    this: ListStore, // bind this to the class in generator function
    item: string
  ) {
    try {
      const itemDetail = yield fetchItemDetail(item);
      this.list.push(itemDetail);
    } catch (error) {
      console.log("error", error);
    }
  });

  @action
  public deleteListItem = (item: string) => {
    let index = this.list.findIndex(i => i === item);
    if (index !== -1) {
      this.list.splice(index, 1);
    }
  };
}
