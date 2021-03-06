import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons';
import Filter from './components/Filter';
import Notification from './components/Notification'



const App = () => {
const [ persons, setPersons] = useState([]) 
const [ newName, setNewName ] = useState('un nouveau nom')
const [ newNumber, setNewNumber ] = useState('0033-')
const [ newSearch, setNewSearch ] = useState('')
const [ message, setMessage] = useState('bienvenue sur le phonebook')
const [ messageType, setMessageType] = useState('info')

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
	let idToUpdate=false
	let changedPerson=false
	persons.forEach(function(item){
		if(newName===item.name) {
			unique=false
			idToUpdate=item.id
			changedPerson={...item, number : newNumber}
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
				setMessage(`Added ${newPerson.name}`)
				setMessageType('info')
				setTimeout(() => {          setMessage(null)        }, 5000)
			})
	} else {
		if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) { 
			personService
			.update(idToUpdate, changedPerson)
			.then( updatedPerson => {
				setPersons(persons.map(person => person.id!==idToUpdate ? person : updatedPerson))
				setNewName('')
				setNewNumber('')
				setMessage(`Updated phone number for ${updatedPerson.name}`)
				setMessageType('info')
				setTimeout(() => {          setMessage(null)        }, 5000)
				}
			).catch( error => {
				setMessage(`${changedPerson.name} was already deleted from phone book`)
				setMessageType('error')
				setTimeout(() => {          setMessage(null)        }, 5000)
				setPersons(persons.filter(person => person.id !== idToUpdate))
			})
		}
	}
}

const deletePersonWithId = (id) => {
	const personToDelete = persons.filter(person => person.id===id)
	if (window.confirm(`Delete ${personToDelete[0].name}?`)) { 
		personService
		.deleteWithId(id)
		.then( data => {
			setPersons(persons.filter(person => person.id!==id))
			setMessage(`Deleted ${personToDelete[0].name}`)
			setMessageType('info')
			setTimeout(() => {          setMessage(null)        }, 5000)
			}
		)
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
	<Notification message={message} type={messageType} />
	<Filter  value={newSearch}  onChange={handleSearchChange} />
	<form onSubmit={addName}>
		<div>name: <input value={newName}  onChange={handleNameChange}/></div>
		<div>number: <input value={newNumber}  onChange={handleNumberChange}/></div>
		<div><button type="submit">add</button></div>
	</form>
	<h2>Numbers</h2>
	<Persons persons={persons} search={newSearch} deletePersonWithId={deletePersonWithId}/>
	</div>
)
}

export default App