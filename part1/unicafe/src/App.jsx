import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodReview = () => setGood(good + 1)
  const handleNeutralReview = () => setNeutral(neutral + 1)
  const handleBadReview = () => setBad(bad + 1)


  return (
    <>
      <h1>Unicafe</h1>

      <h2>Give Feedback</h2>
      <div>
        <Button onClick={handleGoodReview} text="good" />
        <Button onClick={handleNeutralReview} text="neutral" />
        <Button onClick={handleBadReview} text="bad" />
      </div>

      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const points = (1 * good) + (0 * neutral) + (-1 * bad)
  const average = (points / all)
  const positiveRatio = good / all

  return (
    <>
      <h2>Statistics</h2>
      <Display value={good} text="good" />
      <Display value={neutral} text="neutral" />
      <Display value={bad} text="bad" />
      <Display value={all} text="all" />
      <Display value={average} text="average" />
      <Display value={positiveRatio + ' %'} text="positive" />
    </>
  )
}

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>
const Display = ({ text, value }) => <div>{text} {value}</div>

export default App