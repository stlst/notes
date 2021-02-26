import { renderHook, act } from "@testing-library/react-hooks";
import { useFetchData } from "./UseFetchData";
it("should fetch data correctly when url is valid using @testing-library/react-hooks", async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useFetchData("http://baidu.com")
  );
  // testing initial values
  expect(result.current.data).toEqual(undefined);
  expect(result.current.isError).toBe(false);
  expect(result.current.isLoading).toBe(true);
  await waitForNextUpdate();
  // expect(result.current.data).toEqual(
  //   '<html>\n<meta http-equiv="refresh" content="0;url=http://www.baidu.com/">\n</html>'
  // );
  expect(result.current.data).not.toEqual(undefined);
  expect(result.current.isLoading).toBe(false);
  expect(result.current.isError).toBe(false);
});

it("should have error when url is invalid using @testing-library/react-hooks", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useFetchData("h"));
  expect(result.current.data).toEqual(undefined);
  expect(result.current.isError).toBe(false);
  expect(result.current.isLoading).toBe(true);
  await waitForNextUpdate();
  expect(result.current.data).toEqual(undefined);
  expect(result.current.isLoading).toBe(false);
  expect(result.current.isError).toBe(true);
});

it("should set isLoading=true when setIsLoading(true)", async () => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useFetchData("http://baidu.com")
  );
  await waitForNextUpdate();

  act(() => result.current.setData("hello"));
  expect(result.current.data).toBe("hello");
});
