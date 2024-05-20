import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import languageReducer from "../slices/languageSlice";
import currencyReducer from "../slices/currencySlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    language: languageReducer,
    currency: currencyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
