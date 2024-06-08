import { createSlice } from "@reduxjs/toolkit";
import { UserInformation } from "../type/UserType";

const userInformation: UserInformation = {
  user: null,
  userDocumentID: null,
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
      state.userDocumentID = null;
    },
    attachDocumentID: (state, action) => {
      state.userDocumentID = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { login, logout, attachDocumentID } = userSlice.actions;
