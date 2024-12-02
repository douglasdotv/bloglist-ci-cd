import { createSlice } from '@reduxjs/toolkit'
import loginService from '../../services/login'
import blogService from '../../services/blogs'

const initialState = null

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userSet(_state, action) {
      const user = action.payload
      return user
    },
    userCleared(_state, _action) {
      return initialState
    },
  },
})

export const { userSet, userCleared } = authSlice.actions

export const initializeUser = () => {
  return dispatch => {
    const userJSON = window.localStorage.getItem('authenticatedUser')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      blogService.setToken(user.token)
      dispatch(userSet(user))
    }
  }
}

export const login = credentials => {
  return async dispatch => {
    const response = await loginService.login(credentials)
    const { id, name, username } = response.user
    const { token } = response
    const user = { id, name, username, token }
    window.localStorage.setItem('authenticatedUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(userSet(user))
  }
}

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem('authenticatedUser')
    blogService.setToken(null)
    dispatch(userCleared())
  }
}

export default authSlice.reducer
