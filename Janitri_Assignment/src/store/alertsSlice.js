import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  alerts: [],
}

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert(state, action) {
      state.alerts.push(action.payload)
    },
    updateAlert(state, action) {
      const index = state.alerts.findIndex(alert => alert.id === action.payload.id)
      if (index !== -1) {
        state.alerts[index] = action.payload
      }
    },
    removeAlert(state, action) {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload)
    },
    setAlerts(state, action) {
      state.alerts = action.payload
    },
  },
})

export const { addAlert, updateAlert, removeAlert, setAlerts } = alertsSlice.actions
export default alertsSlice.reducer
