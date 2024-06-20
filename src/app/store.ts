import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import languageReducer from "../slices/languageSlice";
import currencyReducer from "../slices/currencySlice";
import tripReducer from "../slices/tripSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    language: languageReducer,
    currency: currencyReducer,
    trip: tripReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
