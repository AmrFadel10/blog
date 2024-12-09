const { createSlice } = require("@reduxjs/toolkit");

const passwordSlice = createSlice({
  name: "password",
  initialState: {
    isError: false,
  },
  reducers: {
    setIsError(state) {
      state.isError = true;
    },
  },
});

const passwordReducer = passwordSlice.reducer;
const passwordActions = passwordSlice.actions;

export { passwordReducer, passwordActions };
