# SocialConnect 

A full-stack **Social Media Platform** built using the **MERN stack** as part of **CodeAlpha Internship – Task 2**.

SocialConnect allows users to create accounts, manage profiles, create posts with images, like posts, comment on posts, follow/unfollow other users, and view public user profiles — providing the core features of a basic social networking platform.

---

##  Task Information

**Internship Task:** Task 2 – Social Media Platform
**Organization:** CodeAlpha

### Required Features

* User profiles
* Posts & comments
* Like / follow system

---

#  Features Implemented

## Authentication & User Profiles

* User registration
* User login with JWT authentication
* Protected routes for authenticated users
* Personal profile page
* Update bio
* Upload profile picture
* View own posts on profile page

## Posts

* Create text posts
* Upload image posts
* View all posts in the social feed
* Edit own posts
* Delete own posts

## Comments

* Add comments on posts
* View comments for each post

## Social Features

* Like / unlike posts
* Follow other users
* Unfollow users
* View all users
* Search users by username
* Visit public user profile pages

## UI / UX

* Responsive Bootstrap-based UI
* Modern login & register pages
* Navigation bar for quick access
* Feed layout with profile images, timestamps, likes, and comments

---

# Tech Stack

## Frontend

* React.js
* React Router DOM
* Bootstrap
* Axios

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication & Uploads

* JWT (JSON Web Token)
* Multer for image uploads

---

# 📂 Project Structure

```bash
SocialConnect/
│
├── backend/
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── upload.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Comment.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── uploads/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── CommentBox.jsx
│   │   │   ├── CommentsList.jsx
│   │   │   └── PrivateRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Users.jsx
│   │   │   └── UserProfile.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# Database Design

The project uses MongoDB collections for storing user and social data.

## User Model

Stores:

* username
* email
* password
* bio
* profilePic
* followers
* following

## Post Model

Stores:

* user
* content
* image
* likes
* createdAt

## Comment Model

Stores:

* post
* user
* content
* createdAt

---

# API Overview

## Auth Routes

* `POST /api/auth/register` → Register new user
* `POST /api/auth/login` → Login user

## User Routes

* `GET /api/users/me` → Get logged-in user profile
* `PUT /api/users/updatebio` → Update bio
* `POST /api/users/upload-profile-pic` → Upload profile picture
* `GET /api/users/myposts` → Get logged-in user posts
* `GET /api/users/all` → Get all users
* `PUT /api/users/follow/:id` → Follow user
* `PUT /api/users/unfollow/:id` → Unfollow user
* `GET /api/users/profile/:id` → Get public user profile

## Post Routes

* `GET /api/posts` → Get all posts
* `POST /api/posts/create` → Create a post
* `PUT /api/posts/edit/:id` → Edit post
* `DELETE /api/posts/:id` → Delete post
* `PUT /api/posts/like/:id` → Like / unlike post

## Comment Routes

* Add comments to posts
* Fetch comments for posts

---

#  Installation & Setup

##  Backend Setup

Go to the backend folder:

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm start
```

or if you use nodemon:

```bash
npm run dev
```

---

## Frontend Setup

Open a new terminal and go to the frontend folder:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:

```bash
http://localhost:5173
```

The backend will run on:

```bash
http://localhost:5000
```

---

# Future Improvements

Possible enhancements for future versions:

* Dark mode toggle
* Real-time notifications
* Real-time chat / messaging
* Post sharing
* Better post search and filters
* Infinite scrolling / pagination
* Deployment on Vercel + Render
* Improved validation and error handling
* Password reset functionality

---

# Author

**Gundu Praneetha**
Computer Science Student | Exploring Technology & Innovation

---

# Conclusion

SocialConnect is a full-stack social media platform that demonstrates user authentication, profile management, posting, commenting, liking, and following features using the MERN stack. It fulfills the core requirements of the **CodeAlpha Task 2: Social Media Platform** project while also adding extra features such as image uploads, public user profiles, and improved UI.

