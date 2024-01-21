const Header = ({courseName}) => {
    return (<h1>{courseName}</h1>)
  }
  
  const Part = ({part,exercises}) => {
    return (<p>{part} {exercises} </p>)
  }
  
  const Content = ({parts}) => {
    return (
      <ul>
        {parts.map((part) => <li key={part.id}><Part part={part.name} exercises={part.exercises}/></li>)}
      </ul>
    )
  }
  
  const Total = ({parts}) => {
    const sum = parts.reduce((partialSum,a) => partialSum+a.exercises,0)
    return (<span>total of {sum} exercises</span>)
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header courseName={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }

  export default Course