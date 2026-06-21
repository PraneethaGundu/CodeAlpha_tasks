import { useState } from "react";
import API from "../api/api";

function CreatePost({ refreshPosts }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() && !image) {
      alert("Please write something or choose an image");
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
      setPreview("");

      refreshPosts();

      alert("Post created successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow border-0 mb-4" style={{ borderRadius: "16px" }}>
      <div className="card-body p-4">
        <h4 className="fw-bold mb-3">Create Post</h4>
        <p className="text-muted mb-3">
          Share your thoughts, updates, or an image with your followers.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Post Content */}
          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              borderRadius: "12px",
              resize: "none",
            }}
          />

          {/* Image Upload */}
          <label className="form-label fw-semibold">
            Add an image (optional)
          </label>
          <input
            type="file"
            className="form-control mb-3"
            accept="image/*"
            onChange={handleImageChange}
          />

          {/* Image Preview */}
          {preview && (
            <div className="mb-3">
              <img
                src={preview}
                alt="Preview"
                className="img-fluid rounded shadow-sm mb-2"
                style={{
                  maxHeight: "300px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />

              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={removeImage}
              >
                Remove Image
              </button>
            </div>
          )}

          {/* Submit Button */}
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary px-4"
              disabled={loading}
              style={{ borderRadius: "10px" }}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;