import { createSlice } from "@reduxjs/toolkit";
import { CurrencyType } from "../type/CurrencyType";

// 自分用：currencyRateListの初期値をローカルデータで保持する
// Keep initial currencyRateList with local storage
const getCurrencyRateListFromLocalStorageValue = (
  key: string,
  initialValue: null
) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : initialValue;
};

// ローカルストレージを使用せずReduxだけで管理すると２ページ目でも毎回レートのAPIを叩かなければならない。
// →APIを叩く回数を減らすためローカルストレージを使用
// Use local storage in order to decrease the occasions to call API
const getCurrencyNameListLocalStorageValue = (
  key: string,
  initialValue: null
) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : initialValue;
};

const currencyInformation: CurrencyType = {
  currencyRateList: getCurrencyRateListFromLocalStorageValue(
    "currencyRateList",
    null
  ),
  currencyNameList: getCurrencyNameListLocalStorageValue(
    "currencyNameList",
    null
  ),
};

export const currencySlice = createSlice({
  name: "currencyRate",
  initialState: currencyInformation,
  reducers: {
    setCurrencyRateList: (state, action) => {
      state.currencyRateList = action.payload;
    },
    setCurrencyNameList: (state, action) => {
      state.currencyNameList = action.payload;
    },
  },
});

export default currencySlice.reducer;
export const { setCurrencyRateList, setCurrencyNameList } =
  currencySlice.actions;
