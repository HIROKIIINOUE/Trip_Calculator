// 次回ココから：ページが更新されてもtripデータが保持されるようにローカルストレージを使用。
// ローカルストレージを使用したsolutionをgithubのissueに記載することを忘れない。
// →参考リンク https://qiita.com/tronicboy/items/171c6d437fef2a881cac
// →参考リンク https://developer.mozilla.org/ja/docs/Web/API/Storage/removeItem

import { createSlice } from "@reduxjs/toolkit";
import { TripType } from "../type/TripType";

const initialTripList = {
  trip: [],
};

const tripSlice = createSlice({
  name: "trip",
  initialState: initialTripList,
  reducers: {
    getTripList: (state, action) => {
      state.trip = action.payload;
    },
    deleteTripList: (state) => {
      state.trip = [];
    },
  },
});

export default tripSlice.reducer;
export const { getTripList, deleteTripList } = tripSlice.actions;
