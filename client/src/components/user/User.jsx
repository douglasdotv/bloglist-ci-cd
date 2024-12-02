import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const User = ({ user }) => (
  <tr>
    <td>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </td>
    <td>{user.blogs ? user.blogs.length : 0}</td>
  </tr>
)

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    blogs: PropTypes.array,
  }).isRequired,
}

export default User
