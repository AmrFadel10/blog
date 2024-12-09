import request from "../../../utils/axios";
import { toast } from "react-toastify";
import { passwordActions } from "../slices/PasswordSlice";

export const forgetPasswordApiCall = (email) => {
  return async () => {
    try {
      await request.post(`/api/password/forget-password-link`, email);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const getResetPasswordApiCall = (userId, token) => {
  return async (dispatch) => {
    try {
      await request.get(`/api/password/reset-password/${userId}/${token}`);
    } catch (error) {
      dispatch(passwordActions.setIsError());
      toast.error(error.response.data.message);
    }
  };
};

export const postResetPasswordApiCall = (password, userId, token) => {
  return async () => {
    try {
      await request.post(
        `/api/password/reset-password/${userId}/${token}`,
        password
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};
