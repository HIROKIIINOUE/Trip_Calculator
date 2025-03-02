import { createSlice } from "@reduxjs/toolkit";

// ローカルストレージ使用しなくてReduxのみで管理するとページ更新時に毎回Databaseへの接続のためラグが起きる
// →ページを更新する度にWeb画面がガタガタしてしまう
// Keep initial data with local storage in order to decrease the occasions to connect database
const getLocalStorageValue = (key: string, initialValue: []) => {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : initialValue;
};

const initialTripList = {
  trip: getLocalStorageValue("tripList", []),
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
