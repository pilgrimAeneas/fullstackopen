import { useState, useEffect } from "react"
import axios from "axios"
import Note from "./components/Note"


const App = () => {

  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState("")
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    axios
      .get("http://localhost:3001/notes")
      .then(({ data }) => {
        setNotes(data)
      })
  }, [])

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