import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import tableSlice from './tableSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    table: tableSlice,
  },
})
