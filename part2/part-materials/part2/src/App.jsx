import { useState, useEffect } from "react"
import Note from "./components/Note"
import noteServices from "./services/notes"

const App = () => {

  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState("")
  const [showAll, setShowAll] = useState(true)

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
          setNotes(notes.concat(newNote))
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
        alert("This note is not on the server.")
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const handleToggleShowAll = () => setShowAll(!showAll)

  const notesToShow = (showAll)
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>

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

    </div>
  )
}

export default App