const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course} />
      <Content
        part1={part1} part2={part2} part3={part3}
        exCount1={exercises1} exCount2={exercises2} exCount3={exercises3}
      />
      <Total exCounts={[exercises1, exercises2, exercises3]} />
    </>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.part1} exCount={props.exCount1} />
      <Part part={props.part2} exCount={props.exCount2} />
      <Part part={props.part3} exCount={props.exCount3} />
    </>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exCount}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.exCounts.reduce((acc, x) => (acc + x), 0)}</p>
  )
}

export default App
