# 🏠 Property Rental Server

Backend API for the Property Rental & Booking Platform. This server handles user management, property listings, favorites, bookings, and transactions using Express.js and MongoDB.
---
## 📌 Project Overview

This backend provides RESTful APIs for a property rental platform where:

* Users can register and login.
* Owners can add and manage properties.
* Tenants can save favorite properties and make bookings.
* Owners can manage booking requests.
* Admins can monitor users, properties, bookings, and transactions.

---
## 🛠️ Technologies Used

* Node.js
* Express.js
* MongoDB
* MongoDB Atlas
* dotenv
* cors

---

## 📂 Database Collections

### Users Collection

Stores:

* User Name
* Email
* Photo URL
* Role (Tenant, Owner, Admin)

### Properties Collection

Stores:

* Property Information
* Owner Information
* Property Status

### Favorites Collection

Stores:

* User Favorite Properties

### Bookings Collection

Stores:

* Booking Details
* Booking Status

### Transactions Collection

Stores:

* Payment Transaction Records

---

### 🏡 Properties

| Method | Endpoint                 | Description            |
| ------ | ------------------------ | ---------------------- |
| GET    | /properties              | Get all properties     |
| GET    | /properties/:id          | Get single property    |
| GET    | /properties/owner/:email | Get owner's properties |
| POST   | /properties              | Add property           |
| PATCH  | /properties/:id          | Update property        |
| DELETE | /properties/:id          | Delete property        |

#### Default Property Status

```json
{
  "status": "Pending"
}
```

---

### ❤️ Favorites

| Method | Endpoint   | Description               |
| ------ | ---------- | ------------------------- |
| POST   | /favorites | Add property to favorites |

---

### 📅 Bookings

| Method | Endpoint               | Description            |
| ------ | ---------------------- | ---------------------- |
| GET    | /bookings              | Get all bookings       |
| GET    | /bookings/user/:email  | User bookings          |
| GET    | /bookings/owner/:email | Owner booking requests |
| POST   | /bookings              | Create booking         |
| PATCH  | /bookings/:id          | Update booking status  |

#### Booking Status

```json
{
  "status": "Pending"
}
```

Possible values:

* Pending
* Approved
* Rejected

---

### 💳 Transactions

| Method | Endpoint      | Description          |
| ------ | ------------- | -------------------- |
| GET    | /transactions | Get all transactions |
| POST   | /transactions | Save transaction     |

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

---

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/property-rental-server.git
```
Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run start
```

---

## 📁 Project Structure

```bash
property-rental-server/
│
├── node_modules/
├── .env
├── .gitignore
├── package.json
├── index.js
└── README.md
```

---

## 🔒 Current Features

✅ User Registration

✅ Google User Registration

✅ Property CRUD Operations

✅ Favorite Property System

✅ Booking Management

✅ Owner Booking Requests

✅ Booking Status Update

✅ Transaction Management

✅ MongoDB Atlas Integration

✅ Environment Variable Security

✅ REST API Architecture

---

## 👨‍💻 Developer

**Afjal Hossain**

B.Sc. in Computer Science & Engineering

Daffodil International University

---

## 📄 License

This project is developed for educational and portfolio purposes.
