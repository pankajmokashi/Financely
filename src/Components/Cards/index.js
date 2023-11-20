import React from "react";
import "./styles.css";
import Button from "../Button";
import { Card, Row } from "antd";

function Cards({
  showClearModal,
  showExpenseModal,
  showIncomeModal,
  currentBalance,
  income,
  expenses,
}) {

  return (
    <div>
      <Row className="my-row">
        <Card bordered={true} className="my-card">
          <h2>Current Balance</h2>
          <p>${currentBalance}</p>
          <Button text={"Reset Balance"} blue={true} onClick={showClearModal}/>
        </Card>
        <Card bordered={true} className="my-card">
          <h2>Total Income</h2>
          <p>${income}</p>
          <Button text={"Add Income"} blue={true} onClick={showIncomeModal} />
        </Card>
        <Card bordered={true} className="my-card">
          <h2>Total Expenses</h2>
          <p>${expenses}</p>
          <Button
            text={"Add Expenses"}
            blue={true}
            onClick={showExpenseModal}
          />
        </Card>
      </Row>
    </div>
  );
}

export default Cards;
