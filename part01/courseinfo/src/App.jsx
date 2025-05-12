const Header = (props) => {
  //console.log(props); // tip: usa console.log(props) para ver qué props recibe un componente
  return (
    <div>
      <h1>{props.course}</h1> {/*Usamos props.course para mostrar el nombre */}
    </div>
  )
}

// Define este nuevo componente en tu archivo App.jsx
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


const Content = (props) => {
  // console.log('Props recibidas en Content:', props);
  return (
    <div>
      {/* Pasa las propiedades 'name' y 'exercises' del objeto part1 al componente Part */}
      <Part name={props.part1.name} exercises={props.part1.exercises} />
      {/* Pasa las propiedades 'name' y 'exercises' del objeto part2 al componente Part */}
      <Part name={props.part2.name} exercises={props.part2.exercises} />
      {/* Pasa las propiedades 'name' y 'exercises' del objeto part3 al componente Part */}
      <Part name={props.part3.name} exercises={props.part3.exercises} />
    </div>
  );
};

const Total = (props) => {
  //console.log(props)
  return (
    <div>
      <p>Number of exercises {
        props.exercises1 + 
        props.exercises2 + 
        props.exercises3
      }
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  
  return (
    <div>
      <Header course={course}/>
      {/* Refactorizado: Pasa los objetos completos de las partes a Content */}
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
      />
      <Total 
        exercises1={part1.exercises} 
        exercises2={part2.exercises} 
        exercises3={part3.exercises}
      />
    </div>
  )
}

export default App