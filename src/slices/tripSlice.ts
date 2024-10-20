import { createSlice } from "@reduxjs/toolkit";

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
