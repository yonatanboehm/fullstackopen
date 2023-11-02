import Course from './components/Course'

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
  
  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map(part => 
        <Course key={part.id} name={part.name} exercises={part.exercises} />
      )}
      <p>
        <strong>total of {course.parts.map(part => part.exercises).reduce((a, b) => a + b, 0)} exercises</strong>
      </p>
    </div>
  )
}

export default App