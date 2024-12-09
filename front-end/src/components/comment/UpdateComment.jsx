import React, { useState } from "react";
import "./updateComment.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateCommentApiCall } from "../../pages/redux/apicalls/commentApiCall";
const UpdateComment = ({ setUpdateCommento, comment }) => {
  const [text, setText] = useState(comment?.description);
  const dispatch = useDispatch();
  const submitUpdateComment = (e) => {
    e.preventDefault();
    if (text === "") return toast.error("You Should to write something");
    dispatch(updateCommentApiCall(comment?._id, { description: text }));
    setUpdateCommento(false);
  };
  return (
    <div>
      <div className="update-comment-container">
        <form className="update-comment-form" onSubmit={submitUpdateComment}>
          <h3 className="header-update-comment">Update comment</h3>
          <abbr title="close">
            <i
              className="fa-solid fa-xmark"
              onClick={() => setUpdateCommento(false)}
            ></i>
          </abbr>
          <input
            type="text"
            className="update-comment-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button type="submit" className="update-comment-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateComment;
