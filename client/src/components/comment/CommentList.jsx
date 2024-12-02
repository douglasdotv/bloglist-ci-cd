import PropTypes from 'prop-types'
import { Box, Divider } from '@mui/material'
import Comment from './Comment'

const CommentList = ({ comments }) => {
  return (
    <Box sx={{ mt: 2 }}>
      {comments.map((comment, index) => (
        <Box key={comment.id}>
          <Comment text={comment.text} />
          {index < comments.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  )
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default CommentList
