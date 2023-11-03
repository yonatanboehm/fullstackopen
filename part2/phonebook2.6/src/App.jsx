import { useState } from 'react'

const Name = ({ name }) => {
  return (
    <li>{name}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      id: persons.length + 1
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          autoFocus
          onChange={handleNameChange}
          placeholder='Enter name' />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Name key={person.id} name={person.name} />
        )}
      </ul>
    </div>
  )
}

export default App