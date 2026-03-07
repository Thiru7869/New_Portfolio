# Thirumala Narasimha Poluru — Full-Stack Portfolio

![Node](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express.js-Backend-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![Render](https://img.shields.io/badge/Deployment-Render-blue)
![License](https://img.shields.io/badge/License-MIT-orange)

A **full-stack personal portfolio website** built with **Node.js, Express, MongoDB Atlas, and a modern frontend**.
The backend provides APIs for storing user reviews and sending email notifications, while the frontend delivers a clean and responsive portfolio interface.

---

# Live Demo

Frontend Website
https://new-portfolio-1-ba0l.onrender.com

Backend API
https://new-portfolio-a8mf.onrender.com

---

# Features

• Responsive portfolio website
• Review submission system
• MongoDB database storage
• Email notification system
• Rate-limited API for spam protection
• Secure environment variable configuration
• Full deployment on Render cloud platform

---

# Project Architecture

```text
User Browser
     │
     ▼
Frontend (HTML / CSS / JS)
     │
     ▼
Node.js Express API
     │
     ▼
MongoDB Atlas Database
     │
     ▼
Email Notification (Gmail SMTP)
```

---

# Project Structure

```text
portfolio-project/
│
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── main.js
│   │   └── download.js
│   └── index.html
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── mailConfig.js
│   ├── controllers/
│   │   └── reviewController.js
│   ├── models/
│   │   └── Review.js
│   ├── routes/
│   │   └── reviewRoutes.js
│   ├── middleware/
│   │   └── rateLimiter.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

---

# API Endpoints

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| POST   | /api/review        | Submit review          |
| GET    | /api/review        | Fetch reviews          |
| GET    | /api/review/health | API health check       |
| GET    | /                  | Backend service status |

---

# Example Review Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "rating": 9,
  "message": "Excellent portfolio design and projects."
}
```

---

# Local Development Setup

## Clone Repository

```bash
git clone https://github.com/Thiru7869/New_Portfolio.git
cd portfolio-project/backend
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create `.env` file inside backend folder.

Example:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=your_email@gmail.com
FRONTEND_URL=http://localhost:5500
```

## Run Backend

```bash
npm run dev
```

or

```bash
npm start
```

Server runs on:

```
http://localhost:5000
```

---

# Deployment

## Backend Deployment (Render Web Service)

Root Directory

```
backend
```

Build Command

```
npm install
```

Start Command

```
node server.js
```

Environment Variables

```
PORT
NODE_ENV
MONGO_URI
EMAIL_SERVICE
EMAIL_USER
EMAIL_PASS
ADMIN_EMAIL
FRONTEND_URL
```

---

## Frontend Deployment (Render Static Site)

Root Directory

```
frontend
```

Build Command

```
(empty)
```

Publish Directory

```
.
```

---

# MongoDB Atlas Setup

1. Create free cluster
2. Create database user
3. Allow network access:

```
0.0.0.0/0
```

4. Copy connection string to `MONGO_URI`.

---

# Security Features

• API rate limiting
• Input validation using validator.js
• Environment variable protection
• MongoDB Atlas cloud security
• CORS protection

---

# Technologies Used

Frontend
HTML
CSS
JavaScript

Backend
Node.js
Express.js

Database
MongoDB Atlas

Deployment
Render Cloud Platform

---

# Author

Thirumala Narasimha Poluru
Computer Science Engineer
Frontend & Full-Stack Developer

GitHub
https://github.com/Thiru7869

---

# License

This project is licensed under the MIT License.
