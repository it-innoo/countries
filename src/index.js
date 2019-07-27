import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './index.css';

const Weather = ({ weather }) => {
  if (weather === null) {
    return null
  }

  return (
    <div>
      <div>
        <strong>temperature:</strong> {weather.temp_c} &#8451;
      </div>
      <div>
        <img
          src={weather.condition.icon}
          alt={weather.condition.text} />
      </div>
      <div>
        <strong>wind:</strong> {weather.wind_kph} kph direction {weather.wind_dir}
      </div>
    </div>
  )
}

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const url = `https://api.apixu.com/v1/current.json?key=d68ee55761624662b8870114191305&q=${country.capital}`
    axios
      .get(url)
      .then(response => {
        setWeather(response.data.current)
      })
  }, [country.capital])

  return (
    <div>
      <h2>{country.name}</h2>

      <div>capital {country.capital}</div>

      <div>populaton {country.population}</div>

      <h3>languages</h3>

      <ul>
        {country.languages.map(language =>
          <li key={language.iso639_1}>{language.name}</li>
        )}
      </ul>

      <div>
        <img src={country.flag} alt='flag' height='100' />
      </div>

      <h3>Weather in {country.capital}</h3>

      <Weather weather={weather} />
    </div>
  )
}

const Countries = ({ countries, handleClick }) => {
  if (countries.length === 0) {
    return <div>
      No countries, specify another filter
    </div>
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  if (countries.length > 10) {
    return (
      <p>Liikaa osumia, ole hyvä ja rajaa hakuehtoja!</p>
    )
  }

  return (
    <div>
      {
        countries.map(c =>
          <div key={c.alpha3Code}>
            {c.name}
            <button onClick={() => handleClick(c.name)}>show</button>
          </div>
        )
      }
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('swi')

  useEffect(() => {
    const url = 'https://restcountries.eu/rest/v2/all'
    axios
      .get(url)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) =>
    setSearch(event.target.value)

  const countriesToShow = search.length > 0
    ? countries.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : countries

  return (
    <div>
      <div>
        find countries
         <input onChange={handleChange} value={search} />
      </div>
      <Countries
        countries={countriesToShow}
        handleClick={(s) => setSearch(s)}
      />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'));
