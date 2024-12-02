import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = async blogId => {
  const response = await axios.get(`${baseUrl}/${blogId}/comments`)
  return response.data
}

const create = async (blogId, text) => {
  const response = await axios.post(`${baseUrl}/${blogId}/comments`, { text })
  return response.data
}

export default { getAll, create }
