import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    isLoading: false,
    isProfileDeleted: false,
    profiles: [],
    countProfiles: null,
  },
  reducers: {
    getProfile: (state, action) => {
      state.profile = action.payload;
    },
    setProfilePhoto: (state, action) => {
      state.profile.profilePhoto = action.payload;
    },
    updateProfile(state, action) {
      state.profile = action.payload;
    },
    setLoading(state) {
      state.isLoading = true;
    },
    clearLoading(state) {
      state.isLoading = false;
    },
    setIsProfileDeleted(state) {
      state.isProfileDeleted = true;
      state.isLoading = false;
    },
    clearIsProfileDeleted(state) {
      state.isProfileDeleted = false;
    },
    getAllProfiles(state, action) {
      state.profiles = action.payload;
    },
    deleteProfile(state, action) {
      state.profiles = state.profiles.filter(
        (item) => item._id !== action.payload
      );
    },
    getCountProfiles(state, action) {
      state.countProfiles = action.payload;
    },
  },
});
const reducerprofile = ProfileSlice.reducer;
const actionsProfile = ProfileSlice.actions;
export { reducerprofile, actionsProfile };
