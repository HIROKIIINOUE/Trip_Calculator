import { createSlice } from "@reduxjs/toolkit";
import { LanguageType } from "../type/LanguageType";

const initialLanguage: LanguageType = {
  language: "japanese",
};

export const languageSlice = createSlice({
  name: "language",
  initialState: initialLanguage,
  reducers: {
    selectLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export default languageSlice.reducer;
export const { selectLanguage } = languageSlice.actions;
