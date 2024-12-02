import { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, Box } from '@mui/material'

const CommentForm = ({ onSubmit }) => {
  const [commentText, setCommentText] = useState('')

  const handleInputChange = e => {
    setCommentText(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(commentText)
    setCommentText('')
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Add a comment"
        variant="outlined"
        fullWidth
        margin="normal"
        value={commentText}
        onChange={handleInputChange}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
        Add
      </Button>
    </Box>
  )
}

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default CommentForm
