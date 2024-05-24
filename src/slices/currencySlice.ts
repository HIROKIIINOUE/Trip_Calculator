import { createSlice } from "@reduxjs/toolkit";
import { CurrencyType } from "../type/currencyType";

const currencyInformation: CurrencyType = {
  currencyRateList: null,
  currentCurrency: null,
  currencyNameList: null,
  currentCountryName: null,
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
    setCurrentCurrency: (state, action) => {
      state.currentCurrency = action.payload;
    },
    setCurrentCountryName: (state, action) => {
      state.currentCountryName = action.payload;
    },
  },
});

export default currencySlice.reducer;
export const {
  setCurrencyRateList,
  setCurrencyNameList,
  setCurrentCurrency,
  setCurrentCountryName,
} = currencySlice.actions;
