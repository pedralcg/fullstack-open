// Componente Header: Muestra el nombre del curso.
// Recibe el nombre del curso como una prop llamada 'course'.
const Header = (props) => {
  //console.log(props); // tip: usa console.log(props) para ver qué props recibe un componente
  return (
    <div>
      <h1>{props.course}</h1> {/*Usamos props.course para mostrar el nombre */}
    </div>
  )
}

// Componente Part: Muestra el nombre de una parte y su número de ejercicios.
// Recibe el nombre de la parte como prop 'name' y los ejercicios como prop 'exercises'.
const Part = (props) => {
  // console.log('Props recibidas en Part:', props);
  return (
    <div>
      {/* Recibe el nombre y el número de ejercicios como props */}
      <p>
        {/* Recibirá una prop llamada 'name' y otra llamada 'exercises' */}
        {props.name} {props.exercises}
      </p>
    </div>
  );
};


// Componente Content: Renderiza los componentes Part para cada sección del curso.
// Refactorizado: Ahora recibe el array completo 'parts' como una prop.
const Content = (props) => {
  // console.log('Props recibidas en Content:', props);
  return (
    <div>
      {/* Accede al primer objeto del array (índice 0) y pasa sus propiedades a Part */}
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
      {/* Accede al segundo objeto del array (índice 1) y pasa sus propiedades a Part */}
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
      {/* Accede al tercer objeto del array (índice 2) y pasa sus propiedades a Part */}
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
    </div>
  );
};

// Componente Total: Muestra el número total de ejercicios.
// Refactorizado: Ahora recibe el array completo 'parts' como una prop.
const Total = (props) => {
  //console.log(props)
  return (
    <div>
      <p>
        Number of exercises{' '}
        {/* Accede a la propiedad 'exercises' de cada objeto en el array y suma */}
        {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
      </p>
    </div>
  )
}


// Componente App: Contiene toda la data y renderiza los componentes principales.
const App = () => {
  const course = 'Half Stack application development'
  // Data organizada en un array de objetos
  const parts = [
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
  
  return (
    <div>
      <Header course={course}/>
      {/* Pasa el array 'parts' completo a Content */}
      <Content parts={parts} />
      {/* **Pasa el array 'parts' completo a Total** */}
      <Total parts={parts} />
    </div>
  )
}

export default App