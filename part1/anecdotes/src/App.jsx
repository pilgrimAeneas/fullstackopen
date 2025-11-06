import { useState } from 'react'

const initialAnecdotes = [
  {
    quote: 'If it hurts, do it more often.',
    votes: 0,
  },
  {
    quote: 'Adding manpower to a late software project makes it later!',
    votes: 0,
  },
  {
    quote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    votes: 0,
  },
  {
    quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    votes: 0,
  },
  {
    quote: 'Premature optimization is the root of all evil.',
    votes: 0,
  },
  {
    quote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    votes: 0,
  },
  {
    quote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    votes: 0,
  },
  {
    quote: 'The only way to go fast, is to go well.',
    votes: 0,
  },
]

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes)
  const [selected, setSelected] = useState(0)

  const handleNext = () => {
    const getRandomInteger = (max) => Math.floor(max * Math.random())
    setSelected(getRandomInteger(anecdotes.length))
  }

  const handleVote = () => {
    const newAnecdotes = [...anecdotes]
    newAnecdotes[selected].votes += 1
    setAnecdotes(newAnecdotes)
  }

  return (
    <>
      <Quote anecdotes={anecdotes} selected={selected} />
      <Interface onNext={handleNext} onVote={handleVote} />
      <Highest anecdotes={anecdotes} />
    </>
  )
}

const Quote = ({ anecdotes, selected }) => {
  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>{anecdotes[selected].quote}</div>
      <div>has {anecdotes[selected].votes} votes.</div>
    </>
  )
}

const Highest = ({ anecdotes }) => {
  const highest = anecdotes.reduce((acc, item) => item.votes >= acc.votes ? item : acc)

  return (
    <>
      <h2>Anecdote with the most votes</h2>
      <div>{highest.quote}</div>
      <div>has {highest.votes} votes.</div>
    </>
  )
}

const Interface = ({ onVote, onNext }) => {
  return (
    <div>
      <Button text="vote" onClick={onVote} />
      <Button text="next anecdote" onClick={onNext} />
    </div>
  )
}

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

export default App