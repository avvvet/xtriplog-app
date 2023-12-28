import { createSlice } from "@reduxjs/toolkit"

const navSlice = createSlice({
  name: "nav",
  initialState: {
    origin: {"lat": 8.9879715, "lng": 38.78918609999999}, // default location
    destination: {"lat": 7.9879715, "lng": 48.78918609999999}
  },
  reducers: {
    setOrigin(state, action) {
      state.origin = action.payload
    },
    setDestination(state, action) {
      state.destination = action.payload
    },
  }
})

export const { setOrigin, setDestination } = navSlice.actions

export default navSlice.reducer