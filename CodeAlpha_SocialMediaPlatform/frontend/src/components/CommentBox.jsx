import { useState } from "react";
import API from "../api/api";

function CommentBox({ postId }) {
  const [text, setText] = useState("");

  const addComment = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/comments/create",
        {
          post: postId,
          text,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setText("");
      alert("Comment Added");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Write a comment"
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
      />

      <button onClick={addComment}>
        Comment
      </button>
    </div>
  );
}

export default CommentBox;