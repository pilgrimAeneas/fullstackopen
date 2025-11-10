import { useState } from "react"

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "39-44-5323523" }])
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={e => setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <div key={person.name}>{person.name}: {person.number}</div>)}
    </div>
  )
}

export default App