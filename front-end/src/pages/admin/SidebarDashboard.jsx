import React from "react";
import { Link } from "react-router-dom";

const SidebarDashboard = () => {
  return (
    <div className="sidebar-dashboard">
      <Link to={"/admin-dashboard"} className="dashborad-header">
        <h5>
          <i className="fa-solid fa-table-columns"></i>
          Dashborad
        </h5>
      </Link>
      <ul className="main-links">
        <Link to={"/admin-dashboard/users"} className="main-link">
          <i className="fa-regular fa-user"></i>
          Users
        </Link>
        <Link to={"/admin-dashboard/posts"} className="main-link">
          <i className="fa-regular fa-clipboard"></i>
          Posts
        </Link>
        <Link to={"/admin-dashboard/categories-table"} className="main-link">
          <i className="fa-solid fa-tag"></i>
          Categories
        </Link>
        <Link to={"/admin-dashboard/comments-table"} className="main-link">
          <i className="fa-regular fa-comment-dots"></i>
          Comments
        </Link>
      </ul>
    </div>
  );
};

export default SidebarDashboard;
