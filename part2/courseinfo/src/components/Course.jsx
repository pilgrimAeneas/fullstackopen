const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Header = ({ name }) => <h2>{name}</h2>

const Content = ({ parts }) => (
  <>
    {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
  </>
)

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Total = ({ parts }) => (
  <p>
    <strong>
      total of {parts.reduce((acc, part) => (acc + part.exercises), 0)} exercises
    </strong>
  </p>
)

export default Course