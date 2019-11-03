import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const Statistic = ({ text, value }) => (  <tr><td>{text}</td><td>{value}</td></tr>)


const Statistics = (props) => {
	const all=props.good + props.neutral + props.bad
	let average = '-'
	let positive= '-'
	if(all>0) {
		average=(props.good - props.bad)/all
		positive=100 * props.good /all
	}
	
	if(props.given) {
		return (
			<table><tbody>
				<Statistic text='good' value={props.good}/>
				<Statistic text='neutral' value={props.neutral}/>
				<Statistic text='bad' value={props.bad}/>
				<Statistic text='all' value={all}/>
				<Statistic text='average' value={average}/>
				<Statistic text='positive' value={positive+' %'}/>
			</tbody></table>
		)
	}

	return (
		<div>
			No feedback given
		</div>
	)

	
}

const Button = ({ onClick, text }) => (  <button onClick={onClick}>    {text}  </button>)

const App = () => {
	// save clicks of each button to own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const [given, setGiven] = useState(0)

	const handleGoodClick = () => {
		setGood(good + 1)
		setGiven(1)
	}

	const handleNeutralClick = () => {
		setNeutral(neutral + 1)
		setGiven(1)
	}

	const handleBadClick = () => {
		setBad(bad + 1)
		setGiven(1)
	}
	
	return (
		<div>
			<h2>Give feedback</h2>
			<Button onClick={handleGoodClick} text='good'/>
			<Button onClick={handleNeutralClick} text='neutral'/>
			<Button onClick={handleBadClick} text='bad'/>

			<h2>Statistics</h2>
			<Statistics good={good} neutral={neutral} bad={bad} given={given}/>
		</div>
	)
	}
	
	ReactDOM.render(<App />, 
	document.getElementById('root')
	)