import React, {useState} from 'react';
import ReactDOM from 'react-dom';

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
			<div>
				<p>Good {props.good}</p>
				<p>Neutral {props.neutral}</p>
				<p>Bad {props.bad}</p>
				<p>All {all}</p>
				<p>Average {average}</p>
				<p>Positive {positive} %</p>
			</div>
		)
	}

	return (
		<div>
			No feedback given
		</div>
	)

	
}

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
			<button onClick={handleGoodClick}>good</button>
			<button onClick={handleNeutralClick}>neutral</button>
			<button onClick={handleBadClick}>bad</button>
			<h2>Statistics</h2>
			<Statistics good={good} neutral={neutral} bad={bad} given={given}/>
		</div>
	)
	}
	
	ReactDOM.render(<App />, 
	document.getElementById('root')
	)