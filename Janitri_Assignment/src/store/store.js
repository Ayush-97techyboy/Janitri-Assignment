import { configureStore } from '@reduxjs/toolkit'

// Placeholder reducers for CRM modules
import devicesReducer from './devicesSlice'
import facilitiesReducer from './facilitiesSlice'
import visitsReducer from './visitsSlice'
import contractsReducer from './contractsSlice'
import alertsReducer from './alertsSlice'

const store = configureStore({
  reducer: {
    devices: devicesReducer,
    facilities: facilitiesReducer,
    visits: visitsReducer,
    contracts: contractsReducer,
    alerts: alertsReducer,
  },
})

export default store
