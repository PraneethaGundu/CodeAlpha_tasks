import { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";
import CreatePost from "../components/CreatePost";
import Navbar from "../components/Navbar";
function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] =
    useState(null);

  useEffect(() => {
    fetchProfile();
    fetchPosts();
  }, []);

  const fetchProfile = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await API.get(
        "/users/me",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setUser(res.data);
      setBio(res.data.bio || "");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await API.get(
        "/users/myposts",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBio = async () => {
    try {
      const token =
        localStorage.getItem("token");

      await API.put(
        "/users/updatebio",
        { bio },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Bio updated successfully");
      fetchProfile();
    } catch (error) {
      console.log(error);
      alert("Failed to update bio");
    }
  };

  const uploadProfilePic =
    async () => {
      try {
        const token =
          localStorage.getItem("token");

        const formData =
          new FormData();

        formData.append(
          "profilePic",
          profilePic
        );

        await API.post(
          "/users/upload-profile-pic",
          formData,
          {
            headers: {
              Authorization: token,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(
          "Profile picture uploaded successfully"
        );

        fetchProfile();
      } catch (error) {
        console.log(error);
        alert(
          "Failed to upload picture"
        );
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
      

      {/* Profile Header */}
      <div className="card shadow border-0 mb-4">
        <div
          className="bg-primary rounded-top"
          style={{
            height: "150px",
          }}
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

          <h2 className="mt-3">
            {user.username}
          </h2>

          <p className="text-muted">
            {user.email}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="row text-center mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3>{posts.length}</h3>
              <p className="mb-0">
                Posts
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3>
                {user.followers.length}
              </h3>
              <p className="mb-0">
                Followers
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3>
                {user.following.length}
              </h3>
              <p className="mb-0">
                Following
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5>Edit Bio</h5>

          <textarea
            className="form-control mb-3"
            rows="3"
            value={bio}
            onChange={(e) =>
              setBio(e.target.value)
            }
          />

          <button
            className="btn btn-success"
            onClick={updateBio}
          >
            Save Bio
          </button>
        </div>
      </div>

      {/* Upload Picture */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5>Profile Picture</h5>

          <input
            type="file"
            className="form-control mb-3"
            onChange={(e) =>
              setProfilePic(
                e.target.files[0]
              )
            }
          />

          <button
            className="btn btn-primary"
            onClick={uploadProfilePic}
          >
            Upload Picture
          </button>
        </div>
      </div>

      {/* Create Post */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5>Create Post</h5>

          <CreatePost
            refreshPosts={fetchPosts}
          />
        </div>
      </div>

      {/* My Posts */}
      <div className="card shadow">
        <div className="card-body">
          <h4 className="mb-4">
            My Posts
          </h4>

          {posts.length === 0 ? (
            <p>No posts yet</p>
          ) : (
            posts.map((post) => (
              <div
                key={post._id}
                className="card shadow-sm mb-3"
              >
                <div className="card-body">
                  <p>{post.content}</p>

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

                  <div className="d-flex justify-content-between">
                    <small className="text-muted">
                      ❤️ {post.likes.length} Likes
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

export default Profile;