import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://experience-u2rf.onrender.com/api";

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ── Expenses ────────────────────────────────────────────────
export const getExpenses = () => API.get("/expenses");
export const addExpense = (data) => API.post("/expenses", data);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);
export const editExpense = (id, data) => API.put(`/expenses/${id}`, data);

// ── Monthly report ──────────────────────────────────────────
export const getMonthlyReport = async (month, year) => {
  const res = await API.get(`/reports/monthly?month=${month}&year=${year}`);
  return res.data;
};

// ── User ────────────────────────────────────────────────────
export const updateSalary = (salary) => API.put("/user/salary", { salary });
export const updateBudget = (category, limit) => API.put("/user/budget", { category, limit });
export const getUserProfile = () => API.get("/user/profile");

// ── Statistics & Insights ───────────────────────────────────
export const getInsights = () => API.get("/insights");
export const getCategorySummary = () => API.get("/expenses/summary/category");
export const getMonthlySummary = () => API.get("/expenses/summary/monthly");
