import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const api_key = import.meta.env.VITE_SOME_KEY

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data.map(country => country.name.common))
}

const getCountry = country => {
  const request = axios.get(`${baseUrl}/name/${country}`)
  return request.then(response => response.data)
}

const getCountryWeather = ( capital ) => {
  const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
  return request
            .then(response => response.data)
            .catch(error => {
                 return '404 not found'
  })
}

export default { getAll, getCountry, getCountryWeather }
