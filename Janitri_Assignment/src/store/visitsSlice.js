import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  visits: [],
}

const visitsSlice = createSlice({
  name: 'visits',
  initialState,
  reducers: {
    addVisit(state, action) {
      state.visits.push(action.payload)
    },
    updateVisit(state, action) {
      const index = state.visits.findIndex(visit => visit.id === action.payload.id)
      if (index !== -1) {
        state.visits[index] = action.payload
      }
    },
    removeVisit(state, action) {
      state.visits = state.visits.filter(visit => visit.id !== action.payload)
    },
    setVisits(state, action) {
      state.visits = action.payload
    },
  },
})

export const { addVisit, updateVisit, removeVisit, setVisits } = visitsSlice.actions
export default visitsSlice.reducer
