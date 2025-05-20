// Componente para mostrar una sola parte del curso
const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};


// Componente para mostrar el contenido (todas las partes) del curso
const Content = ({ parts }) => {
  return (
    <div>
      {/* Utiliza el método map para iterar sobre el array de partes y renderizar un componente Part para cada una */}
      {parts.map(part => (
        // La prop 'key' es crucial cuando se renderizan listas para ayudar a React a identificar elementos
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};


// Componente para mostrar el encabezado (nombre) del curso
const Header = ({ course }) => {
  return (
    <h1 style={{fontWeight: 'bold', color: 'blue'}}>{course.name}</h1>
  );
};


// Componente Total: Calcula y muestra la suma de los ejercicios
const Total = ({ parts }) => {
  // Calcula la suma de los ejercicios usando reduce en el array 'parts'
  // 'sum' es el acumulador, 'part' es el objeto de parte actual en la iteración.
  // Empezamos la suma en 0.
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return(
    <div>
      <p style={{fontWeight: 'bold'}} >
        {/* Muestra el total calculado */}
        Total of {totalExercises} exercises
      </p>
    </div>
  );
};


// Componente Course (singular): responsable de renderizar UN curso completo
// Este componente sigue recibiendo un objeto 'course' individual como prop.
const Course = ({ course }) => {
  // El componente Course recibe el objeto 'course' INDIVIDUAL como prop
  return (
    <div>
      {/* Usa el componente Header para mostrar el nombre del curso */}
      {/* Le pasamos el objeto 'course' individual */}
      <Header course={course} />
      {/* Usa el componente Content para mostrar las partes del curso */}
      {/* Le pasamos el array de partes de ESE curso individual */}
      <Content parts={course.parts} />
      {/* Renderiza el componente Total y pásale el array de partes del curso */}
      <Total parts={course.parts} />
    </div>
  );
};



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