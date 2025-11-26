import { useState, useEffect } from "react"

import Note from "./components/Note"
import noteServices from "./services/notes"
import Notification from './components/Notification'
import Footer from "./components/Footer"

const App = () => {

  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteServices
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()

    const newNote = {
      content: currentNote,
      important: Math.random() < 0.5,
    }

    noteServices
      .create(newNote)
      .then(
        (newNote) => {
          setNotes(notes.concat(newNote).concat({ ...newNote, id: "823438dskjlf" }))
          setCurrentNote("")
        }
      )
  }

  const handleToggleImportance = id => {
    const note = notes.find(note => note.id === id)
    const updatedNote = { ...note, important: !note.important }

    noteServices
      .update(id, updatedNote)
      .then(updatedNote => {
        setNotes(notes.map(n => (n.id === id ? updatedNote : n)))
      })
      .catch(error => {
        setErrorMessage("This note is not on the server.")
        setTimeout(() => setErrorMessage(null), 3000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleToggleShowAll = () => setShowAll(!showAll)

  const notesToShow = (showAll)
    ? notes
    : notes.filter(note => note.important)

  if (!notes) {
    return null
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      <button onClick={handleToggleShowAll}>
        show {showAll ? "important" : "all"}
      </button>

      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => handleToggleImportance(note.id)}
          />)}
      </ul>

      <form onSubmit={addNote}>
        <input value={currentNote} onChange={e => setCurrentNote(e.target.value)} />
        <button type="submit">save</button>
      </form>

      <Footer />

    </div>
  )
}

export default App

// React bases the division of the application
// along the lines of its logical functional entities.

// The structural units that make up the application's 
// functional entities are React components.

// React component defines the HTML for structuring the content,
// the JavaScript functions for determining functionality,
// and also the component's styling,
// all in one place.

// This is to create individual components
// that are as independent and reusable as possible.