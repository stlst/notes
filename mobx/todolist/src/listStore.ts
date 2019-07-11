import { action, autorun, computed, configure, flow, observable } from "mobx";

configure({
  enforceActions: "always"
});

export default class ListStore {
  @observable list: string[] = [];
  @computed get listLength() {
    return this.list.length;
  }

  // constructor() {
  //   autorun(() => console.log("using autorun", this.listLength));
  // }

  private fetchItemDetail = async (item: string) => {
    const itemDetail = await `${item} detail`;
    return itemDetail;
  };

  @action
  public addListItemWithAction = (item: string) => {
    this.list.push(item);
    console.log("using action: ", this.list);
  };

  @action
  public addListItemWithAsyncAction = async (item: string) => {
    try {
      const itemDetail = await this.fetchItemDetail(item);
      // need to add runInAction after async actions
      this.list.push(itemDetail);
      // action("inlineAction", () => {
      //   this.list.push(itemDetail);
      // })();
      // runInAction(() => this.list.push(itemDetail));
      console.log("using async action: ", this.list);
    } catch (error) {
      console.log("error", error);
    }
  };

  public addListItemWithGenerator = flow(function* addListItemWithGenerator(
    this: ListStore, // bind this to the class in generator function
    item: string
  ) {
    try {
      const itemDetail = yield this.fetchItemDetail(item);
      this.list.push(itemDetail);
      console.log("using generator: ", this.list);
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
