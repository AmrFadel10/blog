import React from "react";
import { Link } from "react-router-dom";
import "./notFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="error">404</div>
      <h5 className="heading-error"> Page Not Found</h5>
      <Link to={"/"} className="to-home">
        Go to home page
      </Link>
    </div>
  );
};

export default NotFound;
