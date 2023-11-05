import { useState, useEffect } from 'react'
import axios from 'axios'
import countryService from './services/countries'

const CountryName = ({ country }) => {
  return (
    <div>
      <li>{country}</li>
    </div>
  )
}

const CountryList = ({ searchedCountries }) => {
  if (searchedCountries.length === 1) {
    return (
      <div>
        <CountryData searchedCountries={searchedCountries} />
      </div>
    )
  }
  else if (searchedCountries.length < 30) {
    return (
      <div>
        <ul>
          {searchedCountries.map(country =>
            <CountryName key={country} country={country}/>
          )}
        </ul>
      </div>
    )
  }
  else {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
}

const CountryData = ({ searchedCountries }) => {

  const [country, setCountry] = useState(null)
  useEffect(() => {
    countryService
      .getCountry(searchedCountries[0])
      .then(countryData => {
        setCountry(countryData)
      })
  }, [])

  if (!country) { 
    return null 
  }
  console.log(country)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h4>languges:</h4>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}></img>
    </div>
  )
}

const App = () => {
  const [newSearch, setNewSearch] = useState('')
  const [countries, setCountries] = useState(null)

  const searchedCountries = newSearch === '' 
    ? countries 
    : countries.filter(country => country.toLowerCase().includes(newSearch.toLowerCase()))

  useEffect(() => {
    console.log('loading...')
    countryService
      .getAll()
        .then(allCountries => setCountries(allCountries))
      .catch(error => alert('failed to load'))
  }, [])

  const searchCountry = (event) => {
    setNewSearch(event.target.value)
  }

  if (countries === null) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <div>
      find countries <input onChange={searchCountry} value={newSearch}/>
      <CountryList searchedCountries={searchedCountries} />
    </div>
  )
}

export default App