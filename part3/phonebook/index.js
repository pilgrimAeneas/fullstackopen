const express = require("express")
const app = express()
let morgan = require('morgan')
app.use(express.json())
app.use(morgan("tiny"))

let book = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Phonebook</h1>")
})

app.get("/api/persons", (req, res) => {
  res.json(book)
})

app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${book.length} people.</p> <p>${new Date()}</p>`)
})

app.get("/api/persons/:id", (req, res) => {
  const person = book.find(p => p.id === req.params.id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

const generateId = () => {
  return String(Math.floor(Math.random() * 100000000000))
}

const isDuplicate = name =>
  book
    .map(p => (p.name).toLowerCase())
    .some(n => n === name.toLowerCase())

const test1 = isDuplicate("Arto Hellas") === true
const test2 = isDuplicate("kfdsjkla") === false
const test3 = isDuplicate("") === false
const test4 = isDuplicate("Ada lovelace") === true
// console.log(test1, test2, test3, test4)

app.post("/api/persons/", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "no name" })
  } if (!req.body.number) {
    return res.status(400).json({ error: "no number" })
  } if (isDuplicate(req.body.name)) {
    return res.status(400).json({ error: "name must be unique" })
  }

  const person = {
    name: req.body.name,
    number: req.body.number,
    id: generateId()
  }

  book = book.concat(person)
  res.json(person)
})

app.delete("/api/persons/:id", (req, res) => {
  book = book.filter(p => p.id !== req.params.id)
  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`))