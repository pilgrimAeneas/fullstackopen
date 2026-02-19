const express = require("express")
const mongoose = require("mongoose")
const config = require("./utils/config")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")
const notesRouter = require("./controllers/notes")

const app = express()
mongoose.connect(config.MONGODB_URI, { family: 4 })
  .then(result => {
    logger.info(result)
  })
  .catch(error => {
    logger.error(error)
  })

app.use(express.static("dist"))
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/notes/", notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

/*
One of the advantages of separating "app" and "index" method is that
the application can now be tested at the level of HTTP API calls
without actually making calls via HTTP over the network,
this makes the execution of tests faster.
*/