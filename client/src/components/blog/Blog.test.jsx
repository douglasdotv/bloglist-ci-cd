import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Blog from './Blog'

const blog = {
  id: '123',
  title: 'A Test Blog',
  author: 'Test Author',
  url: 'http://testurl.com',
  likes: 5,
  user: {
    id: '1',
    name: 'Test User',
  },
}

test('Should render blog title and author', () => {
  render(
    <MemoryRouter>
      <Blog blog={blog} />
    </MemoryRouter>
  )

  const titleElement = screen.getByText('A Test Blog')
  const authorElement = screen.getByText('by Test Author')

  expect(titleElement).toBeInTheDocument()
  expect(authorElement).toBeInTheDocument()

  const urlElement = screen.queryByText('http://testurl.com')
  const likesElement = screen.queryByText('Likes: 5')

  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})
