import { createSlice } from "@reduxjs/toolkit";

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
