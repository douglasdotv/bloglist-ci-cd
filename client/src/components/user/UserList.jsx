import { useSelector } from 'react-redux'
import User from './User'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from '@mui/material'

const UserList = () => {
  const users = useSelector(state => state.users)

  return (
    <Paper sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ p: 2 }}>
        Users
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <User key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

export default UserList
