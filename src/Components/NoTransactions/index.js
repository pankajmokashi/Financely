import React from 'react';
import { BiCreditCard } from "react-icons/bi";


function NoTransactions() {
  return (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flexDirection: "column",
            marginBottom: "2rem",
        }}
    >
        {/* <img src="" style={{ width: "400px", margin: "4rem" }}/> */}
        <BiCreditCard style={{ fontSize: "400px", color: "#645555", margin: "2rem" }} />
        <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
            You have No Transactions Currently
        </p>
    </div>
  )
}

export default NoTransactions;