# ✂️ Salon Management System (Dockerized)

![React](https://img.shields.io/badge/Frontend-React_Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![NodeJS](https://img.shields.io/badge/Backend-Node.js_Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Infrastructure-Docker_Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)

> A high-performance, containerized full-stack web application designed for seamless salon operations. Built with a Microservices-ready architecture using Docker, ensuring consistent environments from development to production.

---

## 🏗️ Technical Architecture

This project utilizes a **3-Tier Architecture** fully orchestrated by **Docker Compose**:

| Container Service | Tech Stack | Port | Description |
| :--- | :--- | :--- | :--- |
| **`salon_client`** | React + Vite | `5173` | High-performance frontend with optimized build tooling. |
| **`salon_server`** | Node.js + Express | `5000` | REST API handling business logic and authentication. |
| **`salon_db_docker`** | PostgreSQL | `5432` | Relational database with persistent volume storage. |

---

## 💻 Tech Stack & Tools

### **Core Infrastructure**
* **Docker:** Used for containerizing the application services.
* **Docker Compose:** Orchestrates multi-container setup and networking.
* **Volumes:** Persists PostgreSQL data (`postgres_data`) to prevent data loss on container restarts.

### **Backend (API)**
* **Runtime:** Node.js
* **Framework:** Express.js
* **Authentication:** JWT (JSON Web Tokens) & Bcrypt (Password Hashing).
* **Database Interaction:** `pg` (node-postgres) library for raw SQL queries.
* **Configuration:** `dotenv` for environment variable management.

### **Frontend (UI)**
* **Framework:** React.js (Hooks & Functional Components).
* **Build Tool:** Vite (For lightning-fast HMR and bundling).
* **State Management:** React `useState` & `useEffect`.
* **Styling:** Modern CSS / Responsive Design.

---

## ⚙️ Key Features

### 🔐 Security & Auth
* **Secure Login/Signup:** Encrypted passwords and Token-based authentication.
* **Role-Based Access Control (RBAC):** Distinction between `User` and `Admin` roles.
* **Middleware Protection:** Protected routes preventing unauthorized access.

### 📅 Booking System
* **Real-time Scheduling:** Prevents double-booking logic at the database level.
* **Data Integrity:** Foreign key constraints ensure appointments link to valid users.
* **Dynamic Validations:** Backend validation for required fields.

### 🛒 Service & Review Management
* **CRUD Operations:** Admins can Create, Read, Update, and Delete salon services.
* **Feedback Loop:** Customers can submit reviews with ratings (1-5 stars).

---

## 🚀 Installation & Setup

No manual dependency installation is required. Docker handles everything.

### 1. Clone the Repository
```bash
git clone <repository_url>
cd salon-management-system

👨‍💻 Developed By
Kavindu Wijesekara Full Stack Developer