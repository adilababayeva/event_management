import { createSlice } from '@reduxjs/toolkit'
import { getCookie, hasCookie } from 'cookies-next'

const initialState = {
  token: hasCookie('token') ? getCookie('token') : null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
  },
})

export const { setToken } = authSlice.actions

export default authSlice.reducer
