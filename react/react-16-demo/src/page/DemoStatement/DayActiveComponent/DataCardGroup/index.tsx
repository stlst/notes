import _ from "lodash";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { USER_TYPE } from "../..";
import { useStore } from "../../../../storeHooks/useTodoList";
import { useFetchData } from "../../../DemoUseFetchData/UseFetchData";
import { DataCard } from "./DataCard";
import style from "./index.module.scss";
const UserTypeMapper = {
  SUPER_ADMIN: "HBJJHBX",
  ADMIN: "HBJJZQX",
  USER: "HBJJZSX",
  LOGIN_USER: "HBJJLCX"
};
export const DataCardGroup = observer(
  ({
    selectedUser,
    selectedDate
  }: {
    selectedUser: USER_TYPE;
    selectedDate: string;
  }) => {
    const fetchURL =
      !!selectedDate && !!selectedUser
        ? `/headline/quotations/${selectedDate}/${
            UserTypeMapper[selectedUser as keyof typeof UserTypeMapper]
          }`
        : "";
    console.log("re-render");
    const {
      todoStore: { number, list }
    } = useStore();
    const { data, isLoading, isError } = useFetchData(fetchURL);
    console.log(selectedUser, data, "isloading", isLoading, "iserror", isError);

    useEffect(() => {
      // autorun(() => console.log("autoRun", number));
      console.log("autoRun", number);

      // console.log("list", todoStore.list);
      // updateList(_.get(data, "[0].code"));
      // console.log("list", todoStore.list);
    }, [number]);

    if (isError) {
      return (
        <div className={style.errorContainer}>
          <p>出错啦</p>
        </div>
      );
    } else if (_.isEmpty(data) && !isLoading) {
      return (
        <div className={style.emptyContainer}>
          <p>暂无内容</p>
        </div>
      );
    } else {
      return (
        <div className={style.dataContainer}>
          {/* 展示三个DataCard */}
          <DataCard
            data={_.get(data, "[0].code") + String(list)}
            isLoading={isLoading}
          />
          <DataCard data={_.get(data, "[0].category")} isLoading={isLoading} />
          <DataCard data={_.get(data, "[0].shortName")} isLoading={isLoading} />
        </div>
      );
    }
  }
);
