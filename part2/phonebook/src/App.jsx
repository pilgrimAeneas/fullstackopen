import { useState } from "react"

import Persons from "./components/Persons"
import AdditionForm from "./components/AdditionForm"
import Filter from "./components/Filter"

const App = () => {
  const [searchName, setSearchName] = useState("")

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const addNewPerson = (e) => {
    e.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} has already been added to phonebook.`)
    } else if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} has already been added to phonebook.`)
    }
    else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewName("")
      setNewNumber("")
    }
  }

  const peopleToShow = persons.filter(
    person => person.name.toLowerCase().includes(searchName.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} onChange={e => setSearchName(e.target.value)} />

      <h3>add a new</h3>
      <AdditionForm
        onSubmit={addNewPerson}
        name={newName} number={newNumber}
        setNewName={e => setNewName(e.target.value)}
        setNewNumber={e => setNewNumber(e.target.value)}
      />

      <h3>Numbers</h3>
      <Persons list={peopleToShow} />

    </div>
  )
}

export default App