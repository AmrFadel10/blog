import { toast } from "react-toastify";
import request from "../../../utils/axios.js";
import { actionsProfile } from "../slices/ProfileSlice.js";
import { authActions } from "../slices/AuthSlice.js";

export const profileApiCall = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userId}`);
      dispatch(actionsProfile.getProfile(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const getAllProfilesApiCall = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/profile/`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(actionsProfile.getAllProfiles(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

// export const deleteProfileApiCall = (id) => {
//   return async (dispatch, getState) => {
//     try {
//       const { data } = await request.delete(`api/users/profile/${id}`, {
//         headers: {
//           Authorization: "bearer " + getState().auth.user.token,
//         },
//       });
//       dispatch(actionsProfile.deleteProfile(id));
//       toast.success(data.message);
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };
// };

export const profilesCountApiCall = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get("api/users/count", {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(actionsProfile.getCountProfiles(data.usersCount));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const profilePhotoApiCall = (photo) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        "/api/users/profile/profile-photo-upload",
        photo,
        {
          headers: {
            Authorization: "bearer " + getState().auth.user.token,
            "content-type": "multipart/form-data",
          },
        }
      );

      dispatch(actionsProfile.setProfilePhoto(data.profilePhoto));
      dispatch(authActions.setUserPhoto(data.profilePhoto));
      toast.success(data.message);
      //Change localstorage
      const result = JSON.parse(localStorage.getItem("userInfo"));
      result.profilePhoto = data.profilePhoto;
      localStorage.setItem("userInfo", JSON.stringify(result));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const updateProfileApiCall = (userId, info) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/users/profile/${userId}`, info, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });

      dispatch(actionsProfile.updateProfile(data));
      dispatch(authActions.updateUsername(data.username));

      //Change username in localStroage
      const result = JSON.parse(localStorage.getItem("userInfo"));
      result.username = data.username;
      localStorage.setItem("userInfo", JSON.stringify(result));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const deleteProfileApiCall = (userId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(actionsProfile.setLoading());
      const { data } = await request.delete(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      toast.success(data?.message);
      dispatch(actionsProfile.deleteProfile(userId));
      dispatch(actionsProfile.setIsProfileDeleted());

      setTimeout(() => dispatch(actionsProfile.clearIsProfileDeleted()), 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(actionsProfile.clearLoading());
    }
  };
};
