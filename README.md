# Thirumala Narasimha Poluru — Portfolio v13

## 📁 Project Structure

```
portfolio/
├── frontend/
│   ├── css/
│   │   └── style.css          ← All styles (dark/light mode, responsive)
│   ├── js/
│   │   ├── main.js            ← Core JS (animations, interactions, rating)
│   │   └── download.js        ← CV download animation module
│   ├── images/                ← Local images (optional)
│   └── index.html             ← Main portfolio page
│
├── download/
│   ├── download.html          ← Standalone CV download page
│   ├── download.css           ← Download page styles
│   └── download.js            ← Download page logic
│
└── backend/
    ├── server.js              ← Express server entry point
    ├── package.json           ← Dependencies
    ├── .env.example           ← Environment variables template
    ├── routes/
    │   └── reviewRoute.js     ← Review API routes
    ├── controllers/
    │   └── reviewController.js ← Review logic + email HTML
    └── config/
        └── mailConfig.js      ← Nodemailer / Gmail SMTP config
```

## 🚀 Quick Start

### Frontend
Open `frontend/index.html` in a browser or serve with Live Server.

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Gmail credentials
npm run dev
```

### Environment Variables (.env)
```
EMAIL_USER=reddytn4@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_RECIPIENT=reddytn4@gmail.com
PORT=3001
```

> **Gmail App Password**: Generate at https://myaccount.google.com/apppasswords  
> (Requires 2-Step Verification enabled)

### Deploy Backend
Recommended: [Render.com](https://render.com) (free tier)
1. Push `/backend` to GitHub repo
2. Create a new Web Service on Render
3. Set environment variables in Render dashboard
4. Update `BACKEND_URL` in `frontend/js/main.js`

## ✅ Changes in v13
- **Light mode CV animation** — Blue progress bar visible in both themes
- **Image fixes** — All certificate images use corrected raw GitHub URLs
- **Full-screen modal** — Cert modal properly shows images at full size
- **Mobile nav close button** — X button inside mobile drawer
- **Skills 3-per-row** — On mobile, skills display 3 columns
- **Sections below skills 2-per-row** — Internships, projects, contacts
- **Humanized education content** — Personal stories on expand
- **About expand section** — "Read More" button with personal narrative
- **Section animations** — Smooth scroll-reveal and floating particles
- **Enhanced footer** — Skills bar, availability badge, structured contact info
- **Email recipient** — All reviews notify reddytn4@gmail.com
