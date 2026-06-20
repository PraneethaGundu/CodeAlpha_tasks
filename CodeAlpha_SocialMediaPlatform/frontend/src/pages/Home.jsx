import { useEffect, useState } from "react";
import API from "../api/api";
import CreatePost from "../components/CreatePost";
import CommentBox from "../components/CommentBox";
import CommentsList from "../components/CommentsList";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
function Home() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] =
    useState(null);
  const [editedContent, setEditedContent] =
    useState("");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [currentUser, setCurrentUser] =
  useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    fetchPosts();
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
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

    setCurrentUser(res.data);
  } catch (error) {
    console.log(error);
  }
};

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
  className={`container mt-4 ${
    darkMode
      ? "bg-dark text-white rounded p-3"
      : ""
  }`}
>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Navbar */}
          <Navbar />
             

          {/* Heading */}
          <h2 className="text-center fw-bold mb-4">
            Social Feed
          </h2>

          {/* Create Post */}
          <div className="card shadow border-0 mb-4">
            <div className="card-body">
              <CreatePost
                refreshPosts={fetchPosts}
              />
            </div>
          </div>

          {/* Posts */}
          {posts.map((post) => (
            <div
              key={post._id}
              className="card shadow border-0 mb-4"
              style={{
                borderRadius: "15px",
              }}
            >
              <div className="card-body">
                {/* User Info */}
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={
                      post.user?.profilePic
                        ? `http://localhost:5000/${post.user.profilePic}`
                        : "https://via.placeholder.com/50"
                    }
                    alt="Profile"
                    width="50"
                    height="50"
                    className="rounded-circle me-3 border"
                    style={{
                      objectFit: "cover",
                    }}
                  />

                  <div>
                    <Link
  to={`/user/${post.user?._id}`}
  className="text-decoration-none"
>
  <h5 className="mb-0">
    {post.user?.username}
  </h5>
</Link>

                    <small className="text-muted">
                      {new Date(
                        post.createdAt
                      ).toLocaleString()}
                    </small>
                  </div>
                </div>

                {/* Edit Mode */}
                {editingPost ===
                post._id ? (
                  <>
                    <textarea
                      className="form-control mb-3"
                      rows="3"
                      value={
                        editedContent
                      }
                      onChange={(e) =>
                        setEditedContent(
                          e.target.value
                        )
                      }
                    />

                    <button
                      className="btn btn-success"
                      onClick={async () => {
                        try {
                          const token =
                            localStorage.getItem(
                              "token"
                            );

                          await API.put(
                            `/posts/edit/${post._id}`,
                            {
                              content:
                                editedContent,
                            },
                            {
                              headers: {
                                Authorization:
                                  token,
                              },
                            }
                          );

                          setEditingPost(
                            null
                          );
                          setEditedContent(
                            ""
                          );

                          fetchPosts();
                        } catch (
                          error
                        ) {
                          console.log(
                            error
                          );
                        }
                      }}
                    >
                      Save
                    </button>

                    <button
                      className="btn btn-secondary ms-2"
                      onClick={() => {
                        setEditingPost(
                          null
                        );
                        setEditedContent(
                          ""
                        );
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <p className="fs-6">
                      {post.content}
                    </p>

                    {post.image && (
                      <img
                        src={`http://localhost:5000/${post.image}`}
                        alt="Post"
                        className="img-fluid rounded mb-3 shadow-sm"
                        style={{
                          maxHeight:
                            "450px",
                          width: "100%",
                          objectFit:
                            "cover",
                        }}
                      />
                    )}
                  </>
                )}

                <p className="text-muted">
                  ❤️{" "}
                  {
                    post.likes.length
                  }{" "}
                  Likes
                </p>

                {/* Buttons */}
                <div className="mb-3">
                  <button
  className={
    post.likes.includes(
      currentUser?._id
    )
      ? "btn btn-danger"
      : "btn btn-success"
  }
  onClick={async () => {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      await API.put(
        `/posts/like/${post._id}`,
        {},
        {
          headers: {
            Authorization:
              token,
          },
        }
      );

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  }}
>
  {post.likes.includes(
    currentUser?._id
  )
    ? "❤️ Liked"
    : "🤍 Like"}
</button>

                  <button
                    className="btn btn-warning ms-2"
                    onClick={() => {
                      setEditingPost(
                        post._id
                      );
                      setEditedContent(
                        post.content
                      );
                    }}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="btn btn-danger ms-2"
                    onClick={async () => {
                      const confirmDelete =
                        window.confirm(
                          "Are you sure you want to delete this post?"
                        );

                      if (
                        !confirmDelete
                      )
                        return;

                      try {
                        const token =
                          localStorage.getItem(
                            "token"
                          );

                        await API.delete(
                          `/posts/${post._id}`,
                          {
                            headers: {
                              Authorization:
                                token,
                            },
                          }
                        );

                        fetchPosts();
                      } catch (
                        error
                      ) {
                        console.log(
                          error
                        );
                      }
                    }}
                  >
                    🗑 Delete
                  </button>
                </div>

                {/* Comments */}
                <div className="mt-3">
                  <CommentBox
                    postId={
                      post._id
                    }
                  />
                </div>

                <div className="mt-3">
                  <CommentsList
                    postId={
                      post._id
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;