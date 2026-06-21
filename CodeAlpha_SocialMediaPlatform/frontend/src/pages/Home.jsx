import { useEffect, useState } from "react";
import API from "../api/api";
import CreatePost from "../components/CreatePost";
import CommentBox from "../components/CommentBox";
import CommentsList from "../components/CommentsList";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchPosts();
    fetchCurrentUser();
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

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/posts/like/${postId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (postId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/posts/${postId}`, {
        headers: {
          Authorization: token,
        },
      });

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveEdit = async (postId) => {
    if (!editedContent.trim()) {
      alert("Post content cannot be empty");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/posts/edit/${postId}`,
        {
          content: editedContent,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setEditingPost(null);
      setEditedContent("");
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const username = post.user?.username?.toLowerCase() || "";
    const content = post.content?.toLowerCase() || "";

    return (
      username.includes(search.toLowerCase()) ||
      content.includes(search.toLowerCase())
    );
  });

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {/* Navbar */}
          <Navbar />

          {/* Page Heading */}
          <div className="text-center mb-4">
            <h2 className="fw-bold">Social Feed</h2>
            <p className="text-muted mb-0">
              Explore posts, like, comment, and connect with others.
            </p>
          </div>

          {/* Search */}
          <div className="card shadow border-0 mb-4" style={{ borderRadius: "16px" }}>
            <div className="card-body">
              <input
                type="text"
                className="form-control"
                placeholder="Search posts by username or content..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ borderRadius: "10px" }}
              />
            </div>
          </div>

          {/* Create Post */}
          <CreatePost refreshPosts={fetchPosts} />

          {/* Posts */}
          {filteredPosts.length === 0 ? (
            <div className="card shadow border-0 text-center p-4">
              <h5 className="mb-2">No posts found</h5>
              <p className="text-muted mb-0">
                Try searching with a different keyword or create a new post.
              </p>
            </div>
          ) : (
            filteredPosts.map((post) => {
              const isOwner = currentUser?._id === post.user?._id;
              const isLiked = post.likes.includes(currentUser?._id);

              return (
                <div
                  key={post._id}
                  className="card shadow border-0 mb-4"
                  style={{ borderRadius: "16px" }}
                >
                  <div className="card-body p-4">
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
                        style={{ objectFit: "cover" }}
                      />

                      <div>
                        <Link
                          to={`/user/${post.user?._id}`}
                          className="text-decoration-none"
                        >
                          <h5 className="mb-0 text-dark">
                            {post.user?.username}
                          </h5>
                        </Link>

                        <small className="text-muted">
                          {new Date(post.createdAt).toLocaleString()}
                        </small>
                      </div>
                    </div>

                    {/* Post Content / Edit Mode */}
                    {editingPost === post._id ? (
                      <div className="mb-3">
                        <textarea
                          className="form-control mb-3"
                          rows="3"
                          value={editedContent}
                          onChange={(e) =>
                            setEditedContent(e.target.value)
                          }
                          style={{ borderRadius: "10px" }}
                        />

                        <button
                          className="btn btn-success me-2"
                          onClick={() => handleSaveEdit(post._id)}
                        >
                          Save
                        </button>

                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            setEditingPost(null);
                            setEditedContent("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        {post.content && (
                          <p className="fs-6 mb-3">{post.content}</p>
                        )}

                        {post.image && (
                          <img
                            src={`http://localhost:5000/${post.image}`}
                            alt="Post"
                            className="img-fluid rounded mb-3 shadow-sm"
                            style={{
                              maxHeight: "450px",
                              width: "100%",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </>
                    )}

                    {/* Likes Count */}
                    <p className="text-muted mb-3">
                      ❤️ {post.likes.length} Likes
                    </p>

                    {/* Action Buttons */}
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      <button
                        className={
                          isLiked
                            ? "btn btn-danger"
                            : "btn btn-outline-success"
                        }
                        onClick={() => handleLike(post._id)}
                      >
                        {isLiked ? "❤️ Liked" : "🤍 Like"}
                      </button>

                      {isOwner && (
                        <>
                          <button
                            className="btn btn-warning"
                            onClick={() => {
                              setEditingPost(post._id);
                              setEditedContent(post.content);
                            }}
                          >
                            ✏️ Edit
                          </button>

                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(post._id)}
                          >
                            🗑 Delete
                          </button>
                        </>
                      )}
                    </div>

                    {/* Comment Box */}
                    <div className="mt-3">
                      <CommentBox postId={post._id} />
                    </div>

                    {/* Comments List */}
                    <div className="mt-3">
                      <CommentsList postId={post._id} />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;