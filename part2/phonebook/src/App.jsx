import { useState } from "react"
import { useEffect } from "react"
import personsServices from "./services/persons"

import Persons from "./components/Persons"
import AdditionForm from "./components/AdditionForm"
import Filter from "./components/Filter"

const App = () => {
  const [searchName, setSearchName] = useState("")

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  useEffect(() => {
    personsServices
      .getAll()
      .then(data => setPersons(data))
  }, [])

  const addNewPerson = (e) => {
    e.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} has already been added to phonebook.`)
    } else if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} has already been added to phonebook.`)
    }
    else {
      personsServices
        .create({ name: newName, number: newNumber })
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName("")
          setNewNumber("")
        })
    }
  }

  const removePerson = id => {
    if (confirm(`Delete ${persons.find(p => p.id === id).name}`)) {
      personsServices.remove(id)
      setPersons(persons.filter(p => p.id !== id))
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
      <Persons list={peopleToShow} onDelete={removePerson} />
    </div>
  )
}

export default App