import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

const Blog = ({ blog }) => {
  return (
    <Box sx={{ padding: 2, borderBottom: '1px solid #e0e0e0' }}>
      <Typography
        variant="h6"
        component={Link}
        to={`/blogs/${blog.id}`}
        sx={{ textDecoration: 'none', color: 'primary.main' }}
      >
        {blog.title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        by {blog.author}
      </Typography>
    </Box>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}

export default Blog
