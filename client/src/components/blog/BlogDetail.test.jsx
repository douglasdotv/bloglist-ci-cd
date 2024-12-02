import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../../store/slices/notificationSlice'
import blogsReducer from '../../store/slices/blogsSlice'
import commentsReducer from '../../store/slices/commentsSlice'
import authReducer from '../../store/slices/authSlice'
import usersReducer from '../../store/slices/usersSlice'
import blogService from '../../services/blogs'
import commentService from '../../services/comments'
import BlogDetail from './BlogDetail'

vi.mock('../../services/blogs')
vi.mock('../../services/comments')

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

const comments = {
  123: [
    { id: 'c1', text: 'Great!', user: { name: 'Test Commenter 1' } },
    { id: 'c2', text: 'Nice!', user: { name: 'Test Commenter 2' } },
  ],
}

const user = userEvent.setup()

beforeEach(() => {
  blogService.update = vi.fn((id, blogData) =>
    Promise.resolve({
      ...blogData,
      likes: blogData.likes,
    })
  )

  commentService.getAll = vi.fn(blogId =>
    Promise.resolve(comments[blogId] || [])
  )
})

test('Should display blog url and likes', async () => {
  const store = configureStore({
    reducer: {
      notification: notificationReducer,
      blogs: blogsReducer,
      comments: commentsReducer,
      authenticatedUser: authReducer,
      users: usersReducer,
    },
    preloadedState: {
      blogs: [blog],
      authenticatedUser: { id: '1', name: 'Test User' },
      comments: {},
    },
  })

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/blogs/123']}>
        <Routes>
          <Route path="/blogs/:id" element={<BlogDetail />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  )

  const urlElement = await screen.findByText('http://testurl.com')
  const likesElement = await screen.findByText('Total likes: 5')

  expect(urlElement).toBeInTheDocument()
  expect(likesElement).toBeInTheDocument()
})

test('Should call the like event handler twice when the like button is clicked twice', async () => {
  const store = configureStore({
    reducer: {
      notification: notificationReducer,
      blogs: blogsReducer,
      comments: commentsReducer,
      authenticatedUser: authReducer,
      users: usersReducer,
    },
    preloadedState: {
      blogs: [blog],
      authenticatedUser: { id: '1', name: 'Test User' },
      comments: {},
    },
  })

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/blogs/123']}>
        <Routes>
          <Route path="/blogs/:id" element={<BlogDetail />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  )

  const likeButton = await screen.findByRole('button', { name: 'Like' })
  await user.click(likeButton)
  await user.click(likeButton)

  expect(blogService.update).toHaveBeenCalledTimes(2)
})
