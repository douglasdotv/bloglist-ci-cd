const config = require('./config')
const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, _response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, _response, next) => {
  const authorization = request.get('authorization')
  if (authorization?.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

const userExtractor = async (request, _response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, config.SECRET)
    if (decodedToken.id) {
      request.user = await User.findById(decodedToken.id)
    }
  }
  next()
}

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, _request, response, _next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'Malformed id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.code === 11000) {
    return response.status(409).json({ error: 'Username already exists' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'Invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'Token expired' })
  }

  response.status(500).json({ error: 'An unexpected error occurred' })
}

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler,
}
