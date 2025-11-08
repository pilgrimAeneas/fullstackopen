import { useState } from "react"
import Note from "./components/Note"

const App = ({ initialNotes }) => {
  const [notes, setNotes] = useState(initialNotes)
  const [currentNote, setCurrentNote] = useState("")
  const [showAll, setShowAll] = useState(true)

  const addNote = (event) => {
    event.preventDefault()

    const newNote = {
      content: currentNote,
      important: Math.random() < 0.5,
      id: String(notes.length + 1),
    }

    setNotes(notes.concat(newNote))
    setCurrentNote("")
  }

  const handleToggelShowAll = () => setShowAll(!showAll)

  const notesToShow = (showAll)
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>

      <button onClick={handleToggelShowAll}>
        show {showAll ? "important" : "all"}
      </button>

      <ul>
        {notesToShow.map(note => <Note key={note.id} note={note} />)}
      </ul>

      <form onSubmit={addNote}>
        <input value={currentNote} onChange={e => setCurrentNote(e.target.value)} />
        <button type="submit">save</button>
      </form>

    </div>
  )
}

export default App