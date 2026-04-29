# 🎬 FilmZone – Full Stack Online Movie Ticket Booking Platform

FilmZone is a production-oriented full-stack web application developed using the MERN stack (MongoDB, Express.js, React.js, Node.js) that digitizes and streamlines the movie ticket booking process.

The platform allows users to explore movies, register securely, book tickets, manage bookings, submit reviews, make payments, and interact with an AI-powered chat module. It also includes administrative controls for movie management, scheduling, and operational oversight.

This project demonstrates practical implementation of modern full-stack development, authentication systems, payment gateway integration, file uploads, and responsive UI/UX design.

---

# 🚀 Core Features

## 👤 User Features
- Secure user registration and login system
- JWT-based authentication
- Browse latest movies and detailed movie pages
- Search and explore available shows
- Online movie ticket booking system
- Booking history and recent bookings tracking
- Razorpay payment gateway integration
- User profile management
- Movie reviews and ratings
- Contact support functionality
- AI Chat support integration
- Responsive cross-device interface

---

## 🛠️ Admin Features
- Admin dashboard
- Add, edit, and delete movie listings
- Upload movie thumbnails and media
- Manage schedules and bookings
- Review customer activity
- Monitor operational data

---

# 🧰 Technology Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Bootstrap / Custom CSS / SCSS
- SweetAlert2
- React Razorpay Integration

## Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt Password Encryption
- Multer File Uploads
- Nodemailer
- Razorpay API
- AI Controller Integration

## Database
- MongoDB

---

# 📁 Project Structure

```bash
FilmZone/
│
├── movie/                     # Frontend React Application
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   ├── Layouts/
│   │   ├── Container/
│   │   └── Assets/
│
├── movieApi/                  # Backend Node.js API
│   ├── app/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── uploads/
│   └── index.js
│
└── README.md
```

---

#🔐 Security Features
-Password hashing with bcrypt
-JWT token authentication
-Protected routes
-Secure payment integration
-Environment variable configuration
-File upload validation

---

# 💳 Payment Integration

## FilmZone integrates Razorpay for secure online transactions:

- Ticket payments
- Booking confirmations
- Payment workflow management

# 🤖 Advanced Modules
- AI Chat Support System
- Email notifications using Nodemailer
- Review management
- Contact support module

---

# ⚙️ Installation & Setup Guide

## 1️⃣ Clone Repository
```
git clone https://github.com/yourusername/FilmZone.git
cd FilmZone
```
## 2️⃣ Frontend Setup
```
cd movie
npm install
npm start
```
- Frontend runs on: http://localhost:3000

## 3️⃣ Backend Setup
```
cd movieApi
npm install
npm start
```
- Backend runs on: http://localhost:5000

## 4️⃣ Environment Variables

Create a .env file inside movieApi/:
```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

---

# 📸 Major Pages

- Home Page
- Movie Listings
- Movie Details
- Booking Page
- Payment Page
- Login/Register
- User Dashboard
- Admin Dashboard
- Contact Page
- About Page
  
# 👨‍💻 Author

## Aman Sumra
