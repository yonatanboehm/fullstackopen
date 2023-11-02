import { useState } from 'react'

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
    <div>
      <Header course={course.name} />
      <Content 
        part1={course.parts[0].name} 
        exercises1={course.parts[0].exercises} 
        part2={course.parts[1].name} 
        exercises2={course.parts[1].exercises} 
        part3={course.parts[2].name} 
        exercises3={course.parts[2].exercises} />
      <Total total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
    </div>
  )
}

export default App