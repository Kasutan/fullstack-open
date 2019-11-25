import React from 'react';
import Details from './Details';



const Persons = ({persons, search}) => {
const rows = () => persons.map((person) => {
	if(search==='' || person.name.toLowerCase().indexOf(search.toLowerCase())>=0) {
		return(<Details
			key={person.name}
			name={person.name}
			number={person.number}
		/>)
	} else {
		return ('')
	}
}
	
	
)
return(
	<div>
		{rows()}
	</div>
)

}


export default Persons