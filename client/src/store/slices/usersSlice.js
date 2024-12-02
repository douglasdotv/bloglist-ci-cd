import { createSlice } from '@reduxjs/toolkit'
import userService from '../../services/users'

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersLoaded(_state, action) {
      const users = action.payload
      return users
    },
  },
})

export const { usersLoaded } = usersSlice.actions

export const initializeUsers = () => async dispatch => {
  const users = await userService.getAll()
  dispatch(usersLoaded(users))
}

export default usersSlice.reducer
