# Expense Tracker — Frontend

React 19 + Vite SPA for the Expense Tracker app.

## Tech Stack
- React 19 + React Router v7
- Vite 7
- Axios
- Chart.js / Recharts
- jsPDF + html2canvas (PDF export)
- SheetJS xlsx (Excel export)

## Environment Variables

Create a `.env` file (copy from `.env.example`):

```
VITE_API_URL=https://your-backend.onrender.com/api
```

For local development:
```
VITE_API_URL=http://localhost:5000/api
```

## Running Locally

```bash
npm install
# create .env from .env.example
npm run dev
```

## Building for Production

```bash
npm run build
# Output is in dist/
```

## Deploying to Vercel

1. Push code to GitHub
2. Import the repo on [Vercel](https://vercel.com)
3. Set the **Root Directory** to the frontend folder if needed
4. Add environment variable:
   - `VITE_API_URL` = `https://your-backend.onrender.com/api`
5. Deploy — Vercel auto-detects Vite and builds correctly
6. The `vercel.json` included handles SPA routing (all paths → `index.html`)

## Features
- 🔐 JWT Authentication (Register / Login)
- ➕ Add Expense (with category, date, optional budget)
- ✏️ Edit Expense
- 🗑️ Delete Expense
- 📊 Category Pie Chart
- 📈 Monthly Bar Chart
- 🧠 Smart Insights (with voice readout)
- 💰 Smart Budget tracking per category
- 📋 Monthly Report with PDF + Excel export
- 🌍 Google Translate integration
