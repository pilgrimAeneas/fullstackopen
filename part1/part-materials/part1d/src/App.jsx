import { useState } from 'react'
import './App.css'

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleResetClick = () => {
    setAll([])
    setLeft(0)
    setRight(0)
  }

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  // debugger;
  console.clear()
  console.log(allClicks.length)
  return (
    <>
      <h1>Hello, world!</h1>
      <main>
        <Display value={`${left + " "}`} />
        <Button text="left" onClick={handleLeftClick} />
        <Button text="right" onClick={handleRightClick} />
        <Display value={`${" " + right}`} />
        <History allClicks={allClicks} />
        <Button text="reset" onClick={handleResetClick} />
      </main>
    </>
  )
}

const Display = ({ value }) => <span>{value}</span>
const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>
const History = ({ allClicks }) => {
  return (allClicks.length === 0)
    ? <p>This app is used by clicking the buttons.</p>
    : <p>{allClicks.join(' ')}</p>
}

export default App