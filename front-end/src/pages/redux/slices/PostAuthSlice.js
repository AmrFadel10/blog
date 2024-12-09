import { createSlice } from "@reduxjs/toolkit";

const postAuthSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    postsCategory: [],
    postsById: [],
    postsCount: null,
    loading: false,
    isPostCreated: false,
    post: null,
  },
  reducers: {
    getAllposts(state, action) {
      state.posts = action.payload;
    },
    getAllpostsCategory(state, action) {
      state.postsCategory = action.payload;
    },
    getAllpostsById(state, action) {
      state.postsById = action.payload;
    },
    getPostsCount(state, action) {
      state.postsCount = action.payload;
    },
    setloading(state) {
      state.loading = true;
    },
    setIsPostCreated(state) {
      state.isPostCreated = true;
      state.loading = false;
    },
    clearPostCreated(state) {
      state.isPostCreated = false;
      state.loading = false;
    },
    clearLoading(state) {
      state.loading = false;
    },
    getPost(state, action) {
      state.post = action.payload;
    },
    updatePost(state, action) {
      state.post = action.payload;
    },
    addCommentToPost(state, action) {
      state.post.comments.push(action.payload);
    },
    updateCommentPost(state, action) {
      state.post.comments = state.post.comments.map((comment) =>
        comment._id === action.payload._id ? action.payload : comment
      );
    },
    deleteCommentPost(state, action) {
      state.post.comments = state.post.comments.filter((comment) => {
        return comment._id !== action.payload;
      });
    },
    deletePost(state, action) {
      state.posts = state.posts.filter((post) => {
        return post._id !== action.payload;
      });
    },
    toggleLikePost(state, action) {
      const checkLike = state.post.Likes.find((id) => id === action.payload);
      !!checkLike
        ? (state.post.Likes = state.post.Likes.filter(
            (like) => like !== action.payload
          ))
        : state.post.Likes.push(action.payload);
    },
  },
});

const actionsPosts = postAuthSlice.actions;
const reducerPosts = postAuthSlice.reducer;
export { actionsPosts, reducerPosts };
