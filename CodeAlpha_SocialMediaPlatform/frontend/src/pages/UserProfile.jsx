import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";

function UserProfile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(`/users/profile/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      setUser(res.data.user);
      setPosts(res.data.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <Navbar />
        <div className="text-center mt-5">
          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>
          <p className="mt-3">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mt-5">
        <Navbar />
        <div className="text-center mt-5">
          <h4>User not found</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Navbar />

      {/* Profile Header */}
      <div className="card shadow border-0 mb-4">
        <div
          className="bg-primary rounded-top"
          style={{ height: "150px" }}
        ></div>

        <div className="card-body text-center">
          <img
            src={
              user.profilePic
                ? `http://localhost:5000/${user.profilePic}`
                : "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="rounded-circle border border-4 border-white shadow"
            width="160"
            height="160"
            style={{
              marginTop: "-80px",
              objectFit: "cover",
            }}
          />

          <h2 className="mt-3 fw-bold">
            {user.username}
          </h2>

          <p className="text-muted mb-2">
            {user.email}
          </p>

          <p className="mb-0">
            {user.bio?.trim()
              ? user.bio
              : "No bio added yet."}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="row text-center mb-4">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h3 className="fw-bold">
                {posts.length}
              </h3>
              <p className="mb-0 text-muted">
                Posts
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h3 className="fw-bold">
                {user.followers?.length || 0}
              </h3>
              <p className="mb-0 text-muted">
                Followers
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h3 className="fw-bold">
                {user.following?.length || 0}
              </h3>
              <p className="mb-0 text-muted">
                Following
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* User Posts */}
      <div className="card shadow border-0">
        <div className="card-body">
          <h4 className="mb-4 fw-bold">
            {user.username}'s Posts
          </h4>

          {posts.length === 0 ? (
            <div className="text-center py-4">
              <h6 className="text-muted">
                No posts available
              </h6>
            </div>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                className="card shadow-sm border-0 mb-4"
                style={{
                  borderRadius: "15px",
                }}
              >
                <div className="card-body">
                  <p className="fs-6 mb-3">
                    {post.content}
                  </p>

                  {post.image && (
                    <img
                      src={`http://localhost:5000/${post.image}`}
                      alt="Post"
                      className="img-fluid rounded mb-3"
                      style={{
                        maxHeight: "400px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}

                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      ❤️ {post.likes?.length || 0} Likes
                    </small>

                    <small className="text-muted">
                      {new Date(
                        post.createdAt
                      ).toLocaleString()}
                    </small>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;