import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) =>  (
		<h1>{props.course}</h1>

)

const Part = (props) => {
	return(
		<p>{props.name} {props.exercises}</p>
	)
}
const Content = ({parts}) => {
	const rows = () => parts.map(part =>
		<Part
			key={part.id}
			name={part.name}
			exercises={part.exercises}
		/>
	)
	return(
		<div>
			{rows()}
		</div>
	)
	
}

const Total = ({parts}) => {
	const exercises=parts.map(part => part.exercises)
	const reducer = (accumulator, currentValue) => accumulator + currentValue;
	return(
		<p>Number of exercises {exercises.reduce(reducer)}</p>
	)
} 

const Course = ({course}) => (
	<div>
		<Header course={course.name} />
		<Content parts={course.parts} />
		<Total parts={course.parts} />
	</div>
)
const App = () => {
	const course = {
		name: 'Half Stack application development',
		parts: [
		{
			name: 'Fundamentals of React',
			exercises: 10,
			id: 1
		},
		{
			name: 'Using props to pass data',
			exercises: 7,
			id: 2
		},
		{
			name: 'State of a component',
			exercises: 14,
			id: 3
		},
		{
			name: 'Redux',
			exercises: 11,
			id: 4
		}
		]
	}
	
	return (
		<div>
		<Course course={course} />
		

		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))