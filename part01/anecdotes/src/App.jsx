import { useState } from 'react'

// Componente Button: Un componente reutilizable para los botones.
// Recibe una función para manejar el clic (handleClick) y el texto del botón (text) como props.
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // Array de anécdotas de ingeniería de software.
  // const anecdotes = [
  //   'If it hurts, do it more often.',
  //   'Adding manpower to a late software project makes it later!',
  //   'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  //   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  //   'Premature optimization is the root of all evil.',
  //   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  //   'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
  //   'The only way to go fast, is to go well.'
  // ]
  const anecdotes = [
    'Si duele, hazlo más a menudo.',
    'Añadir personal a un proyecto de software retrasado, ¡lo retrasa aún más!',
    'El primer 90 por ciento del código representa el primer 10 por ciento del tiempo de desarrollo... El 10 por ciento restante del código representa el otro 90 por ciento del tiempo de desarrollo.',
    'Cualquier tonto puede escribir código que una computadora pueda entender. Los buenos programadores escriben código que los humanos pueden entender.',
    'La optimización prematura es la raíz de todo mal.',
    'Depurar es el doble de difícil que escribir el código en primer lugar. Por lo tanto, si escribes el código de la forma más ingeniosa posible, por definición, no eres lo suficientemente inteligente como para depurarlo.',
    'Programar sin un uso extremadamente intensivo de console.log es como si un médico se negara a usar radiografías o análisis de sangre al diagnosticar pacientes.',
    'La única manera de ir rápido es hacerlo bien.'
  ];

  // Define una variable de estado 'selected' para almacenar el índice de la anécdota mostrada.
  // Inicializa el índice a 0 (para mostrar la primera anécdota al cargar).
  const [selected, setSelected] = useState(0)

  // Define una nueva variable de estado 'votes' para almacenar el número de votos por anécdota.
  // Inicializa el array de votos con ceros, con una longitud igual al número de anécdotas.
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  // Función manejadora para el botón "Next anecdote".
  const handleClickNext = () => {
    // Genera un número decimal aleatorio entre 0 (inclusive) y 1 (exclusivo).
    const randomNumber = Math.random();
    // Multiplica por la longitud del array para obtener un número entre 0 y anecdotes.length (exclusivo).
    const randomDecimalIndex = randomNumber * anecdotes.length;
    // Redondea hacia abajo al número entero más cercano para obtener un índice válido.
    const randomIndex = Math.floor(randomDecimalIndex);

    // Actualiza el estado 'selected' con el índice aleatorio generado.
    setSelected(randomIndex);
  }


  // Función manejadora para el botón "Votar".
  const handleClickVote = () => {
    // 1. Crear una copia del array de votos actual.
    const votesCopy = [...votes];
    // 2. Incrementar el voto para la anécdota seleccionada (usando el índice 'selected').
    votesCopy[selected] += 1;
    // 3. Actualizar el estado 'votes' con la copia modificada.
    // Esto le dice a React que el estado ha cambiado y que debe re-renderizar el componente.
    setVotes(votesCopy);
  };

  return (
    <div>
      <h1 style={{fontStyle: "bold"}}> Anécdotas y citas sobre programación </h1>
      {/* Muestra la anécdota seleccionada utilizando el índice almacenado en el estado */}
      <p style={{fontStyle: "italic"}}>{anecdotes[selected]}</p>
      {/* Muestra el número de votos de la anécdota actual. */}
      <p style={{textDecoration: "underline"}}>Tiene {votes[selected]} votos</p>
      {/* Renderiza el botón "Next anecdote" utilizando el componente Button, pasando la función manejadora */}
      <Button handleClick={handleClickVote} text='Votar' />
      <Button handleClick={handleClickNext} text='Siguiente anécdota' />
    </div>
  )
}

export default App