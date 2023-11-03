import { useState } from 'react'

const Name = ({ name, number }) => {
  return (
    <li>{name} {number}</li>
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

const Persons = ({searchedNames}) => {
  return (
    <div>
      <ul>
        {searchedNames.map(person =>
            <Name key={person.name} name={person.name} number={person.number}/>
        )}
      </ul>
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

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
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons searchedNames={searchedNames} />
    </div>
  )
}

export default App