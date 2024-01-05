import { createSlice } from "@reduxjs/toolkit"

const navSlice = createSlice({
  name: "nav",
  initialState: {
    origin: {"lat": -37.817275, "lng": 144.9659505}, // default location
    destination: {"lat": -37.8117996, "lng": 144.9694696},
    tripInfo: {distance: 0, trip_time: 0},
    addTripFlag: false,
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
    },
    setAddTripFlag(state, action) {
      state.addTripFlag = action.payload
    }
  }
})

export const { setOrigin, setDestination, setTripInfo, setAddTripFlag } = navSlice.actions

export default navSlice.reducer