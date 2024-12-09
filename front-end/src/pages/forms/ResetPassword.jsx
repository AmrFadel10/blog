import "./form.css";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  getResetPasswordApiCall,
  postResetPasswordApiCall,
} from "../redux/apicalls/PasswordApiCall";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { userId, token } = useParams();
  const dispatch = useDispatch();

  // From Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.error("Password is required");
    dispatch(postResetPasswordApiCall({ password }, userId, token));
  };

  useEffect(() => {
    dispatch(getResetPasswordApiCall(userId, token));
  }, [userId, token]);

  return (
    <section className="form-container">
      <h1 className="form-title">Reset Password</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            New Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="password"
            placeholder="Enter your new password"
            className="form-input"
          />
        </div>
        <button type="submit" className="form-btn">
          Submit
        </button>
      </form>
    </section>
  );
};

export default ResetPassword;
