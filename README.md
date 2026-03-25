# 📊 BuyerForeSight Frontend Assignment – User Directory Dashboard

## 🚀 Project Overview

This project is a **User Directory Dashboard** built as part of a frontend assessment.
It fetches user data from a public API and displays it in a clean, interactive UI with search, sorting, and detailed user views.

---

## 🌐 API Used

https://jsonplaceholder.typicode.com/users

---

## 🛠️ Tech Stack

* React.js
* JavaScript (ES6+)
* CSS (Modular structure)
* Fetch API / Axios

---

## ✨ Features

### 📋 Dashboard

* Displays users in a **table/grid format**
* Shows:

  * Name
  * Email
  * Phone
  * Company

---

### 🔍 Search

* Search users by:

  * Name
  * Email
* Instant client-side filtering

---

### 🔃 Sorting

* Sort users by:

  * Name
  * Company
* Supports:

  * Ascending ↑
  * Descending ↓

---

### 👤 User Detail Page

* Click on any user row to view details
* Displays complete user information:

  * Name
  * Username
  * Email
  * Phone
  * Website
  * Address
  * Company details

---

## 📁 Folder Structure

```
src/
├── styles/
│   ├── variables.css
│   ├── base.css
│   ├── components.css
│   ├── layout.css
│   └── responsive.css
├── components/
│   ├── UserDashboard.js
│   ├── UserDetail.js
│   └── UserRow.js
├── services/
│   └── api.js
├── App.js
└── index.js
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/BabithaReddy7/User-Dashboard.git
cd User-Dashboard
```

### 2. Install dependencies

```
npm install
```

### 3. Run the application

```
npm start
```

---

## 📦 Build for Production

```
npm run build
```

---

## 🎯 Key Highlights

* Clean and modular folder structure
* Reusable components
* Responsive design
* Optimized client-side operations (search & sort)

---

## 📌 Future Improvements

* Pagination
* API error handling UI
* Loading skeletons
* Dark mode support

---

