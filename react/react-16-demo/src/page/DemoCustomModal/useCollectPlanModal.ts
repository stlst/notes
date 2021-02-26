import { message } from "antd";
import _ from "lodash";
import { Moment } from "moment";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export const defaultDateValue = (undefined as unknown) as Moment;
export enum MODAL_TYPE {
  ADD = "添加发布计划",
  EDIT = "编辑发布计划"
}
interface IProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  //   onSuccessSubmit: () => void;
  modalType: MODAL_TYPE;
  modalId: string;
  initStartDate?: Moment;
  initEndDate?: Moment;
}

const useCollectPlanModal = ({
  setModalVisible,
  //   onSuccessSubmit,
  modalType,
  modalId,
  initStartDate = defaultDateValue,
  initEndDate = defaultDateValue
}: IProps) => {
  const [startDate, setStartDate] = useState(initStartDate);
  const [endDate, setEndDate] = useState(initEndDate);
  const [disableOkButton, setDisableOkButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onCloseModal = useCallback(() => {
    console.log("call onCloseModal");
    setStartDate(defaultDateValue);
    setEndDate(defaultDateValue);
    setModalVisible(false);
  }, [setStartDate, setEndDate, setModalVisible]);

  const onClickModalOk = () => {
    const successCallback = () => {
      message.success(modalType === MODAL_TYPE.ADD ? "添加成功" : "编辑成功");
      onCloseModal();
      setIsLoading(false);
      //   onSuccessSubmit();
    };
    const errorCallback = () => {
      setIsLoading(false);
    };
    if (
      _.isEqual(startDate, initStartDate) &&
      _.isEqual(endDate, initEndDate)
    ) {
      console.log("in equal");
      //   message.info("您并没有修改发布计划时间");
    } else if (modalType === MODAL_TYPE.ADD) {
      console.log("before setIsLoading");
      setIsLoading(true);
      axios
        .post("/collectPlan", {
          startDate: startDate!.format("YYYY-MM-DD"),
          endDate: endDate!.format("YYYY-MM-DD")
        })
        .then(res => {
          console.log("data", res.data);
          successCallback();
        })
        .catch(e => {
          console.log("error");
          errorCallback();
        })
        .finally(() => {
          console.log("in finally");
          setIsLoading(false);
        });
    } else if (modalType === MODAL_TYPE.EDIT) {
      setIsLoading(true);

      axios
        .put("/collectPlan", {
          id: modalId,
          startDate: startDate!.format("YYYY-MM-DD"),
          endDate: endDate!.format("YYYY-MM-DD")
        })
        .then(res => successCallback())
        .catch(err => errorCallback());
    }
  };

  const onChangePicker = useCallback(
    (date = []) => {
      //   console.log("data", date);
      if (date.length === 2) {
        console.log("in if");
        setStartDate(date[0]);
        setEndDate(date[1]);
      } else {
        console.log("in else");
        setStartDate(defaultDateValue);
        setEndDate(defaultDateValue);
      }
    },
    [setStartDate, setEndDate]
  );

  useEffect(() => {
    if (!_.isEmpty(startDate) && !_.isEmpty(endDate)) {
      setDisableOkButton(false);
    } else {
      setDisableOkButton(true);
    }
  }, [setDisableOkButton, startDate, endDate]);

  return {
    isLoading,
    onCloseModal,
    onClickModalOk,
    onChangePicker,
    disableOkButton,
    startDate,
    endDate
  };
};
export default useCollectPlanModal;
