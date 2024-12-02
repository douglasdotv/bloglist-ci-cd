import { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, Box, Typography } from '@mui/material'

const BlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, maxWidth: 500 }}>
      <Typography variant="h6" gutterBottom>
        Create a new blog
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <TextField
        label="Author"
        variant="outlined"
        fullWidth
        margin="normal"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <TextField
        label="URL"
        variant="outlined"
        fullWidth
        margin="normal"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Create
      </Button>
    </Box>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default BlogForm
