import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = (props) => {
  return (
    /**Ahora retorna una fila de tabla (<tr>) con dos celdas de datos (<td>)
     * ¡Importante! Eliminar el espacio en blanco.
     */
    <tr>
      {/* Celda para el texto/etiqueta */}
      <td>{props.text}</td>
      {/* Celda para el valor */}
      <td>{props.value}</td>
    </tr>
  );
}

const Statistics = (props) => {
  // Recibe los valores de good, neutral y bad como props
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;
  // Cálculo de los valores derivados usando las props
  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / total
  const percentage = total === 0 ? 0 : (good / total) * 100
  // Retorna el JSX de estadísticas
  return (
    <div>
      <h1>Statistics</h1>
      {/* Comienzo estructura de la tabla HTML */}
      <table>
        <tbody>
          {/* ¡Importante! Eliminar el espacio en blanco (saltos de línea e indentación) 
          entre las etiquetas StatisticLine. El error se encontraba en el espacio de 
          los comentarios en la misma línea*/}
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Total" value={total} />
          <StatisticLine text="Average" value={average} />
          {/* Para el porcentaje, formateamos el valor a 1 decimal y añadimos el símbolo '%' */}
          <StatisticLine text="Positive percentage" value={`${percentage.toFixed(1)} %`} />
        </tbody>
      </table>
    </div>
  )
}


const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  // Total de comentarios en App para la renderización condicional
  const totalFeedback = good + neutral + bad;

  // Renderización condicional de las estadísticas
  const statisticsSection = totalFeedback === 0 ? (
    // Si no hay feedback, muestra este mensaje
    <div>
      <h1>Statistics</h1>
      <p>No feedback given.</p>
    </div>
  ) : (
    // Si hay feedback, renderiza el componente Statistics
    <Statistics good={good} neutral={neutral} bad={bad} />
  )

  return (
    <div>
    <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
    {statisticsSection}
    </div>
  )
}

export default App