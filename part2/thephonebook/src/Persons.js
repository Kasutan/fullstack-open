import React from 'react';


const Details = (props) => {
return(
	<p>{props.name}</p>
)
}
const Persons = ({persons}) => {
const rows = () => persons.map(person =>
	<Details
		key={person.name}
		name={person.name}
	/>
)
return(
	<div>
		{rows()}
	</div>
)

}


export default Persons