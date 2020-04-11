import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons';
import Filter from './components/Filter';



const App = () => {
const [ persons, setPersons] = useState([]) 
const [ newName, setNewName ] = useState('un nouveau nom')
const [ newNumber, setNewNumber ] = useState('0033-')
const [ newSearch, setNewSearch ] = useState('')

useEffect(() => {
	personService
		.getAll()
		.then(initialBook => {
			setPersons(initialBook)
		})
	}, [])

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
		personService
			.create(nameObject)
			.then(newPerson => {
				setPersons(persons.concat(newPerson))
				setNewName('')
				setNewNumber('')
			})
	}
}
const handleNameChange = (event) => {
	setNewName(event.target.value)
}
const handleNumberChange = (event) => {
	setNewNumber(event.target.value)
}
const handleSearchChange = (event) => {
	setNewSearch(event.target.value)
}

return (
	<div>
	<h2>Phonebook</h2>
	<Filter  value={newSearch}  onChange={handleSearchChange} />
	<form onSubmit={addName}>
		<div>name: <input value={newName}  onChange={handleNameChange}/></div>
		<div>number: <input value={newNumber}  onChange={handleNumberChange}/></div>
		<div><button type="submit">add</button></div>
	</form>
	<h2>Numbers</h2>
	<Persons persons={persons} search={newSearch}/>
	</div>
)
}

export default App