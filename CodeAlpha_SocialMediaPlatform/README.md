# Social Media Platform

A full-stack Social Media Platform built using React, Node.js, Express.js, and MongoDB.

## Features

### Authentication

* User Registration
* User Login
* Protected Routes using JWT Authentication

### User Profiles

* View Profile
* Update Bio
* Upload Profile Picture
* View Followers and Following Count

### Posts

* Create Posts
* Edit Posts
* Delete Posts
* Upload Images with Posts
* View All Posts

### Social Features

* Like Posts
* Unlike Posts
* Comment on Posts
* Follow Users
* Unfollow Users
* Search Users
* View Other Users' Profiles

### UI Features

* Responsive Design using Bootstrap
* Navigation Bar
* Profile Pages
* User Search Page
* Image Preview Support

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Bootstrap

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JSON Web Token (JWT)

### File Uploads

* Multer

---

## Project Structure

```text
CodeAlpha_SocialMediaPlatform
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── api
│   │   └── App.jsx
│
├── backend
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── uploads
│   └── server.js
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/PraneethaGundu/CodeAlpha_SocialMediaPlatform.git
```

### Backend Setup

```bash
cd backend

npm install

npm start
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## API Features

### Authentication

* Register User
* Login User

### Users

* Get Profile
* Update Bio
* Upload Profile Picture
* Follow User
* Unfollow User
* Get All Users
* View User Profile

### Posts

* Create Post
* Edit Post
* Delete Post
* Like / Unlike Post
* Upload Image Posts

### Comments

* Add Comment
* View Comments

---

## Screenshots

Add screenshots of:

* Login Page
* Register Page
* Home Feed
* Profile Page
* Users Page
* User Profile Page

---

## Future Improvements

* Dark Mode
* Notifications
* Real-time Chat
* Stories/Reels
* Deployment using Vercel and Render

---

## Author

**Gundu Praneetha**

Computer Science Student

GitHub:
https://github.com/PraneethaGundu
