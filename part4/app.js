const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const conf = require("./utils/config.js")
const logger = require("./utils/logger.js")
const middleware = require("./utils/middleware.js")

app.use(cors())
app.use(express.json())

mongoose.set('strictQuery', false)
const mongoUrl = conf.MONGO_URI
mongoose.connect(mongoUrl).then(()=>logger.info(`mongo connection successful`)).catch(error=>logger.error("mongo conn failed: "+error))

const blogsRouter = require("./controllers/blogs.js")
const usersRouter = require('./controllers/users')
const loginRouter = require("./controllers/login")

app.use(middleware.requestLogger)

/4.20
app.use(middleware.tokenExtractor)

/4.22
app.use("/api/blogs", blogsRouter)
app.use('/api/users', usersRouter)
// 4.18
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app