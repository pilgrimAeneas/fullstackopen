require('dotenv').config()
const express = require("express")
const app = express()
const Note = require("./note")


const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


app.use(express.json())
app.use(requestLogger)
app.use(express.static('dist'))


app.post("/api/notes", (request, response) => {
  if (!request.body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: request.body.content,
    important: request.body.important || false,
  })

  note.save().then(result => {
    response.json(result)
  })
})

app.get("/api/notes", (request, response) => {
  Note.find({}).then(results => {
    response.json(results)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(result => {
    response.json(result)
  })
})

app.put("/api/notes/:id", (request, response) => {
  Note.findByIdAndUpdate(request.params.id, request.body).then(result => {
    response.json(request.body)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  Note.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
})

app.use(unknownEndpoint)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})