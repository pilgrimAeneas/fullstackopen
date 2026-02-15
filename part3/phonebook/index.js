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
  Person.find({}).then(results => {
    res.send(`<p>Phonebook has info for ${results.length} people.</p> <p>${new Date()}</p>`)
  })
})

app.get("/api/persons/:id", (req, res) => {
  // const person = book.find(p => p.id === req.params.id)
  // if (person) {
  //   res.json(person)
  // } else {
  //   res.status(404).end()
  // }
  Person.findById(req.params.id)
    .then(result => {
      res.json(result)
    })
    .catch(error => {
      res.status(404).end()
    })
})

// const isDuplicate = name =>
//   book
//     .map(p => (p.name).toLowerCase())
//     .some(n => n === name.toLowerCase())

// const test1 = isDuplicate("Arto Hellas") === true
// const test2 = isDuplicate("kfdsjkla") === false
// const test3 = isDuplicate("") === false
// const test4 = isDuplicate("Ada lovelace") === true
// console.log(test1, test2, test3, test4)

app.post("/api/persons/", (req, res) => {
  // if (!req.body.name) {
  //   return res.status(400).json({ error: "no name" })
  // } if (!req.body.number) {
  //   return res.status(400).json({ error: "no number" })
  // } if (isDuplicate(req.body.name)) {
  //   return res.status(400).json({ error: "name must be unique" })
  // }

  // const person = {
  //   name: req.body.name,
  //   number: req.body.number,
  //   id: generateId()
  // }

  // book = book.concat(person)
  // res.json(person)
})

app.delete("/api/persons/:id", (req, res) => {
  // book = book.filter(p => p.id !== req.params.id)
  // res.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`))