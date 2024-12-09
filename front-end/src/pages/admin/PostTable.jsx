import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SidebarDashboard from "./SidebarDashboard";
import "./admin-table.css";
import swal from "sweetalert";
import {
  deletePostApiCallForDashboard,
  getAllPostsApiCall,
} from "../redux/apicalls/PostApiCall";
import { useDispatch, useSelector } from "react-redux";
const PostTable = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getAllPostsApiCall());
  }, []);

  const deleteOne = (postId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePostApiCallForDashboard(postId));
      }
    });
  };
  return (
    <section className="container-table-page">
      <SidebarDashboard />
      <div className="admin-table">
        <h5 className="title-header">Posts</h5>
        <table className="table-container">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Post title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post._id}>
                <td className="number">{index + 1}</td>
                <td>
                  <div className="img-and-name">
                    <img
                      src="/images/user-avatar.png"
                      className="tabel-img"
                      alt="piz"
                    />
                    <span>{post.user.username}</span>
                  </div>
                </td>
                <td>{post.title}</td>
                <td>
                  <div className="table-btns-group">
                    <button>
                      <Link to={`/posts/details/${post._id}`}>View post</Link>
                    </button>
                    <button onClick={() => deleteOne(post._id)}>
                      Delete post
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

export default PostTable;
