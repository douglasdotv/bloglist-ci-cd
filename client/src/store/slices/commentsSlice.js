import { createSlice } from '@reduxjs/toolkit'
import commentService from '../../services/comments'

const initialState = {}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentsLoaded(state, action) {
      const { blogId, comments } = action.payload
      state[blogId] = comments
    },
    commentAdded(state, action) {
      const { blogId, comment } = action.payload
      if (state[blogId]) {
        state[blogId].push(comment)
      } else {
        state[blogId] = [comment]
      }
    },
  },
})

export const { commentsLoaded, commentAdded } = commentsSlice.actions

export const initializeComments = blogId => async dispatch => {
  const comments = await commentService.getAll(blogId)
  dispatch(commentsLoaded({ blogId, comments }))
}

export const addComment = (blogId, text) => async dispatch => {
  const comment = await commentService.create(blogId, text)
  dispatch(commentAdded({ blogId, comment }))
}

export default commentsSlice.reducer
