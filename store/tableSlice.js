import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  update_id: null,
  isModalVisible: false,
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
  },
})

export const { setUpdate, setModalVisible } = tableSlice.actions

export default tableSlice.reducer
