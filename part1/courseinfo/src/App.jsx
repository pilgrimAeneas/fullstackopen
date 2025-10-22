const App = () => {
  const course = 'Half Stack application development'

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }

  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }

  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <>
      <Header course={course} />
      <Content
        part1={part1.name} part2={part2.name} part3={part3.name}
        exCount1={part1.exercises} exCount2={part2.exercises} exCount3={part3.exercises}
      />
      <Total exCounts={[part1.exercises, part2.exercises, part3.exercises]} />
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
