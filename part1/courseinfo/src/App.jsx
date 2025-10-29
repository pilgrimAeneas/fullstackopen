const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },

      {
        name: 'Using props to pass data',
        exercises: 7
      },

      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((part, i) => <Part key={i} part={part} />)}
    </>
  )
}

const Part = ({ part: { name, exercises } }) => {
  return (
    <p>{name} {exercises}</p>
  )
}

const Total = ({ course: { parts } }) => {
  return (
    <p>
      Number of exercises {
        parts.reduce((acc, part) => (acc + part.exercises), 0)
      }
    </p>
  )
}

export default App
