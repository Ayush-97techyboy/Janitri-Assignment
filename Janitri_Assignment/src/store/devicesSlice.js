import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  devices: [],
}

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    addDevice(state, action) {
      state.devices.push(action.payload)
    },
    updateDevice(state, action) {
      const index = state.devices.findIndex(device => device.id === action.payload.id)
      if (index !== -1) {
        state.devices[index] = action.payload
      }
    },
    removeDevice(state, action) {
      state.devices = state.devices.filter(device => device.id !== action.payload)
    },
    setDevices(state, action) {
      state.devices = action.payload
    },
  },
})

export const { addDevice, updateDevice, removeDevice, setDevices } = devicesSlice.actions
export default devicesSlice.reducer
