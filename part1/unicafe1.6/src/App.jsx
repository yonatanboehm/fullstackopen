import { useState } from 'react'

const Title = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({ name, stat }) => (
  <tr>
    <td>{name}</td>
    <td>{stat}</td>
  </tr>
)

const Stats = ({ good, neutral, bad, all }) => {
  if (all == 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div> 
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine name="good" stat={good} />
        <StatisticLine name="neutral" stat={neutral} />
        <StatisticLine name="bad" stat={bad} />
        <StatisticLine name="all" stat={all} />
        <StatisticLine name="average" stat={all == 0 ? 0 : (good - bad)/all} />
        <StatisticLine name="positive" stat={all == 0 ? 0 : 100*(good/all) + "%"} />
      </tbody>    
    </table> 
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad

  return (
    <div>
      <Title title="give feedback" />
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
      <Title title="Statistics" />
      <Stats good={good} neutral={neutral} bad={bad} all={all}/>
    </div>
  )
}

export default App