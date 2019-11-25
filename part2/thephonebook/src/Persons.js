import React from 'react';


const Details = (props) => {
return(
	<p>{props.name} {props.number}</p>
)
}
const Persons = ({persons}) => {
const rows = () => persons.map(person =>
	<Details
		key={person.name}
		name={person.name}
		number={person.number}
	/>
)
return(
	<div>
		{rows()}
	</div>
)

}


export default Persons