# 🚀 Project Management Tool (MERN + Socket.io)

A real-time collaborative project management tool built using the MERN stack.  
It supports authentication, project creation, task management, real-time updates, comments, and notifications.

---

## ✨ Features

### 🔐 Authentication
- User Registration & Login
- JWT-based authentication
- Protected routes (frontend & backend)

### 📁 Project Management
- Create projects
- View user-specific projects
- Add members to projects

### ✅ Task Management
- Create tasks under projects
- Assign tasks to users
- Update task status (Todo / In Progress / Done)
- Delete tasks
- Due date support

### 💬 Comments System
- Add comments to tasks
- Real-time updates for collaboration

### 🔔 Notifications
- Task assignment notifications
- Stored in database
- Real-time alerts (Socket.io)

### ⚡ Real-Time Features
- Socket.io integration
- Live task creation updates
- Live status updates
- Live task deletion updates

### 📊 Dashboard
- Project statistics
- Task statistics
- Completed vs Pending tracking
- Notifications panel

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Socket.io-client
- CSS

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.io
- JWT Authentication
- dotenv

---

## 📁 Folder Structure
project-management-tool/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── taskController.js
│   │   ├── notificationController.js
│   │   └── commentController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── Task.js
│   │   ├── Notification.js
│   │   └── Comment.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── taskRoutes.js
│   │   ├── notificationRoutes.js
│   │   └── commentRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── TaskBoard.jsx
│   │   │   └── CommentSection.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── socket.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md


---

## 🚀 Installation & Setup

### 1️⃣ Clone repository
```bash
git clone https://github.com/PraneethaGundu/CodeAlpha_ProjectManagementTool

⚙️ Backend Setup
cd backend
npm install

## Create .env file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

💻 Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:http://localhost:5173

🔌 API Endpoints
Auth:
POST /api/auth/register
POST /api/auth/login
Projects:
GET /api/projects
POST /api/projects
GET /api/projects/:id
PUT /api/projects/:id/add-member
DELETE /api/projects/:id
Tasks:
GET /api/tasks/:projectId
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
Notifications:
GET /api/notifications

⚡ Socket.io Events
taskCreated
taskUpdated
taskDeleted

👨‍💻 Author

GUNDU PRANEETHA
