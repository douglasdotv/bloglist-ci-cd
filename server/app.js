const config = require('./utils/config')
const express = require('express')
const path = require('path')
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/testing')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const app = express()

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI)
    logger.info('Connected to MongoDB')
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error.message)
  }
}
mongoose.set('strictQuery', false)
connectToDatabase()

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)

app.use(express.static(path.resolve(__dirname, 'dist')))

app.use(
  '/api/blogs',
  middleware.tokenExtractor,
  middleware.userExtractor,
  blogsRouter
)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
config.NODE_ENV === 'test' && app.use('/api/testing', testingRouter)

app.use('/api/*', middleware.unknownEndpoint)

app.get('*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.use(middleware.errorHandler)

module.exports = app
