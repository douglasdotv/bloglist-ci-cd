import { Routes, Route, Navigate } from 'react-router-dom'
import { Container } from '@mui/material'
import BlogPage from './components/blog/BlogPage'
import BlogDetail from './components/blog/BlogDetail'
import UserPage from './components/user/UserPage'
import UserDetail from './components/user/UserDetail'
import NavigationMenu from './components/layout/NavigationMenu'
import Notification from './components/utils/Notification'

const App = () => (
  <Container>
    <Notification />
    <NavigationMenu />
    <Routes>
      <Route path="/" element={<Navigate to="/blogs" />} />
      <Route path="/blogs" element={<BlogPage />} />
      <Route path="/blogs/:id" element={<BlogDetail />} />
      <Route path="/users" element={<UserPage />} />
      <Route path="/users/:id" element={<UserDetail />} />
    </Routes>
  </Container>
)

export default App
