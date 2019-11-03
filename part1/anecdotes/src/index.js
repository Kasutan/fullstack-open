import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = (props) => {
const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))

const initialVotes = new Array(anecdotes.length).fill(0)
const [votes, setVotes] = useState(initialVotes)
const [mostVoted, setMostVoted] = useState(0)

const handleVote = () => {
	const copy={...votes}
	copy[selected]+=1
	setVotes(copy)

	//get votes in an array so we can use indexOfMax funtion
	const copyArray=Object.values(copy)
	setMostVoted(indexOfMax(copyArray))

}

const handleNextClick = () => {
	setSelected(Math.floor(Math.random() * anecdotes.length))
}


const indexOfMax = (arr) => {
	if (arr.length === 0) {
		return -1;
	}

	var max = arr[0];
	var maxIndex = 0;

	for (var i = 1; i < arr.length; i++) {
		if (arr[i] > max) {
			maxIndex = i;
			max = arr[i];
		}
	}

	return maxIndex;
}

return (
	<div>
	<h2>Anecdote of the day</h2>
		<p>{props.anecdotes[selected]}</p>
		<p>has {votes[selected]} votes</p>
		<button onClick={handleVote}>Vote</button>
		<button onClick={handleNextClick}>Next anecdote</button>
		
		<h2>Anecdote with most votes</h2>
		<p>{props.anecdotes[mostVoted]}</p>

	</div>
)
}

const anecdotes = [
'If it hurts, do it more often',
'Adding manpower to a late software project makes it later!',
'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
'Premature optimization is the root of all evil.',
'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
<App anecdotes={anecdotes} />,
document.getElementById('root')
)