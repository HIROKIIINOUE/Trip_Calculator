import { createSlice } from "@reduxjs/toolkit";
import { CurrencyType } from "../type/currencyType";


const currencyInformation: CurrencyType = {
  currencyRateList: null,
  currentCurrency: null,
  countryNameList: null,
  currentCountryName: null,
};

export const currencySlice = createSlice({
  name: "currencyRate",
  initialState: currencyInformation,
  reducers: {
    setCurrencyInfo: (state, action) => {
      state.currencyRateList = action.payload;
    },
    setCurrentCurrency: (state, action) => {
      state.currentCurrency = action.payload;
    },
    setCountryNameList: (state, action) => {
      state.countryNameList = action.payload;
    },
    setCurrentCountryName: (state, action) => {
      state.currentCountryName = action.payload;
    },
  },
});

export default currencySlice.reducer;
export const {
  setCurrencyInfo,
  setCurrentCurrency,
  setCountryNameList,
  setCurrentCountryName,
} = currencySlice.actions;
