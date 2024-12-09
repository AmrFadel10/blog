import React, { useState } from "react";
import "./commentsList.css";
import swal from "sweetalert";
import UpdateComment from "./UpdateComment.jsx";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { deleteCommentApiCall } from "../../pages/redux/apicalls/commentApiCall";
const CommentsList = ({ comments, user, post }) => {
  const [updateCommento, setUpdateCommento] = useState(false);
  const [getComment, setGetComment] = useState(null);
  const dispatch = useDispatch();
  const editComment = (comment) => {
    setUpdateCommento(true);
    setGetComment(comment);
  };
  const deletePostHandler = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteCommentApiCall(id));
      } else {
        swal("Your post is safe!");
      }
    });
  };
  return (
    <div className="comment-list">
      <h3 className="header-comment-list">{comments?.length} Comments</h3>
      {comments?.map((comment) => (
        <div className="comments-container" key={comment._id}>
          <div className="comment-in-list">
            <div className="username-date">
              <h4 className="username">{comment.username}</h4>
              <div className="date">
                {
                  <Moment fromNow ago>
                    {comment.createdAt}
                  </Moment>
                }
              </div>
            </div>
            <div className="comment-content">{comment.description}</div>
            <div className="edit-delete">
              {user?._id === post?.user?._id && (
                <>
                  <i
                    className="fa-regular fa-pen-to-square edit"
                    onClick={() => editComment(comment)}
                  ></i>
                  <i
                    className="fa-regular fa-trash-can delete"
                    onClick={() => deletePostHandler(comment._id)}
                  ></i>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
      {updateCommento && (
        <UpdateComment
          setUpdateCommento={setUpdateCommento}
          comment={getComment}
        />
      )}
    </div>
  );
};

export default CommentsList;
