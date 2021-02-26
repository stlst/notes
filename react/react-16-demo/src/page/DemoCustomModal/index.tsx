import React, { useState } from "react";
import { CollectPlanModal } from "./CollectPlanModal";
import { MODAL_TYPE } from "./useCollectPlanModal";
export const DemoCustomModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const modalType = MODAL_TYPE.ADD;
  return (
    <div style={{ width: 300, height: 300 }}>
      <button onClick={() => setModalVisible(true)}>show modal</button>
      {modalVisible && (
        <CollectPlanModal
          setModalVisible={setModalVisible}
          modalType={modalType}
        />
      )}
      {/* <CollectPlanList /> */}
    </div>
  );
};
