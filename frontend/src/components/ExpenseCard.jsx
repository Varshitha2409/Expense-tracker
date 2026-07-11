import { useState } from "react";
import { deleteExpense, editExpense } from "../services/api";

export default function ExpenseCard({ expense, onRefresh }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    date: expense.date ? expense.date.slice(0, 10) : "",
  });
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${expense.title}"?`)) return;
    try {
      await deleteExpense(expense._id);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete expense");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await editExpense(expense._id, form);
      setEditing(false);
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Edit failed", err);
      alert("Failed to update expense");
    } finally {
      setLoading(false);
    }
  };

  if (editing) {
    return (
      <div className="expense-card editing">
        <form onSubmit={handleEdit} className="edit-form">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Title"
            required
          />
          <input
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            placeholder="Amount"
            required
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {[
              "Food","Travel","Rent","Utilities","Shopping","Education",
              "Medical","Entertainment","Transportation","Groceries",
              "Personal Care","Health & Fitness","Subscriptions",
              "Bills & Payments","Others"
            ].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
          <div className="card-actions">
            <button type="submit" disabled={loading} className="btn-save">
              {loading ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="btn-cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="expense-card">
      <div className="card-info">
        <h3>{expense.title}</h3>
        <p className="category">{expense.category}</p>
        <p className="date">{expense.date ? new Date(expense.date).toLocaleDateString() : ""}</p>
      </div>
      <div className="card-right">
        <div className="amount">₹{expense.amount}</div>
        <div className="card-actions">
          <button
            className="btn-edit"
            onClick={() => setEditing(true)}
            title="Edit"
          >
            ✏️
          </button>
          <button
            className="btn-delete"
            onClick={handleDelete}
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
