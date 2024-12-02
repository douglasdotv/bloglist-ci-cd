import { createSlice } from '@reduxjs/toolkit'
import blogService from '../../services/blogs'

const initialState = []

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    blogsLoaded(_state, action) {
      const blogs = action.payload
      return blogs
    },
    blogAdded(state, action) {
      const blog = action.payload
      state.push(blog)
    },
    blogUpdated(state, action) {
      const updatedBlog = action.payload
      const index = state.findIndex(b => b.id === updatedBlog.id)
      if (index !== -1) {
        state[index] = updatedBlog
      }
    },
    blogRemoved(state, action) {
      const id = action.payload
      const index = state.findIndex(blog => blog.id === id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
  },
})

export const { blogsLoaded, blogAdded, blogUpdated, blogRemoved } =
  blogsSlice.actions

export const initializeBlogs = () => {
  return async (dispatch, _getState) => {
    const blogs = await blogService.getAll()
    dispatch(blogsLoaded(blogs))
  }
}

export const createBlog = newBlog => {
  return async (dispatch, _getState) => {
    const createdBlog = await blogService.create(newBlog)
    dispatch(blogAdded(createdBlog))
  }
}

export const likeBlog = id => {
  return async (dispatch, getState) => {
    const state = getState()
    const blog = state.blogs.find(b => b.id === id)
    const blogForUpdate = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    const updatedBlog = await blogService.update(id, blogForUpdate)
    dispatch(blogUpdated({ ...updatedBlog, user: blog.user }))
  }
}

export const removeBlog = id => {
  return async (dispatch, _getState) => {
    await blogService.remove(id)
    dispatch(blogRemoved(id))
  }
}

export default blogsSlice.reducer
