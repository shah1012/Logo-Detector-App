import { createSlice } from "@reduxjs/toolkit";

const initial = {
  id: "",
  username: "",
  email: "",
};

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: initial,
  },
  reducers: {
    login: (state, action) => {
      const { id, email, username } = action.payload;
      state.user = {
        id,
        username,
        email,
      };
    },
    logout: (state) => {
      state.user = initial;
    },

    signUp: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const selectUser = (state: any) => state.user.user;
export const { login, logout, signUp } = UserSlice.actions;
export default UserSlice.reducer;
