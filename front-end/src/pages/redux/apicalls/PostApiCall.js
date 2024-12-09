import request from "../../../utils/axios";
import { actionsPosts } from "../slices/PostAuthSlice";
import { toast } from "react-toastify";

export const postsApiCall = (page) => {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/?page=${page}`);
      dispatch(actionsPosts.getAllposts(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const getAllPostsApiCall = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/posts`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(actionsPosts.getAllposts(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const postsCategoryApiCall = (category) => {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?category=${category}`);
      dispatch(actionsPosts.getAllpostsCategory(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

// export const postsByIdApiCall = (id) => {
//   return async (dispatch) => {
//     try {
//       const { data } = await request.get(`/api/users/profile/${id}`);
//       console.log(data);
//       dispatch(actionsPosts.getAllpostsById(data));
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };
// };

export const postsCountApiCall = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get("/api/posts/count");
      dispatch(actionsPosts.getPostsCount(data.postCount));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const createPostApiCall = (postInfo) => {
  return async (dispatch, getState) => {
    try {
      dispatch(actionsPosts.setloading());
      await request.post(`/api/posts`, postInfo, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(actionsPosts.setIsPostCreated());
      setTimeout(() => {
        dispatch(actionsPosts.clearPostCreated());
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(actionsPosts.clearLoading());
    }
  };
};

export const getSinglePostApiCall = (postId) => {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/${postId}`);
      dispatch(actionsPosts.getPost(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const updatePostApiCall = (postId, info) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/posts/${postId}`, info, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(actionsPosts.updatePost(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const updateprofilePhotoApiCall = (id, info) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/posts/upload-image/${id}`,
        info,
        {
          headers: {
            Authorization: "bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const deletePostApiCall = (id) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/posts/${id}`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const deletePostApiCallForDashboard = (id) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/posts/${id}`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(actionsPosts.deletePost(id));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const toggleLikePostApiCall = (postId, userId) => {
  return async (dispatch, getState) => {
    try {
      await request.put(`/api/posts/like/${postId}`, null, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(actionsPosts.toggleLikePost(userId));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};
