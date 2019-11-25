import React, { useState } from 'react'
import Persons from './Persons';


const App = () => {
const [ persons, setPersons] = useState([
	{ name: 'Arto Hellas' }
]) 
const [ newName, setNewName ] = useState('un nouveau nom')

const addName = (event) => {
	event.preventDefault()
	const nameObject = {
		name: newName,
		date: new Date().toISOString(),
		id: persons.length+1,
	}
	setPersons(persons.concat(nameObject))
	setNewName('')
}
const handleNameChange = (event) => {
	setNewName(event.target.value)
}

return (
	<div>
	<h2>Phonebook</h2>
	<form onSubmit={addName}>
		<div>
		name: <input value={newName}  onChange={handleNameChange}/>
		</div>
		<div>
		<button type="submit">add</button>
		</div>
	</form>
	<h2>Numbers</h2>
	<Persons persons={persons}/>
	</div>
)
}

export default App