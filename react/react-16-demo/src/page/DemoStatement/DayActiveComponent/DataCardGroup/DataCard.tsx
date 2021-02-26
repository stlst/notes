import React from "react";
export const DataCard = ({
  data,
  isLoading
}: {
  data: string;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <p>loading</p>;
  } else {
    return <p>{data}</p>;
  }
};
