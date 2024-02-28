import { createSlice } from "@reduxjs/toolkit";
import { UserInformation } from "../type/UserType";


const userInformation: UserInformation = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: userInformation,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
export const { login, logout } = userSlice.actions;