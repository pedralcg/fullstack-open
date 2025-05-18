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

  // Lógica para encontrar la anécdota más votada
  // 1. Encontrar el número máximo de votos en el array 'votes'.
  const maxVotes = Math.max(...votes);
  // 2. Encontrar el índice de la anécdota con el número máximo de votos.
  const indexOfMostVoted = votes.indexOf(maxVotes);
  // 3. Obtener el texto de la anécdota más votada usando su índice.
  const mostVotedAnecdote = anecdotes[indexOfMostVoted];
  // Lógica para calcular el número total de votos
  const totalVotes = votes.reduce((sum, currentVote) => sum + currentVote, 0);

  return (
    <div>
      <h1 style={{ color: 'darkgreen', fontWeight: 'bold', marginBottom: '20px' }}> Anécdotas y citas sobre programación </h1>
      <h2 style={{ color: 'green', fontWeight: 'bold', marginTop: '30px', marginBottom: '10px' }}> Anécdota del día </h2>
      {/* Muestra la anécdota seleccionada utilizando el índice almacenado en el estado */}
      <p style={{fontStyle: "italic"}}>{anecdotes[selected]}</p>
      {/* Muestra el número de votos de la anécdota actual. */}
      <p style={{textDecoration: "underline"}}>Tiene {votes[selected]} votos</p>
      {/* Renderiza el botón "Next anecdote" utilizando el componente Button, pasando la función manejadora */}
      <Button handleClick={handleClickVote} text='Votar' />
      <Button handleClick={handleClickNext} text='Siguiente anécdota' />
      {/* Muestra la anécdota seleccionada utilizando el índice almacenado en el estado */}
      <h2 style={{ color: 'lightgreen', fontWeight: 'bold', marginTop: '30px', marginBottom: '10px' }}> Anécdota más votada </h2>
      {/* **Muestra la anécdota más votada (o un mensaje si no hay votos)** */}
      {/* Si maxVotes es 0, significa que nadie ha votado aún. */}
      {maxVotes === 0 ? (
        <p>Aún no hay votos.</p>
      ) : (
        // Si hay votos, muestra la anécdota más votada y su número de votos.
        <div>
          <p style={{ fontStyle: "italic" }}>{mostVotedAnecdote}</p>
          <p style={{ textDecoration: "underline" }}>Tiene {maxVotes} votos de {totalVotes}</p>
        </div>
      )}
    </div>
  )
}

export default App