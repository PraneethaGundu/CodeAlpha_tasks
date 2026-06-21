import { useEffect, useState } from "react";
import API from "../api/api";
import CreatePost from "../components/CreatePost";
import Navbar from "../components/Navbar";

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchProfile();
    fetchPosts();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/users/me", {
        headers: {
          Authorization: token,
        },
      });

      setUser(res.data);
      setBio(res.data.bio || "");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/users/myposts", {
        headers: {
          Authorization: token,
        },
      });

      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBio = async () => {
    try {
      const token = localStorage.getItem("token");

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

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadProfilePic = async () => {
    if (!profilePic) {
      alert("Please choose a profile picture first");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("profilePic", profilePic);

      await API.post("/users/upload-profile-pic", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile picture uploaded successfully");

      setProfilePic(null);
      setPreview("");
      fetchProfile();
    } catch (error) {
      console.log(error);
      alert("Failed to upload picture");
    }
  };

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading profile...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <Navbar />

          {/* Profile Header */}
          <div
            className="card shadow border-0 mb-4 overflow-hidden"
            style={{ borderRadius: "18px" }}
          >
            <div
              className="bg-primary"
              style={{
                height: "160px",
                background:
                  "linear-gradient(135deg, #0d6efd, #4f8cff)",
              }}
            ></div>

            <div className="card-body text-center pt-0 pb-4">
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

              <h2 className="mt-3 fw-bold">{user.username}</h2>
              <p className="text-muted mb-2">{user.email}</p>

              <p className="text-secondary mb-0 px-3">
                {user.bio && user.bio.trim() !== ""
                  ? user.bio
                  : "No bio added yet. Tell people a little about yourself."}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="row text-center g-3 mb-4">
            <div className="col-md-4">
              <div
                className="card shadow-sm border-0 h-100"
                style={{ borderRadius: "14px" }}
              >
                <div className="card-body py-4">
                  <h3 className="fw-bold mb-1">{posts.length}</h3>
                  <p className="text-muted mb-0">Posts</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card shadow-sm border-0 h-100"
                style={{ borderRadius: "14px" }}
              >
                <div className="card-body py-4">
                  <h3 className="fw-bold mb-1">{user.followers.length}</h3>
                  <p className="text-muted mb-0">Followers</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div
                className="card shadow-sm border-0 h-100"
                style={{ borderRadius: "14px" }}
              >
                <div className="card-body py-4">
                  <h3 className="fw-bold mb-1">{user.following.length}</h3>
                  <p className="text-muted mb-0">Following</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div
            className="card shadow border-0 mb-4"
            style={{ borderRadius: "16px" }}
          >
            <div className="card-body p-4">
              <h4 className="fw-bold mb-3">Edit Bio</h4>
              <p className="text-muted">
                Update your bio so others can know more about you.
              </p>

              <textarea
                className="form-control mb-3"
                rows="4"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write something about yourself..."
                style={{ borderRadius: "12px", resize: "none" }}
              />

              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-success px-4"
                  onClick={updateBio}
                  style={{ borderRadius: "10px" }}
                >
                  Save Bio
                </button>
              </div>
            </div>
          </div>

          {/* Upload Profile Picture */}
          <div
            className="card shadow border-0 mb-4"
            style={{ borderRadius: "16px" }}
          >
            <div className="card-body p-4">
              <h4 className="fw-bold mb-3">Profile Picture</h4>
              <p className="text-muted">
                Upload a new profile photo to personalize your account.
              </p>

              <input
                type="file"
                className="form-control mb-3"
                accept="image/*"
                onChange={handleProfilePicChange}
              />

              {preview && (
                <div className="mb-3">
                  <img
                    src={preview}
                    alt="Preview"
                    className="img-fluid rounded shadow-sm"
                    style={{
                      maxHeight: "250px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}

              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-primary px-4"
                  onClick={uploadProfilePic}
                  style={{ borderRadius: "10px" }}
                >
                  Upload Picture
                </button>
              </div>
            </div>
          </div>

          {/* Create Post */}
          <CreatePost refreshPosts={fetchPosts} />

          {/* My Posts */}
          <div
            className="card shadow border-0"
            style={{ borderRadius: "16px" }}
          >
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4">My Posts</h4>

              {posts.length === 0 ? (
                <div className="text-center py-4">
                  <h5 className="mb-2">No posts yet</h5>
                  <p className="text-muted mb-0">
                    Start sharing your thoughts or upload an image post.
                  </p>
                </div>
              ) : (
                posts.map((post) => (
                  <div
                    key={post._id}
                    className="card shadow-sm border-0 mb-3"
                    style={{ borderRadius: "14px" }}
                  >
                    <div className="card-body">
                      {post.content && (
                        <p className="mb-3">{post.content}</p>
                      )}

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

                      <div className="d-flex justify-content-between flex-wrap gap-2">
                        <small className="text-muted">
                          ❤️ {post.likes.length} Likes
                        </small>

                        <small className="text-muted">
                          {new Date(post.createdAt).toLocaleString()}
                        </small>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;