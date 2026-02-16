require("dotenv").config()
const express = require("express")
const app = express()
const Note = require("./note")


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  }

  if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method)
  console.log("Path:  ", request.path)
  console.log("Body:  ", request.body)
  console.log("---")
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

app.use(express.json())
app.use(requestLogger)
app.use(express.static("dist"))


app.post("/api/notes", (request, response, next) => {
  const note = new Note({
    content: request.body.content,
    important: request.body.important || false,
  })

  note.save()
    .then(result => {
      response.json(result)
    })
    .catch(error => { next(error) })
})

app.get("/api/notes", (request, response) => {
  Note.find({}).then(results => {
    response.json(results)
  })
})

app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then(result => {
      if (result) {
        response.json(result)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => { next(error) })
})

app.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body
  Note.findById(request.params.id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then(updatedNote => { response.json(updatedNote) })
    })
    .catch(error => { next(error) })
})

app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => { response.status(204).end() })
    .catch(error => { next(error) })
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})