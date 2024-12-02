import { useSelector } from 'react-redux'
import {
  Container,
  Table,
  TableBody,
  TableContainer,
  Paper,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 2 }}>
        Blogs
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableBody>
            {sortedBlogs.map(blog => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Blog blog={blog} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default BlogList
