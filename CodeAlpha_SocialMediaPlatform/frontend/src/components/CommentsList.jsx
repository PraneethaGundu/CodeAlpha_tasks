import { useEffect, useState } from "react";
import API from "../api/api";

function CommentsList({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await API.get(
        `/comments/post/${postId}`
      );

      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h5>Comments</h5>

      {comments.map((comment) => (
        <div key={comment._id}>
          <b>{comment.user?.username}</b>:{" "}
          {comment.text}
        </div>
      ))}
    </div>
  );
}

export default CommentsList;