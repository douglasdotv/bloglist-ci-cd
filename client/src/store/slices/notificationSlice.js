import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', type: '' }
let timeoutId = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationSet(_state, action) {
      const notification = action.payload
      return notification
    },
    notificationCleared(_state, _action) {
      return initialState
    },
  },
})

export const { notificationSet, notificationCleared } =
  notificationSlice.actions

export const showNotification = (message, type, duration = 3000) => {
  return (dispatch, _getState) => {
    const notification = { message, type }
    dispatch(notificationSet(notification))

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch(notificationCleared())
      timeoutId = null
    }, duration)
  }
}

export default notificationSlice.reducer
