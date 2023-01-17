import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  update_id: null,
  isModalVisible: false,
  isEditVisible: false,
  user: null,
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setUpdate: (state, action) => {
      state.update_id = action.payload
    },
    setModalVisible: (state, action) => {
      state.isModalVisible = action.payload
    },
    setEditVisible: (state, action) => {
      state.isEditVisible = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const {
  setUpdate,
  setModalVisible,
  setEditVisible,
  setUser,
} = tableSlice.actions

export default tableSlice.reducer
