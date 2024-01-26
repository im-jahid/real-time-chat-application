import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatInfo: localStorage.getItem('chatInfo') ? JSON.parse(localStorage.getItem('chatInfo')):"JaHiD",
  },
  reducers: {
    activeChatInfo: (state, action) => {
      state.chatInfo = action.payload
    },
  },
})

export const { activeChatInfo } = chatSlice.actions

export default chatSlice.reducer