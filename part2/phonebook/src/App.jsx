import { useState } from "react"
import { useEffect } from "react"
import personsServices from "./services/persons"

import Persons from "./components/Persons"
import AdditionForm from "./components/AdditionForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import "./index.css"

const App = () => {
  const [searchName, setSearchName] = useState("")

  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const resetNameNumber = () => {
    setNewName("")
    setNewNumber("")
  }

  const [notification, setNotification] = useState({ message: null, type: null })

  const showNotification = (message, type) => {
    const resetNotification = () => {
      setNotification({ message: null, type: null })
    }

    setNotification({ message: message, type: type })
    setTimeout(resetNotification, 5000)
  }

  const handleNotOnServerError = person => () => {
    showNotification(`${person.name} is not on the server.`, false)
    setPersons(persons.filter(p => p.id !== person.id))
  }

  useEffect(() => {
    personsServices
      .getAll()
      .then(data => setPersons(data))
  }, [])

  const addNewPerson = (e) => {
    e.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (confirm(`${newName} has already been added to phonebook, 
        replace the old number with a new one?`)) {
        const existingPerson = persons.find(p => p.name === newName)
        const id = existingPerson.id
        const newPerson = { ...existingPerson, number: newNumber }
        personsServices
          .update(id, newPerson)
          .then(newPerson => {
            setPersons(persons.map(p => p.id === id ? newPerson : p))
            resetNameNumber()
            showNotification(`${newPerson.name} changed`, true)
          })
          .catch(handleNotOnServerError(existingPerson))
      }
    } else if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} has already been added to phonebook.`)
    }
    else {
      personsServices
        .create({ name: newName, number: newNumber })
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          resetNameNumber()
          showNotification(`${newPerson.name} added`, true)
        })
    }
  }

  const removePerson = id => {
    const person = persons.find(p => p.id === id)
    if (confirm(`Delete ${person.name}`)) {
      personsServices
        .remove(id)
        .then(person => {
          showNotification(`${person.name} deleted`, true)
        })
        .catch(handleNotOnServerError(person))
      setPersons(persons.filter(p => p.id !== id))
    }
  }

  const peopleToShow = persons.filter(
    person => person.name.toLowerCase().includes(searchName.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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