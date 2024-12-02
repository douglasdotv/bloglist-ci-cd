import PropTypes from 'prop-types'
import { Typography, ListItem } from '@mui/material'

const Comment = ({ text }) => (
  <ListItem>
    <Typography variant="body1">{text}</Typography>
  </ListItem>
)

Comment.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Comment
