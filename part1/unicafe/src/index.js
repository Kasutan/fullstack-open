import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { isGenericTypeAnnotation } from '@babel/types';

const App = () => {
	// save clicks of each button to own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const [all, setAll] = useState(0)

	const handleGoodClick = () => {
		setGood(good + 1)
		setAll(all+1)
	}

	const handleNeutralClick = () => {
		setNeutral(neutral + 1)
		setAll(all+1)

	}

	const handleBadClick = () => {
		setBad(bad + 1)
		setAll(all+1)

	}
	
	return (
		<div>
			<h2>Give feedback</h2>
			<button onClick={handleGoodClick}>good</button>
			<button onClick={handleNeutralClick}>neutral</button>
			<button onClick={handleBadClick}>bad</button>

			<h2>Statistics</h2>
			<p>Good {good}</p>
			<p>Neutral {neutral}</p>
			<p>Bad {bad}</p>
			<p>All {all}</p>
			<p>Average { (good - bad) / all }</p>
			<p>Positive { 100 * good / all } %</p>
		</div>
	)
	}
	
	ReactDOM.render(<App />, 
	document.getElementById('root')
	)