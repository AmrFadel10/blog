import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/AuthSlice";
import { reducerprofile } from "./slices/ProfileSlice";
import { reducerPosts } from "./slices/PostAuthSlice";
import { categoryReducer } from "./slices/CategorySlice";
import { commentsReducer } from "./slices/CommentSlice";
import { passwordReducer } from "./slices/PasswordSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: reducerprofile,
    posts: reducerPosts,
    category: categoryReducer,
    comment: commentsReducer,
    password: passwordReducer,
  },
});

export default store;
