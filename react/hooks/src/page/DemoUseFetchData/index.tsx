import React, { useState } from "react";
import { useFetchData } from "./UseFetchData";
import _ from "lodash";

const Detail = ({ date }: { date: string }) => {
  const { data, isLoading, isError } = useFetchData(
    !!date ? `/headline/quotations/${date}/HBJJHBX` : ""
  );
  if (isError) {
    return <div>Error!</div>;
  } else if (isLoading) {
    return <div>Loading!</div>;
  } else if (_.isEmpty(data)) {
    return <div>Empty!</div>;
  } else {
    return (
      <div>
        {_.map(data, item => {
          return <ul key={_.get(item, "code")}>{_.get(item, "shortName")}</ul>;
        })}
      </div>
    );
  }
};

export const DemoUseFetchData = () => {
  const dataArray = ["2018-12-26", "2018-12-27", "2019-12-31", "2019-12-32"];
  const [selectedDate, setSelectedDate] = useState(dataArray[0]);
  const onClickItem = (item: string) => () => {
    setSelectedDate(item);
  };

  return (
    <>
      {dataArray.map(item => {
        return (
          <ul
            key={item}
            onClick={onClickItem(item)}
            style={{ cursor: "pointer" }}
          >
            {item}
          </ul>
        );
      })}
      <div>
        <Detail date={selectedDate} />
      </div>
    </>
  );
};
