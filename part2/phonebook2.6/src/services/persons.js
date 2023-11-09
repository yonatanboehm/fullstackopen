import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = id => { 
    axios.delete(`${baseUrl}/${id}`)
        .then(response => {
        console.log(`Deleted person with ID ${id}`);
        })
        .catch(error => {
        console.error(error);
        });
    return
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { create, deletePerson, update, getAll }