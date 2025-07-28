import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  contracts: [],
}

const contractsSlice = createSlice({
  name: 'contracts',
  initialState,
  reducers: {
    addContract(state, action) {
      state.contracts.push(action.payload)
    },
    updateContract(state, action) {
      const index = state.contracts.findIndex(contract => contract.id === action.payload.id)
      if (index !== -1) {
        state.contracts[index] = action.payload
      }
    },
    removeContract(state, action) {
      state.contracts = state.contracts.filter(contract => contract.id !== action.payload)
    },
    setContracts(state, action) {
      state.contracts = action.payload
    },
  },
})

export const { addContract, updateContract, removeContract, setContracts } = contractsSlice.actions
export default contractsSlice.reducer
