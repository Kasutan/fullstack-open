import React from 'react';

const Details = (props) => {
	return(
		<>
		<p>{props.name} {props.number}</p>
		<button onClick={props.deletePerson}>delete</button>
		</>
	)
}

export default Details