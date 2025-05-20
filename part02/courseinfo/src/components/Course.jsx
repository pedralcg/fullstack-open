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

export default Course;