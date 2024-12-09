import React, { useEffect } from "react";
import SidebarDashboard from "./SidebarDashboard";
import "./admin-table.css";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCommentApiCall,
  getAllCommentsApiCall,
} from "../redux/apicalls/commentApiCall";

const CommentsDashboard = () => {
  const { comments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCommentsApiCall());
  }, []);
  const deleteOne = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteCommentApiCall(commentId));
      }
    });
  };
  return (
    <section className="container-table-page">
      <SidebarDashboard />
      <div className="admin-table">
        <h5 className="title-header">Comments</h5>
        <table className="table-container">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((item, index) => (
              <tr key={item._id}>
                <td className="number">{index + 1}</td>
                <td>
                  <div className="img-and-name">
                    <img
                      src={item.user.profilePhoto?.url}
                      className="tabel-img"
                      alt="pic"
                    />
                    <span>{item.user.username}</span>
                  </div>
                </td>
                <td>{item.description}</td>
                <td>
                  <div className="table-btns-group">
                    <button
                      onClick={() => deleteOne(item._id)}
                      style={{ backgroundColor: "var(--red-color)" }}
                    >
                      Delete comment
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CommentsDashboard;
