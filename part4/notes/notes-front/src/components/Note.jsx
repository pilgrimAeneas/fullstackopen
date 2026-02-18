const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? "make unimportant"
    : "make important"

  return (
    <li className="note">
      <button onClick={toggleImportance}>{label}</button>
      {note.content}
    </li>
  )
}

export default Note