import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import languageReducer from "../slices/languageSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    language: languageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
