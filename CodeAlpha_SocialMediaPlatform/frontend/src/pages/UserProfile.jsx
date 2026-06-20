import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";

function UserProfile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        `/users/profile/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setUser(res.data.user);
      setPosts(res.data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div className="container mt-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Navbar />

      <div className="card shadow mb-4">
        <div className="card-body text-center">

          <img
            src={
              user.profilePic
                ? `http://localhost:5000/${user.profilePic}`
                : "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="rounded-circle mb-3"
            width="150"
            height="150"
            style={{
              objectFit: "cover",
            }}
          />

          <h3>{user.username}</h3>

          <p>{user.bio}</p>

          <div className="row mt-4">
            <div className="col">
              <h4>{user.followers.length}</h4>
              <p>Followers</p>
            </div>

            <div className="col">
              <h4>{user.following.length}</h4>
              <p>Following</p>
            </div>
          </div>

        </div>
      </div>

      <div className="card shadow">
        <div className="card-body">

          <h4>User Posts</h4>

          {posts.length === 0 ? (
            <p>No posts available</p>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                className="border rounded p-3 mb-3"
              >
                <p>{post.content}</p>

                {post.image && (
                  <img
                    src={`http://localhost:5000/${post.image}`}
                    alt="Post"
                    className="img-fluid rounded"
                  />
                )}

                <p className="mt-2">
                  ❤️ {post.likes.length}
                </p>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}

export default UserProfile;