const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
  {
    username: 'john_doe',
    name: 'John Doe',
    password: 'password123',
  },
  {
    username: 'jane_smith',
    name: 'Jane Smith',
    password: 'password456',
  },
]

const createUserAndGetAuthDetails = async () => {
  const user = {
    username: `user_${Math.random().toString(36).substring(7)}`,
    name: `User ${Math.random().toString(36).substring(7)}`,
    password: 'testpassword',
  }

  await api.post('/api/users').send(user)

  const response = await api.post('/api/login').send({
    username: user.username,
    password: user.password,
  })

  const loggedInUser = await User.findOne({ username: user.username })

  return { token: response.body.token, user: loggedInUser }
}

module.exports = {
  initialUsers,
  createUserAndGetAuthDetails,
}
