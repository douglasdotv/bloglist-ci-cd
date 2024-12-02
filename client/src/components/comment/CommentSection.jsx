import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  initializeComments,
  addComment,
} from '../../store/slices/commentsSlice'
import { showNotification } from '../../store/slices/notificationSlice'
import { Box, Typography } from '@mui/material'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

const CommentsSection = ({ blogId }) => {
  const dispatch = useDispatch()
  const comments = useSelector(state => state.comments[blogId]) || []

  useEffect(() => {
    dispatch(initializeComments(blogId))
  }, [dispatch, blogId])

  const handleCommentSubmit = commentText => {
    if (commentText.trim()) {
      dispatch(addComment(blogId, commentText))
      dispatch(showNotification('Comment added!', 'success'))
    }
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Comments</Typography>
      <CommentList comments={comments} />
      <CommentForm onSubmit={handleCommentSubmit} />
    </Box>
  )
}

export default CommentsSection
