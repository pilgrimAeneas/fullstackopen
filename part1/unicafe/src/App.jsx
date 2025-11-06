import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <>
      <h1>Unicafe</h1>
      <FeedbackInterface onGood={handleGood} onNeutral={handleNeutral} onBad={handleBad} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  )
}

const FeedbackInterface = ({ onGood, onNeutral, onBad }) => {
  return (
    <>
      <h2>Give Feedback</h2>
      <div>
        <Button onClick={onGood} text="good" />
        <Button onClick={onNeutral} text="neutral" />
        <Button onClick={onBad} text="bad" />
      </div>
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
        <table>
          <tbody>
            <StatisticsLine value={good} text="good" />
            <StatisticsLine value={neutral} text="neutral" />
            <StatisticsLine value={bad} text="bad" />
            <StatisticsLine value={all} text="all" />
            <StatisticsLine value={average} text="average" />
            <StatisticsLine value={positiveRatio + ' %'} text="positive" />
          </tbody>
        </table>
      </>
    )
  }
}

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>
const StatisticsLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

export default App