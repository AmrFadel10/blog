import { Link } from "react-router-dom";
import "./verify-email.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { VerifiedAccountApiCall } from "../redux/apicalls/AuthApiCall";
const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { isVerifiedAccount } = useSelector((state) => state.auth);
  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(VerifiedAccountApiCall(userId, token));
  }, []);
  return (
    <section className="verify-email-container">
      {isVerifiedAccount ? (
        <>
          <i className="fa-regular fa-circle-check icon"></i>
          <h1 className="verify-email-title">
            Your email address has been successfully verified
          </h1>
          <Link to={"/login"} className="verify-email-link">
            Go to Login page
          </Link>
        </>
      ) : (
        <>
          <h1 className="verify-email-not-found">Not Found</h1>
        </>
      )}
    </section>
  );
};

export default VerifyEmail;
