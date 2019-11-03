import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) =>  (
		<h2>{props.course}</h2>

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
	const total = exercises.reduce( (accumulator, currentValue) => {
		return accumulator + currentValue 
		})
	return(
		<p><strong>Number of exercises {total}</strong></p>
	)
} 

const Course = ({name, parts}) => (
	<div>
		<Header course={name} />
		<Content parts={parts} />
		<Total parts={parts} />
	</div>
)
const App = () => {
	const courses = [
		{
		name: 'Half Stack application development',
		id: 1,
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
		}, 
		{
		name: 'Node.js',
		id: 2,
		parts: [
			{
			name: 'Routing',
			exercises: 3,
			id: 1
			},
			{
			name: 'Middlewares',
			exercises: 7,
			id: 2
			}
		]
		}
	]

	const rows = () => courses.map(course =>
		<Course
			key={course.id}
			name={course.name}
			parts={course.parts}
		/>
	)
	return (
		<div>
			<h1>Web Development Curriculum</h1>
			{rows()}
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))