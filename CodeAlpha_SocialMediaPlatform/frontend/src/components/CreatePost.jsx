import { useState } from "react";
import API from "../api/api";

function CreatePost({ refreshPosts }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append(
        "content",
        content
      );

      if (image) {
        formData.append(
          "image",
          image
        );
      }

      await API.post(
        "/posts/create",
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setContent("");
      setImage(null);

      refreshPosts();

      alert("Post created successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to create post");
    }
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        <h4>Create Post</h4>

        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control mb-3"
            rows="3"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) =>
              setContent(
                e.target.value
              )
            }
          />

          <input
            type="file"
            className="form-control mb-3"
            onChange={(e) =>
              setImage(
                e.target.files[0]
              )
            }
          />

          <button
            type="submit"
            className="btn btn-primary"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;