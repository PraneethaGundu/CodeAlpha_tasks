import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
function Users() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCurrentUser();
    fetchUsers();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/users/me", {
        headers: {
          Authorization: token,
        },
      });

      setCurrentUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/users/all", {
        headers: {
          Authorization: token,
        },
      });

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const followUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/users/follow/${userId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchUsers();
      fetchCurrentUser();
    } catch (error) {
      console.log(error);
    }
  };

  const unfollowUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/users/unfollow/${userId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchUsers();
      fetchCurrentUser();
    } catch (error) {
      console.log(error);
    }
  };

  if (!currentUser) {
    return <h3>Loading...</h3>;
  }

  return (
  <div className="container mt-4">
    <Navbar />

    <h2 className="mb-4 text-center">
      👥 Discover Users
    </h2>

    {/* Search Box */}
    <input
      type="text"
      className="form-control mb-4"
      placeholder="🔍 Search users..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />

    {users
      .filter(
        (user) =>
          user._id !== currentUser._id
      )
      .filter((user) =>
        user.username
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .map((user) => (
        <div
          key={user._id}
          className="card mb-3 shadow-sm"
        >
          <div className="card-body d-flex justify-content-between align-items-center">

            <div className="d-flex align-items-center">

              <img
                src={
                  user.profilePic
                    ? `http://localhost:5000/${user.profilePic}`
                    : "https://via.placeholder.com/60"
                }
                alt="Profile"
                className="rounded-circle me-3"
                width="60"
                height="60"
                style={{
                  objectFit: "cover",
                }}
              />

              <div>
                <Link
  to={`/user/${user._id}`}
  className="text-decoration-none"
>
  <h5>{user.username}</h5>
</Link>

                <p className="text-muted mb-1">
                  {user.email}
                </p>

                <small>
                  Followers:{" "}
                  {user.followers.length}
                </small>
              </div>

            </div>

            {currentUser.following.includes(
              user._id
            ) ? (
              <button
                className="btn btn-danger"
                onClick={() =>
                  unfollowUser(user._id)
                }
              >
                Unfollow
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={() =>
                  followUser(user._id)
                }
              >
                Follow
              </button>
            )}

          </div>
        </div>
      ))}
  </div>
);
}

export default Users;