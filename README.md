# Expense Tracker — Backend

Node.js + Express + MongoDB REST API with JWT authentication.

## Tech Stack
- Node.js / Express
- MongoDB Atlas + Mongoose
- JWT (jsonwebtoken) + bcryptjs
- dotenv, cors

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/expense-tracker
JWT_SECRET=your_long_random_secret
ALLOWED_ORIGINS=http://localhost:5173,https://your-frontend.vercel.app
```

## API Endpoints

### Auth
| Method | Path | Description |
|--------|------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login and get token |

### Expenses (🔒 requires Bearer token)
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/expenses | Get all expenses |
| POST | /api/expenses | Add expense |
| PUT | /api/expenses/:id | Edit expense |
| DELETE | /api/expenses/:id | Delete expense |
| GET | /api/expenses/summary/category | Category totals |
| GET | /api/expenses/summary/monthly | Monthly totals |

### User (🔒)
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/user/profile | Get user profile |
| PUT | /api/user/salary | Update salary |
| PUT | /api/user/budget | Update category budget |

### Reports (🔒)
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/reports/monthly?month=M&year=Y | Monthly report |

### Insights (🔒)
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/insights | Smart spending insights |

## Running Locally

```bash
npm install
# create .env from .env.example
npm run dev
```

## Deploying to Render

1. Push code to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Connect your GitHub repo
4. Set:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add all environment variables from `.env.example` in the Render dashboard
6. Deploy — your service URL will be `https://<service-name>.onrender.com`
