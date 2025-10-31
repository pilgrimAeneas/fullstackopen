import { useState } from "react"

const App = () => {
  const [counter, setCounter] = useState(0)
  const incrementCounter = () => setCounter(counter + 1)
  const decrementCounter = () => setCounter(counter - 1)
  const resetCounter = () => setCounter(0)

  return (
    <>
      <Display counter={counter} />
      <Button name="Increment" onClick={incrementCounter} />
      <Button name="Decrement" onClick={decrementCounter} />
      <Button name="Reset" onClick={resetCounter} />
    </>
  )
}

const Display = ({ counter }) => <p>{counter}</p>
const Button = ({ name, onClick }) => <button onClick={onClick}>{name}</button>

export default App