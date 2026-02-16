require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require("morgan")
const Person = require("./person")

morgan.token("body", function (req, res) { return JSON.stringify(req.body) })

const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === "CastError") {
    return res.status(400).send({ error: "Malformatted ID" })
  } else if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "Unknown endpoint" })
}

app.use(express.static("dist"))
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms - :body"))

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then(results => {
      res.json(results)
    })
    .catch(error => { next(error) })
})

app.get("/info", (req, res, next) => {
  Person.find({})
    .then(results => {
      res.send(
        `<p>Phonebook has info for ${results.length} people.</p> <p>${new Date()}</p>`
      )
    })
    .catch(error => { next(error) })
})

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then(result => {
      if (result) {
        res.json(result)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => { next(error) })
})

app.post("/api/persons/", (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "no name" })
  } if (!req.body.number) {
    return res.status(400).json({ error: "no number" })
  }

  const person = new Person({
    name: req.body.name,
    number: req.body.number,
  })

  person.save()
    .then(result => { res.json(person) })
    .catch(error => { next(error) })
})

app.put("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (!person) {
        return res.status(404).end()
      }

      const { name, number } = req.body
      person.name = name
      person.number = number

      return person.save()
        .then(updatedPerson => res.json(updatedPerson))
        .catch(error => { next(error) })
    })
    .catch(error => { next(error) })
})

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => res.status(204).end())
    .catch(error => { next(error) })
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`))