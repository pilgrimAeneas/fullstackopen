import { useState } from "react"

const App = () => {
  const [counter, setCounter] = useState(0)
  const incrementCounter = () => setCounter(counter + 1)
  const decrementCounter = () => setCounter(counter - 1)
  const resetCounter = () => setCounter(0)

  return (
    // Here be the JSX Template. Don't define the functions here.
    <>
      <Display counter={counter} />
      <Button name="Increment" onClick={incrementCounter} />
      <Button name="Decrement" onClick={decrementCounter} />
      <Button name="Reset" onClick={resetCounter} />
    </>
  )
}

/* Calling a function that changes the state causes 
    the component to re-render, recursively re-rendering its components.*/

const Display = ({ counter }) => <p>{counter}</p>
const Button = ({ name, onClick }) => <button onClick={onClick}>{name}</button>

// Remember to keep your components small, modular and reusable across the app,
// and even across multiple projects.

export default App