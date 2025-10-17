const App = () => {
  const now = new Date()

  const name = "Aeneas"
  const age = 26

  return (
    <>
      <p>Greetings, it is now {now.toString()}.</p>
      <Hello name={name} age={age} />
      <Hello name="Moon" age={10 + 5} />
      <br />
    </>
  )
}

const Hello = (props) => {
  console.log(props)
  const dude = { name: "Dude", age: 27 }
  const dudes = ["Aeneas", "Moon"]

  return (
    <>
      <p>Hello, {props.name}! You are {props.age} years old.</p>
      <p>{dude.name}</p>
      <p>{dudes}</p>
    </>
  )
}

export default App