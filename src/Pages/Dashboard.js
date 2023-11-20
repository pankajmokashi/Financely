import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Cards from "../Components/Cards";
import AddExpense from "../Components/Modals/AddExpense";
import AddIncome from "../Components/Modals/AddIncome";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { auth, db, firestore, deleteDoc } from "../firebase";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import TransactionsTable from "../Components/TransactionsTable";
import ClearTransactions from "../Components/Modals/ClearTransactions";
import Spline from "../Components/Charts/Spline";
import PieChart from "../Components/Charts/PieChart";

function Dashboard() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isClearModalVisible, setIsClearModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const showClearModal = () => {
    setIsClearModalVisible(true);
  };
  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };
  const handleClearTransCancel = () => {
    setIsClearModalVisible(false);
  };

  useEffect(() => {
    async function fetchTransactions() {
      setLoading(true);
      if (user) {
        const q = query(collection(db, `users/${user.uid}/transactions`));
        const querySnapshot = await getDocs(q);
        let transactionsArray = [];
        querySnapshot.forEach((doc) => {
          transactionsArray.push(doc.data());
        });
        setTransactions(transactionsArray);
      }
      setLoading(false);
    }
    fetchTransactions();
  }, [user]);

  useEffect(() => {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expenseTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpenses(expenseTotal);
    setCurrentBalance(incomeTotal - expenseTotal);
  }, [transactions]);

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
    }
    setLoading(false);
  }

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };

    setTransactions([...transactions, newTransaction]);
    setIsExpenseModalVisible(false);
    setIsIncomeModalVisible(false);
    addTransaction(newTransaction);
    calculateBalance();
  };

  async function addTransaction(transaction, many) {
    try {
      await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      if (!many) toast.success("Transactin Added!");
      let newArr = transaction;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
    } catch (e) {
      // if (!many) toast.error("Coudn't add transaction!");
    }
  }

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expenseTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpenses(expenseTotal);
    setCurrentBalance(incomeTotal - expenseTotal);
  };

  async function deleteCurrentField(id) {
    const docRef = doc(firestore, `users/${user.uid}/transactions`, id);
    deleteDoc(docRef)
      .then(() => {
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  function clearAmmount() {
    onSnapshot(
      query(collection(db, `users/${user.uid}/transactions`)),
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          deleteCurrentField(doc.id);
        });
        toast.success("Transactions Deleted!")
        fetchTransactions();
      },
      (error) => {
        console.error("Error fetching podcasts:", error);
      }
    );
    setIsClearModalVisible(false);
  }

  return (
    <div>
      <Header />
      {loading ? (
        <p>Loading....</p>
      ) : (
        <>
          <Cards
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
            showClearModal={showClearModal}
            currentBalance={currentBalance}
            income={income}
            expenses={expenses}
          />
          <ClearTransactions
            isClearModalVisible={isClearModalVisible}
            handleClearTransCancel={handleClearTransCancel}
            clearAmmount={clearAmmount}
          />
          <AddExpense
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncome
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          <Spline transactions={transactions}/>
          <PieChart income={income} expenses={expenses} balance={currentBalance} transactions={transactions}/>
          <TransactionsTable
            transactions={transactions}
            addTransaction={addTransaction}
            fetchTransactions={fetchTransactions}
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;
