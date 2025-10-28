const App = () => {
  const name = "Aeneas"
  return (
    <>
      <h1>React Review</h1>
      <Hello name={name} age={26} />
      <Hello name={"Mo" + "on"} age={15} />
    </>
  )
}

// Having the root component, App, is a convention in React.

const Hello = ({ name, age }) => {
  const now = new Date()
  const a = 10
  const b = 20

  return (
    <>
      <h2>The Hello {name} Section</h2>
      {/* In JSX, this is how you add comments, BTW. */}
      {/* React can only render primitives and arrays of primitives in JSX. */}
      <p>Hello {name}, it is {now.toString()}</p>
      <p>You are {age} years old.</p>
      <p>
        {a} plus {b} is {a + b}
      </p>
    </>
  )
}

export default App

// Writing components (HTML with templating) is very easy,
// and by combining many modular and reusable components,
// even complex application can be kept maintainable.
