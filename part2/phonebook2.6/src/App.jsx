import { useState, useEffect } from 'react'
import personServices from './services/persons'

const Notification = (message) => {

  if (message.message === null) {
    return null
  }
  const notifStyle = message.type ? { color: 'green' } : { color: 'red' }

  return (
    <div style={notifStyle} className='notif'>
      {message.message}
    </div>
  )
}

const Name = ({ id, name, number, removePerson }) => {
  return (
    <div>
      <li>{name} {number} <button onClick={() => removePerson(id)}>delete</button></li>
    </div>
  )
}

const Filter = ({ newSearch, handleSearch }) => {
  return (
    <div>
      filter shown with: <input 
        value={newSearch}
        autoFocus
        onChange={handleSearch}
        placeholder='Search name' />
    </div>
  )
}

const Form = (form) => {
  return (
    <form onSubmit={form.addName}>
      <div>
        name: <input 
        value={form.newName}
        onChange={form.handleNameChange}
        placeholder='Enter name' />
      </div>
      <div>
        number: <input 
        value={form.newNumber}
        onChange={form.handleNumberChange}
        placeholder='Enter number' />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({searchedNames, removePerson}) => {
  return (
    <div>
      <ul>
        {searchedNames.map(person =>
            <Name key={person.name} id={person.id} name={person.name} number={person.number} removePerson={removePerson}/>
        )}
      </ul>
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [message, setMessage] = useState({ message: null, type: null})
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    personServices
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const searchedNames = newSearch == '' ? persons : persons.filter(person => person.name.includes(newSearch))

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    // if (persons.map(person => person.name).includes(newName)) {
    //   if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
    //     personServices
    //       .update(persons.find(p => p.name === newName).id, personObject)
    //       .then(response => {
    //         setPersons(persons.map(person => person.name !== newName ? person : response))
    //         setNewName('')
    //         setNewNumber('')
    //         setMessage({
    //           message: `Changed number for ${personObject.name}`,
    //           type: true
    //         })
    //         setTimeout(() => {
    //           setMessage({ message: null, type: null})
    //         }, 5000)
    //         return
    //       })
    //       .catch(error => {
    //         setMessage({
    //           message: `Information of ${personObject.name} has already been removed from the server`,
    //           type: false
    //         })
    //         setTimeout(() => {
    //           setMessage({ message: null, type: null})
    //         }, 5000)
    //         return
    //       })
    //   }
    //   return
    // }
    
    personServices
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setMessage({
          message: `Added ${personObject.name}`,
          type: true
        })
        setTimeout(() => {
          setMessage({ message: null, type: null})
        }, 5000)
      })
  }
  
  const removePerson = (id) => {
    if(window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      personServices
        .deletePerson(id)
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message?.message} type={message?.type}/>
      <Filter value={newSearch} handleSearch={handleSearch}/>
      <h2>Add a new:</h2>
      <Form 
        addName={addName} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons 
        searchedNames={searchedNames}
        removePerson={removePerson} />
    </div>
  )
}

export default App