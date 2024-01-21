import { useState } from 'react'

const Statistics = (props) => {
  return (
    <div>
      <StatisticLine text="good" value={props.good}/>
      <StatisticLine text="neutral" value={props.neutral}/>
      <StatisticLine text="bad" value={props.bad}/>
      <StatisticLine text="all" value={props.all}/>
      <StatisticLine text="avg" value={props.avg}/>
      <StatisticLine text="pos" value={props.posPercent}/>
    </div>
  )
}

const Button = ({ handleClick, label }) => {
  return (
    <button onClick={handleClick}>
      {label}
    </button>
  );
};

const StatisticLine = ({text,value}) => {
  return (
    <div>
      {text}: {value}
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
    
  const handleGoodClick = () =>{
    const newGoodClick = good + 1
    setGood(newGoodClick)
  }
  const handleNeutralClick = () =>{
    const newNeutralClick = neutral + 1
    setNeutral(newNeutralClick)
  }
  const handleBadClick = () =>{
    const newBadClick = bad + 1
    setBad(newBadClick)
  }

  let all=good+neutral+bad
  let avg=(good+(neutral*0)+(bad*-1))/3
  let posPercent=(good/all)*100

  return (
    <div>
      <Button handleClick={handleGoodClick} label="Good"/>
      <Button handleClick={handleNeutralClick} label="Neutral"/>
      <Button handleClick={handleBadClick} label="Bad"/>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg/3 || "0"} posPercent={(posPercent || "0") + "%"} />
    </div>
  )

}

export default App