import { createSlice } from "@reduxjs/toolkit";
import { CurrencyType } from "../type/currencyType";

// 自分用：currencyRateListの初期値をローカルデータで保持する
const getCurrencyRateListFromLocalStorageValue = (
  key: string,
  initialValue: null
) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : initialValue;
};

// 自分用：currencyNameListの初期値をローカルデータで保持する
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
