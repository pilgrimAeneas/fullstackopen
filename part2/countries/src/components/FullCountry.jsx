const FullCountry = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <div>Capital: {country.capital[0]}</div>
      <div>Area: {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([l, lang]) => <li key={l}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={`The flag of ${country.name.common}`} />
    </>
  )
}

export default FullCountry