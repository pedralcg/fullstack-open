import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

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
      <li>Good: {good}</li> 
      <li>Neutral: {neutral}</li>
      <li>Bad: {bad}</li>
      <li>Total: {total}</li>
      <li>Average: {average}</li>
      <li>Positive percentage: {percentage} %</li>
    </div>
  );
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


  return (
    <div>
    <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
    <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App