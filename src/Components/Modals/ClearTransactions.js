import React from "react";
import { Button, Modal } from "antd";

function ClearTransactions({
  isClearModalVisible,
  handleClearTransCancel,
  clearAmmount,
}) {
  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Add Expense"
      open={isClearModalVisible}
      onCancel={handleClearTransCancel}
      footer={null}
    >
      <p>Want to clear transactions?</p>
      <Button
        onClick={clearAmmount}
        className="btn btn-blue"
        type="primary"
        htmlType="submit"
      >
        Clear Transactions
      </Button>
    </Modal>
  );
}

export default ClearTransactions;
