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
    <h1>{course.name}</h1>
  );
};

// Nuevo componente Course: responsable de renderizar un curso completo
const Course = ({ course }) => {
  // El componente Course recibe el objeto 'course' como prop
  return (
    <div>
      {/* Usa el componente Header para mostrar el nombre del curso */}
      <Header course={course} />
      {/* Usa el componente Content para mostrar las partes del curso */}
      <Content parts={course.parts} />
    </div>
  );
};


// Componente App: Contiene toda la data y renderiza los componentes principales.
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
      }
    ]
  }

  return <Course course={course} />
}

export default App