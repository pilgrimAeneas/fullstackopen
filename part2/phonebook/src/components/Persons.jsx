const Persons = ({ list, onDelete }) => (
  <>
    {list.map(person => <Person key={person.name} person={person} onDelete={onDelete} />)}
  </>
)

const Person = ({ person, onDelete }) =>
  <div>
    {person.name}: {person.number} <button onClick={() => onDelete(person.id)}>Delete</button>
  </div>

export default Persons