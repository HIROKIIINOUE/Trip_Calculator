import { createSlice } from "@reduxjs/toolkit";
import { LanguageType } from "../type/LanguageType";

// 自分用：ローカルストレージを使用した初期値の設定。ページを更新してもデータが保持されるように設定。
// reduxを使用しないでlocalStorageだけで管理しようとするとタイムリーに言語変換できない。
// localStorageを使用しないでreduxだけで管理しようとするとwebページを更新する際に日本語(デフォルト値)に戻ってしまう
// Keep initial data with local storage
const getLocalStorageValue = (key: string, initialValue: string) => {
  const item = localStorage.getItem(key);

  return item ? item : initialValue;
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
