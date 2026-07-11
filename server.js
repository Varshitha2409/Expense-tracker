require("dotenv").config();


const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// -------- MIDDLEWARE (ORDER IS VERY IMPORTANT) --------
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, Postman, mobile apps)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle OPTIONS preflight for all routes
app.options("*", cors());

app.use(express.json()); // <-- THIS IS CRITICAL

// -------- DATABASE CONNECTION --------
connectDB();

// -------- TEST ROUTE --------
app.get("/", (req, res) => {
  res.json({ status: "Backend + MongoDB running successfully" });
});

// -------- ROUTES --------

// Auth routes
app.use("/api/auth", require("./routes/authRoutes"));

// Expense routes
app.use("/api/expenses", require("./routes/expenseRoutes"));

// Insight routes
app.use("/api/insights", require("./routes/insightRoutes"));

// ✅ Report routes (ADDED AS REQUESTED)
const reportRoutes = require("./routes/reportRoutes");
app.use("/api/reports", reportRoutes);

// User routes (Profile, Salary, Budgets)
app.use("/api/user", require("./routes/userRoutes"));

// -------- START SERVER --------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
