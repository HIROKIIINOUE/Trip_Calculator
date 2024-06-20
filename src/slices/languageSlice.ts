import { createSlice } from "@reduxjs/toolkit";
import { LanguageType } from "../type/LanguageType";

// 自分用：ローカルストレージを使用した初期値の設定。ページを更新してもデータが保持されるように設定。
const getLocalStorageValue = (key: string, initValue: string) => {
  const item = localStorage.getItem(key);

  return item ? item : initValue;
};
const initialLanguage: LanguageType = {
  language: getLocalStorageValue("language", "japanese"),
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
