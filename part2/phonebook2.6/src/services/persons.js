import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = id => { 
    axios.delete(`http://localhost:3001/persons/${id}`)
        .then(response => {
        console.log(`Deleted person with ID ${id}`);
        })
        .catch(error => {
        console.error(error);
        });
    return
}

export default { create, deletePerson }