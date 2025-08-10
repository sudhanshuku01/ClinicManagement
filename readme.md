# MediBooker 🏥

A full-stack clinic appointment booking system with **Admin** and **Patient** dashboards, built using **Node.js, Express, MongoDB** for the backend and **Vite + React** for the frontend.

## 📌 Features

### Patient
- Register and Login
- View available slots (with date range filter)
- Book a slot
- View "My Bookings" list
- Logout

### Admin
- Login
- View all bookings (patient details, slot info, booking time)
- Logout

### General
- Role-based authentication (JWT)
- Protected API routes
- Environment variables for configuration
- Clean and minimal UI

---

## 🗂 Project Structure

```

backend/
├── server.js
├── models/
├── routes/
├── controllers/
└── ...
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── ...
├── vite.config.js
└── ...

````

---

## ⚙️ Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (password hashing)

**Frontend:**
- React (Vite)
- Axios
- React Router
- Context API for authentication

---

## 📦 Installation & Setup

### 1️⃣ Clone the repository


### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside **backend/**:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/medibooker
JWT_SECRET=your_jwt_secret
```

Run backend:

```bash
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file inside **frontend/**:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

---

## 🚀 How to Use

### Patient Flow:

1. Register → Login
2. Choose a date range → See available slots
3. Click **Book** on a slot
4. View **My Bookings**
5. Logout

### Admin Flow:

1. Login using the following credentials:

   ```
   Email: admin@gmail.com
   Password: admin12345
   ```
2. View **All Bookings** list
3. Logout

---

## 🔑 API Endpoints

### Auth

* `POST /api/register` → Register
* `POST /api/login` → Login

### Slots

* `GET /api/slots?from=YYYY-MM-DD&to=YYYY-MM-DD` → List available slots (Patient)
* `POST /api/book` → Book slot (Patient)
* `GET /api/my-bookings` → My bookings (Patient)
* `GET /api/all-bookings` → All bookings (Admin)

---

## 🌍 Environment Variables

### Backend `.env`

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/medibooker
JWT_SECRET=your_jwt_secret
```

### Frontend `.env`

```
VITE_API_BASE_URL=http://localhost:5000/api
```

---


