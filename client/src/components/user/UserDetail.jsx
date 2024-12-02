import { useEffect } from 'react'
import { useMatch, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../../store/slices/usersSlice'
import { Box, Typography, List, ListItem } from '@mui/material'

const UserDetail = () => {
  const match = useMatch('/users/:id')
  const userId = match?.params?.id

  const dispatch = useDispatch()
  const user = useSelector(state =>
    state.users.find(user => user.id === userId)
  )

  useEffect(() => {
    if (!user) {
      dispatch(initializeUsers())
    }
  }, [dispatch, user])

  if (!user) {
    return <Typography>Loading user details...</Typography>
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {user.name}
      </Typography>
      <List>
        <Typography variant="h5" gutterBottom>
          Added blogs
        </Typography>
        {user.blogs && user.blogs.length > 0 ? (
          user.blogs.map(blog => (
            <ListItem key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No blogs available for this user.
          </Typography>
        )}
      </List>
    </Box>
  )
}

export default UserDetail
