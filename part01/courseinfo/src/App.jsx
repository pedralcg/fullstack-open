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
      {/* Renderiza el primer componente Part, pasándole la data de la primera parte */}
      <Part name={props.part1} exercises={props.exercises1} />
      {/* Renderiza el segundo componente Part, pasándole la data de la segunda parte */}
      <Part name={props.part2} exercises={props.exercises2} />
      {/* Renderiza el tercer componente Part, pasándole la data de la tercera parte */}
      <Part name={props.part3} exercises={props.exercises3} />
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  
  return (
    <div>
      <Header course={course}/>
      <Content
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      />
      <Total exercises1={exercises1} 
        exercises2={exercises2} 
        exercises3={exercises3}
      />
    </div>
  )
}

export default App