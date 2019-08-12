# [How to fetch data with React Hooks?](https://www.robinwieruch.de/react-hooks-fetch-data/)

## useEffect 的使用

- 可以写一个 custom data fetching hook： 包括 loading, error, data。它接受初始 url 和初始 data

```js
const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  const doFetch = url => {
    setUrl(url);
  };

  return { data, isLoading, isError, doFetch };
};
```

## useReducer 的使用

```js
const dataFetchReducer = (state, action) => {
    switch (action.type) {
    case 'FETCH_INIT':
      return { ...state };
    case 'FETCH_SUCCESS':
      return { ...state };
    case 'FETCH_FAILURE':
      return { ...state };
    default:
      throw new Error();
  }
};

const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });
      try {
        const result = await axios(url);

        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE' });
      }
    };

    fetchData();
  }, [url]);
    const doFetch = () => {}
    return { …state, doFetch };
  ...
};

```

## Abort Data Fetching in Effect Hook 停止 useEffect 的监听

```js
useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
        if (!didCancel) {
            // fetch data
        }
 } catch (error) {
    if (!didCancel) {
        return () => {
            didCancel = true;
        }
    }
    }
})

```
