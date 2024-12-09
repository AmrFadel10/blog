import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: localStorage.getItem("userInfo")
			? JSON.parse(localStorage.getItem("userInfo"))
			: null,
		registerMessage: null,
		isVerifiedAccount: false,
	},
	reducers: {
		login(state, action) {
			state.user = action.payload;
			state.registerMessage = null;
		},
		register(state, action) {
			state.registerMessage = action.payload;
		},
		clearRegister(state, action) {
			state.registerMessage = null;
		},
		logout(state) {
			state.user = null;
		},
		setUserPhoto(state, action) {
			state.user.profilePhoto = action.payload;
		},
		updateUsername(state, action) {
			state.user.username = action.payload;
		},
		setIsVerifiedAccount(state) {
			state.isVerifiedAccount = true;
			state.registerMessage = null;
		},
	},
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;
export { authReducer, authActions };
