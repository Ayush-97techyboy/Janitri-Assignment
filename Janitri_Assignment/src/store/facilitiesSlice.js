import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  facilities: [],
}

const facilitiesSlice = createSlice({
  name: 'facilities',
  initialState,
  reducers: {
    addFacility(state, action) {
      state.facilities.push(action.payload)
    },
    updateFacility(state, action) {
      const index = state.facilities.findIndex(facility => facility.id === action.payload.id)
      if (index !== -1) {
        state.facilities[index] = action.payload
      }
    },
    removeFacility(state, action) {
      state.facilities = state.facilities.filter(facility => facility.id !== action.payload)
    },
    setFacilities(state, action) {
      state.facilities = action.payload
    },
  },
})

export const { addFacility, updateFacility, removeFacility, setFacilities } = facilitiesSlice.actions
export default facilitiesSlice.reducer
