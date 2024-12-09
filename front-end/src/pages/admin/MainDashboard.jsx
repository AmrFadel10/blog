import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryCountApiCall,
  createCategoryApiCall,
} from "../redux/apicalls/categoryApiCall";
import { postsCountApiCall } from "../redux/apicalls/PostApiCall";
import { profilesCountApiCall } from "../redux/apicalls/ProfileApiCall";
import { countCommentsApiCall } from "../redux/apicalls/commentApiCall";

const MainDashboard = () => {
  const [category, setCategory] = useState("");
  const { countCategories, isCateCreated } = useSelector(
    (state) => state.category
  );
  const { postsCount } = useSelector((state) => state.posts);
  const { countProfiles } = useSelector((state) => state.profile);
  const { countComment } = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  const submitCategory = (e) => {
    e.preventDefault();
    if (category.trim() === "")
      return toast.error("You should write category name");
    dispatch(createCategoryApiCall({ title: category }));
  };
  useEffect(() => {
    dispatch(categoryCountApiCall());
    dispatch(postsCountApiCall());
    dispatch(profilesCountApiCall());
    dispatch(countCommentsApiCall());
  }, [isCateCreated]);
  return (
    <main className="main-dashboard">
      <div className="card-container">
        <div className="card">
          <h6 className="username">Users</h6>
          <div className="count">{countProfiles}</div>
          <div className="see-all">
            <Link to={"/admin-dashboard/users"}>See all users</Link>
            <i className="fa-regular fa-user"></i>
          </div>
        </div>
        <div className="card">
          <h6 className="username">Posts</h6>
          <div className="count">{postsCount} </div>
          <div className="see-all">
            <Link to={"/admin-dashboard/posts"}>See all posts</Link>
            <i className="fa-regular fa-clipboard"></i>
          </div>
        </div>
        <div className="card">
          <h6 className="username">Categories</h6>
          <div className="count">{countCategories} </div>
          <div className="see-all">
            <Link to={"/admin-dashboard/categories-table"}>
              See all categories
            </Link>
            <i className="fa-solid fa-tag"></i>
          </div>
        </div>
        <div className="card">
          <h6 className="username">Comments</h6>
          <div className="count">{countComment} </div>
          <div className="see-all">
            <Link to={"/admin-dashboard/comments-table"}>See comments</Link>
            <i className="fa-regular fa-comment-dots"></i>
          </div>
        </div>
      </div>
      <div className="add-category">
        <h5 className="new-category-header">Add New Cateegory</h5>
        <form className="add-catgeory-form" onSubmit={submitCategory}>
          <label htmlFor="add-cat" className="add-cat-label">
            Category Title
          </label>
          <input
            type="text"
            id="add-cat"
            className="add-cat border"
            placeholder=" Add category"
            onChange={(e) => setCategory(e.target.value)}
          />
          <button type="submit" className="add-cat-btn">
            Add
          </button>
        </form>
      </div>
    </main>
  );
};

export default MainDashboard;
