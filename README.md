# Thirumala Narasimha Poluru — Portfolio

A personal portfolio website with a Node.js/Express backend for collecting reviews and sending email notifications, backed by MongoDB Atlas.

---

## Project Structure

```
portfolio-project/
│
├── frontend/                   ← Static site (GitHub Pages)
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── main.js             ← Core frontend logic + review system
│   │   └── download.js         ← CV download animation
│   └── index.html
│
├── backend/                    ← Node.js API (Render)
│   ├── config/
│   │   ├── db.js               ← MongoDB Atlas connection
│   │   └── mailConfig.js       ← Nodemailer / Gmail SMTP
│   ├── controllers/
│   │   └── reviewController.js ← POST (save + email) & GET reviews
│   ├── models/
│   │   └── Review.js           ← Mongoose schema
│   ├── routes/
│   │   └── reviewRoutes.js     ← Express router
│   ├── middleware/
│   │   └── rateLimiter.js      ← Per-IP + global rate limits
│   ├── server.js               ← Entry point
│   ├── package.json
│   └── .env.example            ← Copy to .env and fill in values
│
└── README.md
```

---

## API Endpoints

| Method | Path               | Description                        |
|--------|--------------------|------------------------------------|
| POST   | `/api/review`      | Submit a review (saves to DB + email) |
| GET    | `/api/review`      | Fetch paginated reviews from DB    |
| GET    | `/api/review/health` | Route health check               |
| GET    | `/`                | Service health check               |

### POST `/api/review` — Request Body

```json
{
  "name":    "John Doe",
  "email":   "john@example.com",
  "rating":  9,
  "message": "Outstanding portfolio! Clean design and solid projects."
}
```

### GET `/api/review` — Query Params

| Param   | Default | Description              |
|---------|---------|--------------------------|
| `page`  | `1`     | Page number              |
| `limit` | `20`    | Reviews per page (max 50)|

---

## Local Development

### Prerequisites

- Node.js ≥ 18
- A MongoDB Atlas account (free tier is fine)
- A Gmail account with 2FA + an App Password

### 1 — Clone & install

```bash
git clone https://github.com/thiru7869/your-portfolio.git
cd portfolio-project/backend
npm install
```

### 2 — Configure environment

```bash
cp .env.example .env
# Edit .env with your real values (MONGO_URI, EMAIL_USER, EMAIL_PASS, etc.)
```

### 3 — Start the server

```bash
npm run dev   # uses nodemon, auto-restarts on file changes
# or
npm start     # plain node
```

### 4 — Run the frontend

Open `frontend/index.html` with VS Code Live Server (port 5500) or any static server.

---

## Deployment — Render (Backend)

### Step 1: Create a Render Web Service

1. Push the `backend/` folder to a GitHub repo (or the whole monorepo).
2. Go to [render.com](https://render.com) → **New** → **Web Service**.
3. Connect your GitHub repo.
4. Set the configuration:

   | Field             | Value                          |
   |-------------------|--------------------------------|
   | **Root Directory**| `backend`                      |
   | **Build Command** | `npm install`                  |
   | **Start Command** | `npm start`                    |
   | **Node Version**  | `18` (set in Environment)      |

### Step 2: Add Environment Variables

In the Render dashboard → **Environment** → add each variable from `.env.example`:

```
PORT             = 10000          (Render assigns this automatically)
NODE_ENV         = production
MONGO_URI        = mongodb+srv://...
EMAIL_USER       = your@gmail.com
EMAIL_PASS       = your-app-password
EMAIL_RECIPIENT  = your@gmail.com
FRONTEND_URL     = https://thiru7869.github.io
```

> **PORT**: Render injects `PORT` automatically. Your server reads `process.env.PORT || 5000` so it works in both environments.

### Step 3: Update BACKEND_URL in main.js

After deployment, copy your Render service URL (e.g. `https://portfolio-backend-xxxx.onrender.com`) and update line ~11 in `frontend/js/main.js`:

```js
: 'https://portfolio-backend-xxxx.onrender.com'; // ← replace this
```

Then push the change to GitHub Pages.

---

## Deployment — GitHub Pages (Frontend)

```bash
# From the repo root
git subtree push --prefix frontend origin gh-pages
```

Or configure GitHub Pages in repo Settings → Pages → Source: `gh-pages` branch.

---

## MongoDB Atlas Setup

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a database user with read/write permissions.
3. Whitelist `0.0.0.0/0` in Network Access (Render IPs change dynamically).
4. Copy the connection string and set it as `MONGO_URI` in `.env`.

> The database `portfolio_reviews` and collection `reviews` are created automatically by Mongoose on first write.

---

## Security Notes

- Rate limited: **5 reviews / IP / hour** (backend) + client-side 24 h localStorage lock
- All user input sanitized with `validator.js` before saving
- IP addresses stored in MongoDB for abuse detection, never exposed via API
- CORS whitelist restricts API access to known frontend origins
- `.env` is in `.gitignore` — never committed

---

## Gmail App Password Setup

1. Enable 2-Step Verification on your Google account.
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords).
3. Create an App Password for **Mail** → **Other (Custom name)** → `Portfolio Backend`.
4. Copy the 16-character password (no spaces) into `EMAIL_PASS` in `.env`.
