import { createSlice } from "@reduxjs/toolkit";

const CategorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    countCategories: null,
    loading: false,
    isCateCreated: false,
  },
  reducers: {
    getCategories(state, action) {
      state.categories = action.payload;
    },
    getCountCategories(state, action) {
      state.countCategories = action.payload;
    },
    deletecategory(state, action) {
      state.categories = state.categories.filter(
        (cate) => cate._id !== action.payload
      );
    },
    createCategory(state, action) {
      state.categories.push(action.payload);
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsCateCreated(state) {
      state.isCateCreated = true;
      state.loading = false;
    },
    clearIsCateCreated(state) {
      state.isCateCreated = false;
    },
  },
});

const categoryReducer = CategorySlice.reducer;
const categoryactions = CategorySlice.actions;

export { categoryReducer, categoryactions };
