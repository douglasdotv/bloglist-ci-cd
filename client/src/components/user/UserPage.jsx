import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../../store/slices/usersSlice'
import { initializeUser } from '../../store/slices/authSlice'
import useAuth from '../../hooks/useAuth'
import { Container } from '@mui/material'
import UserList from './UserList'
import LoginForm from '../auth/LoginForm'

const UserPage = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.authenticatedUser)

  const { handleLogin } = useAuth()

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(initializeUsers())
    }
  }, [user, dispatch])

  return (
    <Container>
      {user ? <UserList /> : <LoginForm onLogin={handleLogin} />}
    </Container>
  )
}

export default UserPage
