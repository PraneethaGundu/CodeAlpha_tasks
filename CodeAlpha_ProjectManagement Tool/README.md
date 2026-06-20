# ProjectHub - Real-Time Project Management System

A full-stack Project Management System built using the MERN Stack (MongoDB, Express.js, React.js, Node.js) with real-time task updates using Socket.IO.

This application helps teams manage projects, assign tasks, collaborate through comments, track progress, and receive notifications in real time.

---

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Secure API Access

### Project Management

* Create Projects
* View Projects
* Delete Projects
* Search Projects
* Add Team Members to Projects

### Task Management

* Create Tasks
* Delete Tasks
* Assign Tasks to Team Members
* Update Task Status
* Due Date Management
* Kanban Board Layout:

  * Todo
  * In Progress
  * Done

###  Collaboration

* Task Comments
* Real-Time Task Updates
* Team Collaboration

### Notifications

* Task Assignment Notifications
* Notification Center
* User-Specific Alerts

### Dashboard

* Total Projects
* Total Tasks
* Completed Tasks
* Pending Tasks
* Sidebar Navigation

### Real-Time Features

* Socket.IO Integration
* Real-Time Task Creation
* Real-Time Task Updates
* Real-Time Task Deletion

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Socket.IO Client
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Socket.IO
* JWT Authentication
* bcrypt.js

### Database

* MongoDB Atlas

---

## Project Structure

projecthub/

├── backend/

│ ├── controllers/

│ ├── middleware/

│ ├── models/

│ ├── routes/

│ ├── server.js

│ └── .env

│

├── frontend/

│ ├── src/

│ │ ├── api/

│ │ ├── components/

│ │ ├── pages/

│ │ ├── socket.js

│ │ ├── App.jsx

│ │ └── main.jsx

│

└── README.md

---

## Installation

###  Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Start Backend:

```bash
npm run dev
```

###  Frontend Setup

```bash
cd frontend

npm install
```

Start Frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

Backend runs on:

```text
http://localhost:5000
```

---

##  API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Projects

```http
GET    /api/projects
POST   /api/projects
DELETE /api/projects/:id
PUT    /api/projects/:id/add-member
```

### Tasks

```http
GET    /api/tasks/:projectId
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

### Notifications

```http
GET /api/notifications
```

### Comments

```http
POST /api/comments
GET  /api/comments/:taskId
```

---

##  Future Enhancements

* Task Priority Levels
* Project Progress Bar
* User Profile Page
* Charts & Analytics
* Activity Timeline
* Drag & Drop Tasks
* Email Notifications
* Deployment on Vercel & Render

---

##  Author

**Gundu Praneetha**

Computer Science Student

Email: [praneetha1435@gmail.com]

GitHub: https://github.com/PraneethaGundu

---

## Support

If you found this project useful, please consider giving it a ⭐ on GitHub.
