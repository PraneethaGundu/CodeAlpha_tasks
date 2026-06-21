import { useState } from "react";
import API from "../api/api";

function CreatePost({ refreshPosts }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() && !image) {
      alert("Please add text or an image");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("content", content);

      if (image) {
        formData.append("image", image);
      }

      await API.post("/posts/create", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      setContent("");
      setImage(null);

      if (refreshPosts) {
        refreshPosts();
      }

      alert("Post created successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h5 className="fw-bold mb-3">Create Post</h5>

        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control mb-3"
            rows="3"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <input
            type="file"
            className="form-control mb-3"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;