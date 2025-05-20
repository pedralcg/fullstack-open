import Course from "./components/Course";


// Componente App: Contiene la data de TODOS los cursos y renderiza los componentes Course individuales.
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  // App ahora itera sobre el array 'courses' y renderiza un componente Course (singular) por cada curso
  return (
    <div>
      {/* Utiliza map para transformar el array de objetos de curso en un array de componentes Course */}
      {courses.map(course =>
        // Por cada 'course' individual en el array 'courses', renderiza un componente Course
        // Le pasamos el objeto 'course' individual como prop
        // La prop 'key' es crucial cuando se renderizan listas. Usamos course.id como key.
        <Course key={course.id} course={course} />
      )}
    </div>
  );
};


export default App