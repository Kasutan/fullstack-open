import React, { useState } from 'react'
import Persons from './Persons';


const App = () => {
const [ persons, setPersons] = useState([
	{ name: 'Arto Hellas', number : '040-1234567'}
]) 
const [ newName, setNewName ] = useState('un nouveau nom')
const [ newNumber, setNewNumber ] = useState('0033-')

const addName = (event) => {
	event.preventDefault()
	let unique=true
	persons.forEach(function(item){
		if(newName===item.name) {
			alert(`${newName} is already added to phonebook`)
			unique=false
		}
	})
	if(unique) {
		const nameObject = {
			name: newName,
			number: newNumber,
			date: new Date().toISOString(),
			id: persons.length+1,
		}
		setPersons(persons.concat(nameObject))
		setNewName('')
		setNewNumber('')
	}
}
const handleNameChange = (event) => {
	setNewName(event.target.value)
}
const handleNumberChange = (event) => {
	setNewNumber(event.target.value)
}

return (
	<div>
	<h2>Phonebook</h2>
	<form onSubmit={addName}>
		<div>name: <input value={newName}  onChange={handleNameChange}/></div>
		<div>number: <input value={newNumber}  onChange={handleNumberChange}/></div>
		<div><button type="submit">add</button></div>
	</form>
	<h2>Numbers</h2>
	<Persons persons={persons}/>
	</div>
)
}

export default App