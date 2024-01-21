import Course from "../components/Course";

const App = () => {
  const courses = [
    {
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
        }
      ]
    },
    {
      id: 2,
      name: 'Web Development Basics',
      parts: [
        {
          name: 'HTML5 and CSS3',
          exercises: 8,
          id: 4
        },
        {
          name: 'JavaScript Fundamentals',
          exercises: 12,
          id: 5
        },
        {
          name: 'Responsive Design',
          exercises: 6,
          id: 6
        }
      ]
    }
  ];

  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
}

export default App