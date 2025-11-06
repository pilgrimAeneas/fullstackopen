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
  if (all === 0) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given.</p>
      </>
    )
  } else {
    return (
      <>
        <h2>Statistics</h2>
        <StatisticsLine value={good} text="good" />
        <StatisticsLine value={neutral} text="neutral" />
        <StatisticsLine value={bad} text="bad" />
        <StatisticsLine value={all} text="all" />
        <StatisticsLine value={average} text="average" />
        <StatisticsLine value={positiveRatio + ' %'} text="positive" />
      </>
    )
  }
}

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>
const StatisticsLine = ({ text, value }) => <div>{text} {value}</div>

export default App