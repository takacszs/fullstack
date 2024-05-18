const morgan = require("morgan")

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
    next(error)
  }

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
  }

morgan.token('reqBody', (req) => {
    if (req.method === 'POST') return JSON.stringify(req.body)
  })

const requestLogger = morgan(
    ':method :url :status :reqBody'
  )

module.exports={errorHandler, unknownEndpoint, requestLogger}