import { createSlice } from "@reduxjs/toolkit"

const navSlice = createSlice({
  name: "nav",
  initialState: {
    origin: {"lat": 8.9879715, "lng": 38.78918609999999}, // default location
    destination: {"lat": 7.9879715, "lng": 48.78918609999999},
    tripInfo: {distance: 0, trip_time: 0}
  },
  reducers: {
    setOrigin(state, action) {
      state.origin = action.payload
    },
    setDestination(state, action) {
      state.destination = action.payload
    },
    setTripInfo(state, action) {
      state.tripInfo = action.payload
    }
  }
})

export const { setOrigin, setDestination, setTripInfo } = navSlice.actions

export default navSlice.reducer