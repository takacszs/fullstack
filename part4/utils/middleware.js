const morgan = require("morgan")
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const errorHandler = (error, _request, response, next) => {
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
    if (error.name === 'JsonWebTokenError') {
      return response.status(400).json({ error: 'invalid token' })}
    next(error)
  }

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
  }

morgan.token('reqBody', (req) => {
    if (req.method === 'POST') return JSON.stringify(req.body)
  })

const requestLogger = morgan(
    ':method :url :status :reqBody'
  )

  const tokenExtractor = (request, _response, next) => {
    console.log('hello from tokenextractror');
    request.token = null
    const authorization = request.get('authorization')
    console.log('authorization :>> ', authorization);
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7)
    }
  
    next()
  }
  
  const userExtractor = async (request, response, next) => {
    request.user = null
    console.log('request.token :>> ', request.token);
    if (request.token !== null) {
      try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        const user = await User.findById(decodedToken.id)
        console.log('user :>> ', user);
        request.user = user
      } catch (error) {
        next(error)
      }
    } else {
      return response.status(401).json({ error: 'missing token' })
    }
  
    next()
  }

module.exports={errorHandler, unknownEndpoint, requestLogger, tokenExtractor, userExtractor}