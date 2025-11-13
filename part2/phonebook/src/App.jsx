import { useState } from "react"
import axios from "axios"

import Persons from "./components/Persons"
import AdditionForm from "./components/AdditionForm"
import Filter from "./components/Filter"
import { useEffect } from "react"

const App = () => {
  const [searchName, setSearchName] = useState("")

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(({ data }) => setPersons(data))
  }, [])

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