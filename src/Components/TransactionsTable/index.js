import { Radio, Select, Table } from "antd";
import React, { useState } from "react";
import "./styles.css";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";
import { IoSearchOutline } from "react-icons/io5";

function TransactionsTable({
  transactions,
  addTransaction,
  fetchTransactions,
}) {
  const { Option } = Select;
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  let filteredTransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLocaleLowerCase()) &&
      item.type.includes(typeFilter)
  );

  if (filteredTransactions.length > 0) {
    for (let i = 0; i < filteredTransactions.length; i++) {
      filteredTransactions[i].key = i;
    }
  }

  function exportToCsv() {
    var csv = unparse({
      fields: ["type", "name", "amount", "tag", "date"],
      data: transactions,
    });
    const data = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const csvURL = URL.createObjectURL(data);
    const tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.download = "transactions.csv";
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }
  function importFromCsv(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          for (const transaction of results.data) {
            const newTransaction = {
              ...transaction,
              amount: parseFloat(transaction.amount),
            };
            await addTransaction(newTransaction, true);
          }
        },
      });
      toast.success("All Transactions Added!");
      fetchTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
  }

  let sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  return (
    <div className="table">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          alignItems: "cenrter",
          marginBottom: "1rem",
        }}
      >
        <div className="input-flex">
          {/* <img src="" width={16} /> */}
          <IoSearchOutline
            width={16}
            style={{ color: "#a3a3a3", cursor: "pointer" }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name"
          />
        </div>
        <Select
          className="select-input"
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>
      <div className="my-table">
        <div className="table-nav">
          <div>
            <h2>My Transactions</h2>
          </div>
          <Radio.Group
            className="input-radio"
            onChange={(e) => setSortKey(e.target.value)}
            value={sortKey}
          >
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort by Date</Radio.Button>
            <Radio.Button value="amount">Sort by Ammount</Radio.Button>
          </Radio.Group>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <button className="btn" onClick={exportToCsv}>
              Export To CSV
            </button>
            <label htmlFor="file-csv" className="btn btn-blue">
              Import From CSV
            </label>
            <input
              onChange={importFromCsv}
              id="file-csv"
              type="file"
              accept=".csv"
              required
              style={{ display: "none" }}
            ></input>
          </div>
        </div>
        <Table
          dataSource={sortedTransactions}
          columns={columns}
          className="table-data"
        />
      </div>
    </div>
  );
}

export default TransactionsTable;
