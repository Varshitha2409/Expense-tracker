import { useEffect, useState } from "react";
import { getExpenses } from "../services/api";
import ExpenseCard from "./ExpenseCard";

export default function ExpenseList({ refresh, onRefresh }) {
  const [expenses, setExpenses] = useState([]);

  const loadExpenses = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    getExpenses()
      .then((res) => setExpenses(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadExpenses();
  }, [refresh]);

  const handleCardRefresh = () => {
    loadExpenses();
    if (onRefresh) onRefresh();
  };

  return (
    <div className="expense-list">
      <h2 className="section-title">All Expenses</h2>
      {expenses.length === 0 ? (
        <p className="empty">No expenses added yet</p>
      ) : (
        expenses.map((exp) => (
          <ExpenseCard
            key={exp._id}
            expense={exp}
            onRefresh={handleCardRefresh}
          />
        ))
      )}
    </div>
  );
}
