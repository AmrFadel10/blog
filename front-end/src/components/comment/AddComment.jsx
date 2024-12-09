import React, { useState } from "react";
import "./addComment.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createCommentApiCall } from "../../pages/redux/apicalls/commentApiCall";

const AddComment = ({ postId }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const submitComment = (e) => {
    e.preventDefault();
    if (text === "") return toast.error("Please write something");
    dispatch(createCommentApiCall({ postId, description: text }));
    setText("");
  };
  return (
    <form className="comment-container" onSubmit={submitComment}>
      <input
        type="text"
        className="add-comment-input border"
        placeholder="Add a Comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="bg-zinc-800 hover:bg-zinc-950 text-zinc-50 rounded-full w-fit px-5 py-2 mt-6 text-sm font-semibold"
      >
        Comment
      </button>
    </form>
  );
};

export default AddComment;
