require('dotenv').config()
const express = require("express")
const app = express()
const morgan = require('morgan')
const Person = require('./person')

morgan.token("body", function (req, res) { return JSON.stringify(req.body) })

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms - :body"))

app.get("/api/persons", (req, res) => {
  Person.find({}).then(results => {
    res.json(results)
  })
})

app.get("/info", (req, res) => {
  Person.find({})
    .then(results => {
      res.send(
        `<p>Phonebook has info for ${results.length} people.</p> <p>${new Date()}</p>`
      )
    })
})

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then(result => { res.json(result) })
    .catch(error => { res.status(404).end() })
})

app.post("/api/persons/", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "no name" })
  } if (!req.body.number) {
    return res.status(400).json({ error: "no number" })
  } if (0) {
    return res.status(400).json({ error: "name must be unique" })
  }

  const person = new Person({
    name: req.body.name,
    number: req.body.number,
  })

  person.save().then(result => { res.json(person) })
})

app.put("/api/persons/:id", (req, res) => { })

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => res.status(204).end())
    .catch(error => console.log(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`))