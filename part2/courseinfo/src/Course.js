import React from 'react';

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

export default Course