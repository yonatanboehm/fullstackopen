import { useState, useEffect } from 'react'
import axios from 'axios'
import countryService from './services/countries'

const CountryWeather = (weather) => {
  if (weather.wind === undefined) {
    return (
      <div>
        <h1>Weather not found</h1>
      </div>
    )
  }
  return (
    <div>
      <h1>Weather in {weather.capital}</h1>
      <div>temperature: {weather.temp.toFixed(2)} Celsius</div>
      <div>
        <img src={`https://openweathermap.org/img/wn/${weather.icon[0].icon}@2x.png`} alt={weather.icon[0].description}></img>
      </div>
      <div>wind: {weather.wind} m/s</div>
    </div>
  )
}

const CountryName = ({ country, showCountry }) => {
  return (
    <div>
      <li>{country} <button value={country} onClick={showCountry}>show</button></li>
    </div>
  )
}

const CountryList = ({ searchedCountries, showCountry }) => {
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
            <CountryName key={country} country={country} showCountry={showCountry}/>
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
  const [countryWeather, setCountryWeather] = useState(null)
  useEffect(() => {
    console.log('loading country...')
    countryService
      .getCountry(searchedCountries[0])
      .then(countryData => {
        setCountry(countryData)
        console.log(countryData)
        countryService
          .getCountryWeather(countryData.capital)
          .then(countryWeatherData => {
            console.log(countryWeatherData)
            setCountryWeather(countryWeatherData)
    })
      })
  }, [])

  if (!country || !countryWeather) { 
    return null 
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h4>languges:</h4>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img className='flagImg' src={country.flags.png} alt={country.flags.alt}></img>
      <CountryWeather 
        capital={country.capital}
        temp={countryWeather?.main?.temp - 273} 
        icon={countryWeather?.weather}
        wind={countryWeather?.wind?.speed}
      />
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

  const showCountry = (event) => {
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
      <CountryList searchedCountries={searchedCountries} showCountry={showCountry}/>
    </div>
  )
}

export default App