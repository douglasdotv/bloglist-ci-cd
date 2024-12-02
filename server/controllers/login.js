const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const isPasswordMatch =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && isPasswordMatch)) {
    return response.status(401).json({ error: 'Invalid username or password' })
  }

  const payload = { username: user.username, id: user._id }
  const token = jwt.sign(payload, config.SECRET, { expiresIn: 60 * 60 })

  response.status(200).json({
    token,
    user: { id: user._id.toString(), username: user.username, name: user.name },
  })
})

module.exports = loginRouter
