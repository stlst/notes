import axios from "axios";
import { useEffect, useState } from "react";
export const useFetchData = (url: string) => {
  const [data, setData] = useState((undefined as unknown) as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    console.log("in useFetchData");
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      await axios
        .get(url)
        .then(res => {
          setData(res.data);
          console.log("data", res.data);
        })
        .catch(e => {
          console.log("error");
          setIsError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    if (!!url) {
      fetchData();
    }
  }, [url]);

  return { data, isLoading, isError, setIsLoading, setData };
};
