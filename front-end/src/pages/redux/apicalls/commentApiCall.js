import request from "../../../utils/axios";
import { commentsActions } from "../slices/CommentSlice";
import { actionsPosts } from "../slices/PostAuthSlice";
import { toast } from "react-toastify";

export const createCommentApiCall = (commentInfo) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(`/api/comments/`, commentInfo, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(actionsPosts.addCommentToPost(data));
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
    }
  };
};

export const updateCommentApiCall = (commentId, commentInfo) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/comments/${commentId}`,
        commentInfo,
        {
          headers: {
            Authorization: "bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(actionsPosts.addCommentToPost(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const deleteCommentApiCall = (id) => {
  return async (dispatch, getState) => {
    try {
      const data = await request.delete(`/api/comments/${id}`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      toast.success(data.message);
      await dispatch(commentsActions.deleteComment(id));
      await dispatch(actionsPosts.deleteCommentPost(id));
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
    }
  };
};

export const getAllCommentsApiCall = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/comments/`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(commentsActions.setAllComments(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};

export const countCommentsApiCall = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/comments/count`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(commentsActions.countComments(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
};
