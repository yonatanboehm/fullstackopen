const Header = (course) => {
  return (
    <div>
      <h1>{course.course}</h1>
    </div>
  )
}

const Part1 = (part1) => {
  return (
    <div>
      <p>
        {part1.part1} {part1.exercises1}
      </p>
    </div>
  )
}

const Part2 = (part2) => {
  return (
    <div>
      <p>
        {part2.part2} {part2.exercises2}
      </p>
    </div>
  )
}

const Part3 = (part3) => {
  return (
    <div>
      <p>
        {part3.part3} {part3.exercises3}
      </p>
    </div>
  )
}

const Content = (content) => {
  return (
    <div>
      <Part1 part1={content.part1} exercises1={content.exercises1} />
      <Part2 part2={content.part2} exercises2={content.exercises2} />
      <Part3 part3={content.part3} exercises3={content.exercises3} />
    </div>
  )
}

const Total = (total) => {
  return (
    <div>
       <p>Number of exercises {total.total}</p>
    </div>
  )
}

const App = () => {
  // const-definitions
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App