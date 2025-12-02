import { useState, useEffect } from "react"
import services from './services/countries'
import FullCountry from './components/FullCountry'
import Country from './components/Country'


function App() {

  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState(null)

  const handleShowClick = country => () => setCountries([country])

  useEffect(
    () => {
      services
        .getAll()
        .then(data => {
          setCountries(data.filter(country =>
            country.name.common.toLowerCase().startsWith(search.toLowerCase())))
        })
    }, [search])

  if (countries === null) {
    return (
      <></>
    )
  }

  const showCountries = (countries) => {
    return (
      countries.map((country) =>
        <Country key={country.name.common} onClick={handleShowClick(country)} country={country} />)
    )
  }

  const showCountry = country => <FullCountry country={country} />

  return (
    <>
      <form>
        <label htmlFor="searchInput">find countries </label>
        <input
          id="searchInput" type="text" autoFocus autoComplete="off" value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </form>
      <div>
        {/* TODO: Turn the following to error component */}

        {
          countries.length > 10
            ? "Too many countries, be more specific."
            : ""
        }

        {
          countries.length === 0
            ? "None found."
            : ""
        }

        {
          countries.length > 0 && countries.length <= 10
            ? (countries.length === 1
              ? showCountry(countries[0])
              : showCountries(countries))
            : ""
        }
      </div>
    </>
  )
}

export default App