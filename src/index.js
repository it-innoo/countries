import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './index.css';

const Country = ({ country }) => {
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
    </div>
  )
}

const Countries = ({ countries }) => {
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
          </div>
        )
      }
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('swi')
  const endpoint = 'https://restcountries.eu/rest/v2/all'

  useEffect(() => {
    axios
      .get(endpoint)
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
      />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'));
