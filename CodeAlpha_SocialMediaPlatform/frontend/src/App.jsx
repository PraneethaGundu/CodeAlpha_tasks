import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import UserProfile from "./pages/UserProfile";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }
      />

      <Route
        path="/user/:id"
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;