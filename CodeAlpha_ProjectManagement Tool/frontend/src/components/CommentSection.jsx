import { useEffect, useState } from "react";
import API from "../api/api";
import socket from "../socket";

function CommentSection({ taskId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchComments();

    socket.on("commentAdded", () => {
      fetchComments();
    });

    return () => {
      socket.off("commentAdded");
    };
  }, [taskId]);

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${taskId}`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addComment = async () => {
    if (!text.trim()) return;

    try {
      await API.post("/comments", {
        taskId,
        text,
      });

      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <h4>Comments</h4>

      {comments.map((comment) => (
        <div key={comment._id}>
          <strong>{comment.user?.name}:</strong> {comment.text}
        </div>
      ))}

      <input
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addComment}>
        Add Comment
      </button>
    </div>
  );
}

export default CommentSection;