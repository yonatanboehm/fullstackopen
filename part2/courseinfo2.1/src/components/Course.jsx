const Course1 = (course) => {
    return (
        <div>
          <h2>{course.name}</h2>
          {course.parts.map(part => 
            <Course key={part.id} name={part.name} exercises={part.exercises} />
          )}
          <p>
            <strong>total of {course.parts.map(part => part.exercises).reduce((a, b) => a + b, 0)} exercises</strong>
          </p>
        </div>
      )
}

const Course = (props) => {
    return (
    <p>
        {props.name} {props.exercises}
    </p>
    )
}

export default Course1
