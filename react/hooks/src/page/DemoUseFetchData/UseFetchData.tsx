import axios from "axios";
import { useEffect, useState } from "react";
export const useFetchData = (url: string) => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      await axios
        .get(url)
        .then(res => {
          setData(res.data);
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

  return { data, isLoading, isError };
};
