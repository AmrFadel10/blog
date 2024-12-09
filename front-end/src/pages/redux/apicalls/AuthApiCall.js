import { authActions } from "../slices/AuthSlice";
import request, { DOMAIN } from "../../../utils/axios";
import { toast } from "react-toastify";

const authApiCall = (user) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${DOMAIN}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(authActions.login(data));
    } catch (error) {
      // console.log(error.message);
      toast.error(error.message);
    }
  };
};

const registerAuthApiCall = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);
      dispatch(authActions.register(data.message));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};
const logoutAuthApiCall = () => {
  return async (dispatch) => {
    try {
      dispatch(authActions.logout());
      localStorage.removeItem("userInfo");
    } catch (error) {
      console.log(error);
    }
  };
};

const VerifiedAccountApiCall = (userId, token) => {
  return async (dispatch) => {
    try {
      await request.get(`api/auth/${userId}/verify/${token}`);
      dispatch(authActions.setIsVerifiedAccount());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};
export {
  authApiCall,
  registerAuthApiCall,
  logoutAuthApiCall,
  VerifiedAccountApiCall,
};
