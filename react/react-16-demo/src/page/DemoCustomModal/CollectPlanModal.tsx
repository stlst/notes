import { DatePicker, Modal } from "antd";
import _ from "lodash";
import React from "react";
import useCollectPlanModal from "./useCollectPlanModal";
const { RangePicker } = DatePicker;
const dateFormat = "YYYY年MM月DD日";
export const CollectPlanModal = (props: any) => {
  const {
    onCloseModal,
    onClickModalOk,
    onChangePicker,
    disableOkButton,
    startDate,
    endDate,
    isLoading
  } = useCollectPlanModal(props);
  return (
    <Modal
      title={props.modalType}
      onOk={_.debounce(onClickModalOk, 300)}
      confirmLoading={isLoading}
      visible={true}
      onCancel={onCloseModal}
      okButtonProps={{ disabled: disableOkButton }}
      maskClosable={false}
    >
      <p>请选择发布时间</p>
      <RangePicker
        onChange={onChangePicker}
        format={dateFormat}
        value={[startDate, endDate]}
      />
    </Modal>
  );
};
