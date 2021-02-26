import React, { useState } from "react";
import { USER_TYPE } from "..";
import { DataCardGroup } from "./DataCardGroup";
import { DataChart } from "./DataChart";
import { SelectDate } from "./SelectDate";
export const DayActiveComponent = ({
  selectedUser
}: {
  selectedUser: USER_TYPE;
}) => {
  const [selectedDate, setSelectedDate] = useState("2018-10-10");
  const onChange = (e: any) => {
    setSelectedDate(e);
  };
  // console.log("in DayActiveComponent");

  return (
    <>
      <SelectDate onChange={onChange} />
      <DataCardGroup selectedDate={selectedDate} selectedUser={selectedUser} />
      <DataChart selectedDate={selectedUser} selectedUser={selectedUser} />
    </>
  );
};
