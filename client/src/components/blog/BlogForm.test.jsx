import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('Should call the event handler with the right details when a new blog is created', async () => {
  const mockCreateBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm onSubmit={mockCreateBlog} />)

  const titleInput = screen.getByLabelText('Title')
  const authorInput = screen.getByLabelText('Author')
  const urlInput = screen.getByLabelText('URL')
  const submitButton = screen.getByText('Create')

  await user.type(titleInput, 'New Blog Title')
  await user.type(authorInput, 'New Author')
  await user.type(urlInput, 'http://newblogurl.com')
  await user.click(submitButton)

  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(mockCreateBlog.mock.calls[0][0]).toEqual({
    title: 'New Blog Title',
    author: 'New Author',
    url: 'http://newblogurl.com',
  })
})
