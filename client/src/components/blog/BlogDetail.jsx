import { useEffect } from 'react'
import { useMatch, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser } from '../../store/slices/authSlice'
import {
  initializeBlogs,
  likeBlog,
  removeBlog,
} from '../../store/slices/blogsSlice'
import { showNotification } from '../../store/slices/notificationSlice'
import CommentSection from '../comment/CommentSection'
import { Box, Typography, Button } from '@mui/material'

const BlogDetail = () => {
  const match = useMatch('/blogs/:id')
  const blogId = match?.params?.id

  const dispatch = useDispatch()
  const blog = useSelector(state =>
    state.blogs.find(blog => blog.id === blogId)
  )
  const currentUser = useSelector(state => state.authenticatedUser)

  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) {
      dispatch(initializeUser())
    }
    if (!blog) {
      dispatch(initializeBlogs())
    }
  }, [dispatch, blog, currentUser])

  if (!blog) {
    return <Typography>Loading...</Typography>
  }

  const handleLike = async () => {
    try {
      dispatch(likeBlog(blog.id))
      dispatch(showNotification(`Liked "${blog.title}"!`, 'success'))
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        'Server is unreachable. Please try again later.'
      dispatch(showNotification(errorMessage, 'error'))
    }
  }

  const handleRemove = async () => {
    try {
      dispatch(removeBlog(blog.id))
      dispatch(showNotification(`Removed "${blog.title}"!`, 'success'))
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        'Server is unreachable. Please try again later.'
      dispatch(showNotification(errorMessage, 'error'))
    }
    navigate('/blogs')
  }

  const blogUserId = blog.user.id || blog.user
  const isBlogByCurrentUser = currentUser.id === blogUserId

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {blog.title}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Author: {blog.author}
      </Typography>
      <Typography variant="body1">
        Total likes: {blog.likes}{' '}
        <Button variant="contained" color="primary" onClick={handleLike}>
          Like
        </Button>
      </Typography>
      <Typography variant="body1">
        Link:{' '}
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
      </Typography>
      <Typography variant="body1" color="textSecondary">
        Added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
      </Typography>
      {isBlogByCurrentUser && (
        <Button variant="outlined" color="secondary" onClick={handleRemove}>
          Remove
        </Button>
      )}
      <CommentSection blogId={blog.id} />
    </Box>
  )
}

export default BlogDetail
