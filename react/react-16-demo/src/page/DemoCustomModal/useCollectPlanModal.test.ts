import { renderHook, act } from "@testing-library/react-hooks";
// import { act } from "react-test-renderer";
import moment, { Moment } from "moment";
// import { act } from "react-dom/test-utils";
import useCollectPlanModal, { MODAL_TYPE } from "./useCollectPlanModal";
describe("test useCollectPlanModal", () => {
  it("should test onCloseModal", () => {
    const setModalVisible = jest.fn();
    const modalType = MODAL_TYPE.ADD;
    const modalId = "1";
    const { result } = renderHook(() =>
      useCollectPlanModal({ setModalVisible, modalId, modalType })
    );

    act(result.current.onCloseModal);

    expect(result.current.startDate).toEqual((undefined as unknown) as Moment);
    expect(result.current.endDate).toEqual((undefined as unknown) as Moment);
    expect(setModalVisible).toHaveBeenCalledWith(false);
  });

  it("should change startDate and endDate when onClickModalOk is called", () => {
    const setModalVisible = jest.fn();
    const modalType = MODAL_TYPE.ADD;
    const modalId = "1";
    const newStartDate = moment("20121212");
    const newEndDate = moment("20121213");

    const { result } = renderHook(() =>
      useCollectPlanModal({
        setModalVisible,
        modalId,
        modalType
      })
    );

    // 这里不能事先把result.current.startDate取出来，否则数据将一直不会更新
    expect(result.current.disableOkButton).toEqual(true);
    expect(result.current.startDate).toEqual(undefined);
    expect(result.current.endDate).toEqual(undefined);

    act(() => {
      result.current.onChangePicker([newStartDate, newEndDate]);
    });

    expect(result.current.startDate).toEqual(newStartDate);
    expect(result.current.endDate).toEqual(newEndDate);
    expect(result.current.disableOkButton).toEqual(false);
  });

  it.only("should test post method when onClickOK", async () => {
    const setModalVisible = jest.fn();
    const modalType = MODAL_TYPE.ADD;
    const modalId = "1";
    const newStartDate = moment("20121212");
    const newEndDate = moment("20121213");
    const axios = require("axios");
    const mockPost = jest.fn().mockResolvedValue({ data: "resolve data" });
    axios.post = mockPost;

    const { result, waitForNextUpdate } = renderHook(() =>
      useCollectPlanModal({
        setModalVisible,
        modalId,
        modalType
        //   initStartDate,
        //   initEndDate
      })
    );

    expect(result.current.startDate).toEqual(undefined);
    expect(result.current.endDate).toEqual(undefined);
    expect(result.current.isLoading).toEqual(false);
    act(() => {
      result.current.onChangePicker([newStartDate, newEndDate]);
    });
    // waitForNextUpdate();

    expect(result.current.startDate).toEqual(newStartDate);
    expect(result.current.endDate).toEqual(newEndDate);

    await act(async () => {
      result.current.onClickModalOk();
      await waitForNextUpdate();
    });

    // await act(async () => await waitForNextUpdate());
    // await act(() => waitForNextUpdate());

    expect(result.current.isLoading).toEqual(true);

    //   onClickModalOk();
    //   waitForNextUpdate();

    //   expect(isLoading).toEqual(true);
    //   expect(mockPost).toHaveBeenCalledWith("/collectPlan");
  });
});
