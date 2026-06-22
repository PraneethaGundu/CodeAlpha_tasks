# CodeAlpha Project Management Tool

A full-stack **Project Management Tool** built as part of the **CodeAlpha Internship Task 3**.
This application allows users to register/login, create projects, add members, assign tasks, track progress through a project board, and communicate through task comments.

---

## Features

### Authentication

* User Registration
* User Login
* Protected routes using JWT authentication

### Project Management

* Create new projects
* View all projects for the logged-in user
* Group projects with project members
* Project owner can add members to a project

### Task Management

* Create tasks inside a project
* Assign tasks to specific project members
* Task board with status columns:

  * **Todo**
  * **In Progress**
  * **Done**
* Due date support for tasks
* Overdue task indication
* User-specific task status update restriction

  * Only the assigned user can change the status of their task

### Task Communication

* Comment section for each task
* Team members can communicate inside tasks

### Dashboard

* Dashboard statistics for:

  * Total projects
  * Total tasks
  * Completed tasks
  * Pending tasks

###  Bonus Features

* Notifications when a task is assigned
* Real-time task updates using **Socket.IO**
* Dark mode UI support

---

## Tech Stack

### Frontend

* React.js
* Vite
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Socket.IO

---

##  Project Structure

```bash
CodeAlpha_ProjectManagementTool/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Database Models

The application uses MongoDB with the following collections:

* **Users**
* **Projects**
* **Tasks**
* **Comments**
* **Notifications**

---

## Installation & Setup


## Setup Backend

Go to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the backend folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start backend server:

```bash
npm run dev
```

---

## Setup Frontend

Open a new terminal and go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

---

## How to Use

### 1. Register / Login

Create an account or log in with existing credentials.

### 2. Create a Project

Add a new project with project name and description.

### 3. Add Members

Project owner can add members to the project.

### 4. Create Tasks

Inside a project:

* Enter task title
* Assign it to a member
* Add due date

### 5. Track Tasks

Tasks are displayed in a board format:

* Todo
* In Progress
* Done

### 6. Update Task Status

Only the assigned user can change the task status.

### 7. Comment on Tasks

Users can communicate using the comment section inside each task.

## Access Rules Implemented

* Only authenticated users can access the app
* Only project members can view project tasks
* Only assigned user can update their task status

---

##  UI Features

* Clean dashboard layout
* Stat cards for project insights
* Kanban-style task board
* Dark mode support
* Responsive card-based UI

---

## Internship Task Coverage

### Required Features Covered

* Authentication system (login/signup)
* Create group projects
* Assign tasks to users
* Project boards
* Task cards
* Comment and communicate within tasks

### Database Used For

* Users
* Projects
* Tasks
* Comments

### Bonus Features Implemented

* Notifications
* Real-time updates using WebSocket

---

##  Author

**Gundu Praneetha**
Computer Science Student
CodeAlpha Internship Project

GitHub: https://github.com/PraneethaGundu

---

##  Note

This project was built as part of the **CodeAlpha Internship** to demonstrate full-stack web development skills including authentication, database design, task collaboration, and real-time project management features.

