import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    countComment: null,
  },
  reducers: {
    setAllComments(state, action) {
      state.comments = action.payload;
    },
    deleteComment(state, action) {
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload
      );
    },
    countComments(state, action) {
      state.countComment = action.payload;
    },
  },
});

const commentsActions = commentSlice.actions;
const commentsReducer = commentSlice.reducer;

export { commentsActions, commentsReducer };
