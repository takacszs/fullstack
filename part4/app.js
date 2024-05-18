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

app.use(middleware.requestLogger)

app.use("/api/blogs", blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app